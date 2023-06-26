import { useQuery } from "react-query";
import { api } from "../../configs/api";
import md5 from "md5";
import { ComicsData } from "../types/characters/colections/comics";

export function useGetComicsColection(id?: string) {
  const md5Hash = md5(
    `${new Date().getTime() + 1}${import.meta.env.VITE_API_PRIVATE_KEY}${
      import.meta.env.VITE_API_PUBLIC_KEY
    }`
  );
  const params = {
    hash: md5Hash.toString(),
    ts: `${new Date().getTime() + 1}`,
    apikey: import.meta.env.VITE_API_PUBLIC_KEY,
  };

  const { data, isFetching, error, refetch } = useQuery<
    ComicsData | null | undefined
  >(
    "comicsColection",
    async () => {
      const response = await api.get(`characters/${id}/comics`, {
        params,
      });
      return response.data;
    },
    { keepPreviousData: true, retry: 5 }
  );
  const comicsColection = data;
  const comicsColectionFetching = isFetching;
  const comicsColectionError = error;
  const comicsColectionRefetch = refetch;
  return {
    comicsColection,
    comicsColectionFetching,
    comicsColectionError,
    comicsColectionRefetch,
  };
}
