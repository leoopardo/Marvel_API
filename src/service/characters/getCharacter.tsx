import { useQuery } from "react-query";
import { CharactersData } from "../types/characters/characters.interface";
import { api } from "../../configs/api";
import md5 from "md5";

export function useGetCharacter(id?: string) {
  const md5Hash = md5(
    `${new Date().getTime()}${import.meta.env.VITE_API_PRIVATE_KEY}${
      import.meta.env.VITE_API_PUBLIC_KEY
    }`
  );
  const params = {
    hash: md5Hash.toString(),
    ts: `${new Date().getTime()}`,
    apikey: import.meta.env.VITE_API_PUBLIC_KEY,
  };

  const { data, isFetching, error, refetch } = useQuery<
    CharactersData | null | undefined
  >("character", async () => {
    const response = await api.get(`characters/${id}`, {
      params,
    });
    return response.data;
  });
  const character = data?.data.results[0];

  return {
    character,
    isFetching,
    error,
    refetch,
  };
}
