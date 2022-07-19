import { GetRouletteQuery } from "lib/gql";
import { useEffect, useState } from "react";
import { Candidate, Roulette } from "types/Roulette";
import { useQuery } from "urql";

export const useRoulette = (name: string, pause: boolean) => {
  const [currentWinner, setCurrentWinner] = useState<Candidate>({ idx: -1, name: "dummy", hide: true })
  const [roulette, setRoulette] = useState<Roulette>({id: "dummy", name: "dummy", candidates: []});
  
  const [result, _] = useQuery({
    query: GetRouletteQuery,
    variables: { name },
    pause: pause
  });
  const { data, fetching, error } = result;

  useEffect(() => {
    if (!fetching) {
      const rouleteData = data?.listRoulettes?.items[0]
      if (rouleteData) {
        const id = rouleteData.id
        const name = rouleteData.name
        const candidates = rouleteData.candidates.map((value: string) => {return JSON.parse(value)})
        
        setRoulette({ id, name, candidates })
      }
    }
  }, [data, fetching, result])

  return({roulette, setRoulette, currentWinner, setCurrentWinner})
}