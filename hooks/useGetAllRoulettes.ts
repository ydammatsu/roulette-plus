import { GetAllRouletteQuery } from "lib/gql";
import { useEffect, useState } from "react";
import { Candidate } from "types/Roulette";
import { useQuery } from "urql";

export const useGetAllRoulettes = () => {
  const [roulettes, setRoulettes] = useState<Candidate[]>([]);
  const [result, _] = useQuery({
    query: GetAllRouletteQuery,
  });
  const { data, fetching, error } = result;

  useEffect(() => {
    if (!fetching) {
      setRoulettes(data.listRoulettes.items)
    }
  }, [data, fetching])

  return(
    {
      roulettes,
      setRoulettes,
      fetching,
      error
    }
  )
}