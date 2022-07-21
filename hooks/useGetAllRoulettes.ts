import { GetAllRouletteQuery } from 'lib/gql';
import { useEffect, useState } from 'react';
import { Roulette } from 'types/Roulette';
import { useQuery } from 'urql';

export const useGetAllRoulettes = (pause: boolean) => {
  const [roulettes, setRoulettes] = useState<Roulette[]>([]);
  const [{ data, fetching, error }, _] = useQuery({
    query: GetAllRouletteQuery,
    requestPolicy: 'cache-and-network',
    pause: pause,
  });

  useEffect(() => {
    if (data?.listRoulettes?.items) {
      setRoulettes(
        data.listRoulettes.items.sort((a: Roulette, b: Roulette) => {
          return a.createdAt < b.createdAt ? -1 : 1;
        }),
      );
    }
  }, [data]);

  return {
    roulettes,
    setRoulettes,
    fetching,
    error,
  };
};
