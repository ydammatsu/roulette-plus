import { GetAllRouletteQuery } from 'lib/gql';
import { useEffect, useState } from 'react';
import { Roulette } from 'types/Roulette';
import { useQuery } from 'urql';

const convertDataToRoulettes = (responseData: any) => {
  const roulettesData: Roulette[] | undefined =
    responseData?.listRoulettes?.items;

  if (roulettesData) {
    // APIのレスポンスは時系列順に並んでいないのでソートする
    return roulettesData.sort((a: Roulette, b: Roulette) => {
      return a.createdAt < b.createdAt ? -1 : 1;
    });
  } else {
    return undefined;
  }
};

export const useGetAllRoulettes = (pause: boolean) => {
  const [roulettes, setRoulettes] = useState<Roulette[]>([]);
  const [{ data, fetching, error }, _] = useQuery({
    query: GetAllRouletteQuery,
    requestPolicy: 'cache-and-network',
    pause: pause,
  });

  useEffect(() => {
    const newRoulettesData = convertDataToRoulettes(data);
    if (newRoulettesData) {
      setRoulettes(newRoulettesData);
    }
  }, [data]);

  return {
    roulettes,
    setRoulettes,
    fetching,
    error,
  };
};
