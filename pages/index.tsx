import { NextPage } from "next";
import { useQuery } from 'urql';
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { GetRouletteQuery } from "lib/gql";

const Roulettes: FC = () => {
  const [result, _] = useQuery({
    query: GetRouletteQuery,
    variables: {name: "Sample Roulette"}
  });
  const { data, fetching, error } = result;
  useEffect(() => {
    console.log(data)
  }, [data])

  const [names, setNames] = useState<string[]>([])

  useEffect(() => {
    let rouletteNames: string[] = []
    for (var i = 0, length = localStorage.length; i < length; ++i) {
      const key = localStorage.key(i)
      if (key !== null) {
        rouletteNames.push(key)
      }
    }
    setNames(rouletteNames)
  }, [])

  return (
    <>
      {
        names.map(
          (value, index) =>
            <div key={index}>
              <Link href={`/${value}`}>
                <a>{value}</a>
              </Link>
            </div>
        )
      }
    </>
  )
}

const Home: NextPage = () => {
  return(
    <>
      <h1>Roulette</h1>
      <Roulettes/>
    </>
  )
}

export default Home
