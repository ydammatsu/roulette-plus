import { NextPage } from "next";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

const Roulettes: FC = () => {
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
