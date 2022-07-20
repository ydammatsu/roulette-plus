import { NextPage } from "next";
import Link from "next/link";
import { FC, useState } from "react";
import { useGetAllRoulettes } from "hooks/useGetAllRoulettes";
import styled from "styled-components";
import { useWaitRender } from "hooks/useWaitRender";
import { useMutation } from "urql";
import { CreateRouletteMutation, DeleteRouletteMutation } from "lib/gql";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Roulette } from "types/Roulette";
import { ImportModal } from "components/ImportModal";

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
  &:hover {
    color: blue;
  }
`

const FormWrapper = styled.div`
  margin: 10px;
`
const ImportButton = styled("p")`
  margin-top: 30px;
  &:hover {
    cursor: pointer;
    color: blue;
  }
`;

const Roulettes: FC = () => {
  const { roulettes, fetching, error } = useGetAllRoulettes()
  const [newRouletteName, setNewRouletteName] = useState("")
  const [_createRouletteResult, createRoulette] = useMutation(CreateRouletteMutation);
  const [_deleteRouletteResult, deleteRoulette] = useMutation(DeleteRouletteMutation);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = (): void => {
    createRoulette({
      createrouletteinput: {
        id: Math.random().toString(32).substring(2),
        name: newRouletteName,
        description: "",
        candidates: []
      }
    })
    setNewRouletteName("")
  }

  const handleImport = (name: string, candidates: string[]): void => {
    createRoulette({
      createrouletteinput: {
        id: Math.random().toString(32).substring(2),
        name: name,
        description: "",
        candidates: candidates
      }
    })
    setModalOpen(false)
  }

  const handleDelete = (roulette: Roulette): void => {
    if (confirm('Really?')) {
      deleteRoulette({ deleteRouletteInput: { id: roulette.id, name: roulette.name } })
    }
  }

  if (fetching) { return <p>loading...</p> }
  if (error) { return <p>error</p> }

  return (
    <>
      {
        roulettes.map(
          (roulette, index) =>
            <LinkWrapper key={index}>
              <Link href={`/${roulette.name}`}>
                <a>{roulette.name}</a>
              </Link>
              <DeleteIcon
                onClick={() => { handleDelete(roulette) }}
                style={{ marginLeft: "7px", verticalAlign: "text-bottom" }}
              />
            </LinkWrapper>
        )
      }

      <FormWrapper>
        <input placeholder="New Roulette" value={newRouletteName} onChange={(e) => setNewRouletteName(e.currentTarget.value)} />
        <button onClick={handleSubmit}>add</button>
      </FormWrapper>

      <ImportButton onClick={() => setModalOpen(true)}>
        インポート <FileUploadIcon style={{verticalAlign: "text-bottom"}}/>
      </ImportButton>

      <ImportModal
        open={modalOpen}
        handleClose={() => {setModalOpen(false)}}
        handleImport={handleImport}
      />
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
