import { NextPage } from "next";
import Link from "next/link";
import { FC } from "react";
import { useGetAllRoulettes } from "hooks/useGetAllRoulettes";

const Roulettes: FC = () => {
  const { roulettes, setRoulettes, fetching, error } = useGetAllRoulettes()

  if (fetching) { return <p>loading...</p> }
  if (error) { return <p>error</p> }

  return (
    <>
      {
        roulettes.map(
          (value, index) =>
            <div key={index}>
              <Link href={`/${value.name}`}>
                <a>{value.name}</a>
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
