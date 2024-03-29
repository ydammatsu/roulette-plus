import { NextPage } from 'next';
import Link from 'next/link';
import { FC, useState } from 'react';
import { useGetAllRoulettes } from 'hooks/useGetAllRoulettes';
import styled from 'styled-components';
import { useMutation } from 'urql';
import { CreateRouletteMutation, DeleteRouletteMutation } from 'lib/gql';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Roulette } from 'types/Roulette';
import { ImportModal } from 'components/ImportModal';
import { ulid } from 'ulid';
import Head from 'next/head';

const HeaderWrapper = styled.div`
  font-style: italic;
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
`;

const FormWrapper = styled.div`
  margin: 10px;
`;
const ImportButton = styled('p')`
  margin-top: 30px;
  &:hover {
    cursor: pointer;
    color: blue;
  }
`;

const Roulettes: FC = () => {
  const [pauseQuery, setPouseQuery] = useState(false);
  const { roulettes, setRoulettes, fetching, error } =
    useGetAllRoulettes(pauseQuery);
  const [newRouletteName, setNewRouletteName] = useState('');
  const [_createRouletteResult, createRoulette] = useMutation(
    CreateRouletteMutation,
  );
  const [_deleteRouletteResult, deleteRoulette] = useMutation(
    DeleteRouletteMutation,
  );
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = (): void => {
    setPouseQuery(true);
    const id = ulid();
    const createdAt = Date.now();
    createRoulette({
      createRouletteInput: {
        id: id,
        createdAt: createdAt,
        name: newRouletteName,
        description: '',
        candidates: [],
      },
    });
    setRoulettes([
      ...roulettes,
      {
        id: id,
        createdAt: createdAt,
        name: newRouletteName,
        description: '',
        candidates: [],
      },
    ]);
    setNewRouletteName('');
  };

  const handleImport = (name: string, candidates: string[]): void => {
    setPouseQuery(true);
    const id = ulid();
    const createdAt = Date.now();
    createRoulette({
      createRouletteInput: {
        id: id,
        createdAt: createdAt,
        name: name,
        description: '',
        candidates: candidates,
      },
    });
    setRoulettes([
      ...roulettes,
      {
        id: id,
        createdAt: createdAt,
        name: name,
        description: '',
        candidates: [],
      },
    ]);
    setModalOpen(false);
  };

  const handleDelete = (roulette: Roulette): void => {
    setPouseQuery(true);
    const id = roulette.id;
    if (confirm('Really?')) {
      deleteRoulette({
        deleteRouletteInput: { id: roulette.id, createdAt: roulette.createdAt },
      });
      setRoulettes(roulettes.filter((roulette) => roulette.id !== id));
    }
  };

  if (fetching) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>error</p>;
  }

  return (
    <>
      <Head>
        <title>RoulettePlus</title>
      </Head>
      {roulettes.map((roulette, index) => (
        <LinkWrapper key={index}>
          <Link href={`/${roulette.name}`}>
            <a>{roulette.name}</a>
          </Link>
          <DeleteIcon
            onClick={() => {
              handleDelete(roulette);
            }}
            style={{ marginLeft: '7px', verticalAlign: 'text-bottom' }}
          />
        </LinkWrapper>
      ))}

      <FormWrapper>
        <input
          placeholder='New Roulette'
          value={newRouletteName}
          onChange={(e) => setNewRouletteName(e.currentTarget.value)}
          onKeyDown={(e) => {
            switch (e.key) {
              case 'Enter': {
                handleSubmit();
              }
            }
          }}
        />
      </FormWrapper>

      <ImportButton onClick={() => setModalOpen(true)}>
        インポート <FileUploadIcon style={{ verticalAlign: 'text-bottom' }} />
      </ImportButton>

      <ImportModal
        open={modalOpen}
        handleClose={() => {
          setModalOpen(false);
        }}
        handleImport={handleImport}
      />
    </>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <HeaderWrapper>
        <h1>RoulettePlus</h1>
      </HeaderWrapper>
      <BodyWrapper>
        <Roulettes />
      </BodyWrapper>
    </>
  );
};

export default Home;
