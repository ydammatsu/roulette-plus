import { GetRouletteQuery } from "lib/gql";
import { useEffect, useState } from "react";
import { Candidate, Roulette } from "types/Roulette";
import { useQuery } from "urql";

export const useRoulette = (name: string) => {
  const [currentWinner, setCurrentWinner] = useState<Candidate>({ idx: -1, name: "dummy", hide: true })
  const [roulette, setRoulette] = useState<Roulette>({id: "dummy", name: "dummy", candidates: []});
  
  const [result, _] = useQuery({
    query: GetRouletteQuery,
    variables: { name }
  });
  const { data, fetching, error } = result;

  useEffect(() => {
    if (fetching!) {
    // data.listRoulettes.items
    // setRoulette(data.listRoulettes.items[0])
    }
  }, [data, fetching, result])

  return({roulette, setRoulette, currentWinner, setCurrentWinner})
}