import { GetAllRouletteQuery } from "lib/gql";
import { useEffect, useState } from "react";
import { Roulette } from "types/Roulette";
import { useQuery } from "urql";

export const useGetAllRoulettes = () => {
  const [roulettes, setRoulettes] = useState<Roulette[]>([]);
  const [{ data, fetching, error }, _] = useQuery({
    query: GetAllRouletteQuery,
    requestPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data?.listRoulettes?.items) {
      setRoulettes(data.listRoulettes.items)
    }
  }, [data])

  return(
    {
      roulettes,
      setRoulettes,
      fetching,
      error
    }
  )
}