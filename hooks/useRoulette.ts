import { GetRouletteQuery } from "lib/gql";
import { useEffect, useState } from "react";
import { Candidate, Roulette } from "types/Roulette";
import { useQuery } from "urql";

export const useRoulette = (name: string, pause: boolean) => {
  const [currentWinner, setCurrentWinner] = useState<Candidate>({ idx: -1, name: "dummy", hide: true })
  const [roulette, setRoulette] = useState<Roulette>({id: "dummy", name: "dummy", candidates: []});
  const [{ data, fetching, error }, _] = useQuery({
    query: GetRouletteQuery,
    variables: { name },
    pause: pause
  });

  useEffect(() => {
    if (!fetching) {
      const rouleteData = data?.listRoulettes?.slice(0, 1)
      if (rouleteData) {
        const id = rouleteData.id
        const name = rouleteData.name
        const candidates = rouleteData.candidates.map((value: string) => {return JSON.parse(value)})

        setRoulette({ id, name, candidates })
      }
    }
  }, [data, fetching])

  return({roulette, setRoulette, currentWinner, setCurrentWinner})
}