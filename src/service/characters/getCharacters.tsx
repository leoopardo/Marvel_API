import { useQuery } from "react-query";
import {
  CharactersData,
  CharactersQuery,
} from "../types/characters/characters.interface";
import { api } from "../../configs/api";
import md5 from "md5";

export function useGetCharacters(params: CharactersQuery) {
  const md5Hash = md5(
    `${new Date().getTime()}${import.meta.env.VITE_API_PRIVATE_KEY}${
      import.meta.env.VITE_API_PUBLIC_KEY
    }`
  );
  params.hash = md5Hash.toString();
  params.ts = `${new Date().getTime()}`;
  params.apikey = import.meta.env.VITE_API_PUBLIC_KEY;

  const { data, isFetching, isError, refetch } = useQuery<
    CharactersData | null | undefined
  >(
    "characters",
    async () => {
      const response = await api.get("characters", {
        params,
      });
      return response.data;
    },
    { keepPreviousData: true, staleTime: 5000 }
  );
  const characters = data?.data;

  return {
    characters,
    isFetching,
    isError,
    refetch,
  };
}
