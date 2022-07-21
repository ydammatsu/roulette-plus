import { GetRouletteQuery } from 'lib/gql';
import { useEffect, useState } from 'react';
import { Candidate, Roulette } from 'types/Roulette';
import { useQuery } from 'urql';

// currentWinner の初期値として使う
const dummyCandidate: Candidate = {
  idx: -1,
  name: 'dummy',
  hide: true,
};

// Roulette のデータを取得できるまでの初期値として使う
const dummyRoulette: Roulette = {
  id: 'dummy',
  createdAt: 0,
  name: 'dummy',
  candidates: [],
};

// APIのレスポンスをRouletteのデータとして変換する。
const convertDataToRoulette = (responseData: any): undefined | Roulette => {
  // レスポンスには下記形式で値が入っている
  // listRoulettes: {items: [{id: "xxxx", createdAt: 123456789,…}],…}
  const rouletteData = responseData?.listRoulettes?.items[0];

  if (rouletteData) {
    const roulette: Roulette = {
      id: rouletteData.id,
      name: rouletteData.name,
      createdAt: rouletteData.createdAt,
      description: rouletteData.description,
      candidates: rouletteData.candidates.map(
        // NOTE: DynamoDB の仕様上ネストした値を持てなかったので candidates には JSON のリストを入れている
        (value: string) => {
          return JSON.parse(value);
        },
      ),
    };
    return roulette;
  } else {
    undefined;
  }
};

// ルーレットの参加者・勝者を管理するhooks
export const useRoulette = (name: string, pause: boolean) => {
  const [currentWinner, setCurrentWinner] = useState<Candidate>(dummyCandidate);
  const [roulette, setRoulette] = useState<Roulette>(dummyRoulette);
  const [{ data, fetching, error }, _] = useQuery({
    query: GetRouletteQuery,
    variables: { name },
    pause: pause,
  });

  useEffect(() => {
    if (!fetching) {
      const newRoulette = convertDataToRoulette(data);
      if (newRoulette) {
        setRoulette(newRoulette);
      }
    }
  }, [data, fetching]);

  return { roulette, setRoulette, currentWinner, setCurrentWinner };
};
