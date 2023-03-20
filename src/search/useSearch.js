import { useDebounce } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const SEARCH_TYPE = {
  FULLTEXT: "fulltext",
  SEMANTIC: "semantic",
  PLAINTEXT: "plaintext",
};

export default function useSearch({ term, type }) {
  const debouncedTerm = useDebounce(term, 500);

  const query = useQuery({
    queryKey: ["search", type, debouncedTerm],
    queryFn: async () => {
      if (!debouncedTerm) return { data: [] };

      return await axios.get(`/api/${type}`, {
        params: { term: debouncedTerm },
      });
    },
    select: (response) => response.data,
    keepPreviousData: true,
  });

  return query;
}
