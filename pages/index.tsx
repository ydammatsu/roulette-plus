import { NextPage } from "next";
import Link from "next/link";
import { FC, useState } from "react";
import { useGetAllRoulettes } from "hooks/useGetAllRoulettes";
import styled from "styled-components";
import { useWaitRender } from "hooks/useWaitRender";

const HeaderWrapper = styled.div`
  grid-area: header;
  text-align: center;
`;

const BodyWrapper = styled.div`
  grid-area: header;
  text-align: center;
`;

const LinkWrapper = styled.div`
  font-size: 18px;
  text-decoration: underline;
  text-decoration-color: black;
  line-height: 30px;
`

const FormWrapper = styled.div`
  margin: 10px;
`

const Roulettes: FC = () => {
  const { roulettes, setRoulettes, fetching, error } = useGetAllRoulettes()
  const [newRouletteName, setNewRouletteName] = useState("")
  const handleSubmit = (): void => {
    console.log(newRouletteName)
    setNewRouletteName("")
  }

  if (fetching) { return <p>loading...</p> }
  if (error) { return <p>error</p> }

  return (
    <>
      {
        roulettes.map(
          (value, index) =>
            <LinkWrapper key={index}>
              <Link href={`/${value.name}`}>
                <a>{value.name}</a>
              </Link>
            </LinkWrapper>
        )
      }
      <FormWrapper>
        <input placeholder="New Roulette" value={newRouletteName} onChange={(e) => setNewRouletteName(e.currentTarget.value)}></input>
        <button onClick={handleSubmit}>add</button>
      </FormWrapper>
    </>
  )
}

const Home: NextPage = () => {
  // CSSが摘要されるのを待つ
  const isRendered = useWaitRender()

  return isRendered ? (
    <>
      <HeaderWrapper><h1>Roulette</h1></HeaderWrapper>
      <BodyWrapper><Roulettes/></BodyWrapper>
    </>
  ): <></>
}

export default Home
