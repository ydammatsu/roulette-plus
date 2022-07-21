import { useState, FormEvent, KeyboardEvent, FC, memo, ReactNode } from 'react';
import { useSpring, animated } from 'react-spring';
import { MemoRoulette } from 'components/Roulette';
import { JPInput } from 'components/JPInput';
import { CandidateHeader, CandidateRow } from 'components/Candidate';
import MyModal from 'components/MyModal';
import styled from 'styled-components';
import Link from 'next/link';
import { useRoulette } from 'hooks/useRoulette';
import { Candidate, Roulette } from 'types/Roulette';
import { useMutation } from 'urql';
import { UpdateRouletteMutation } from 'lib/gql';

const AppWrapper = styled.div`
  font-family: sans-serif;
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: 1fr 8fr 1fr;
  grid-template-areas:
    'header header'
    'roulette controller'
    'footer footer';
`;
const InitialAppWrapper = styled.div`
  font-family: sans-serif;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 8fr 1fr;
  grid-template-areas:
    'header'
    'roulette'
    'controller'
    'footer';
`;

const Wrapper: FC<{ initial: boolean; children: ReactNode }> = ({
  initial,
  children,
}) => {
  return initial ? (
    <InitialAppWrapper>{children}</InitialAppWrapper>
  ) : (
    <AppWrapper>{children}</AppWrapper>
  );
};

const H1Wrapper = styled.h1`
  width: 200px;
  font-size: 30px;
  font-style: italic;
  z-index: 100;
  padding: 3px;
  margin: 3px;
  grid-area: header;
  text-align: left;
`;

const H2Wrapper = styled.h2`
  grid-area: header;
  text-align: center;
`;
const RouletteWrapper = styled.div`
  grid-area: roulette;
  text-align: center;
`;
const CandidatesWrapper = styled.div``;
const ControllerWrapper = styled.div`
  grid-area: controller;
`;

function FlippingMessage() {
  const [flip, set] = useState(false);
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: true,
    reverse: flip,
    delay: 200,
    onRest: () => set(!flip),
  });
  return <animated.h2 style={props}>Enter candidates</animated.h2>;
}

const FM = memo(FlippingMessage);

type Props = {
  rouletteName: string;
};

export const RouletteContainer = (props: Props) => {
  const [pauseQuery, setPouseQuery] = useState(false);
  const { roulette, setRoulette, currentWinner, setCurrentWinner } =
    useRoulette(props.rouletteName, pauseQuery);
  const [newRouletteName, setNewRouletteName] = useState(props.rouletteName);
  const [updateRouletteResult, updateRoulette] = useMutation(
    UpdateRouletteMutation,
  );
  const handleUpdateRoulette = (roulette: Roulette) => {
    // 再度 query が叩かれるのを防ぐため mutation を叩く前に pause を true にしておく
    setPouseQuery(true);
    setRoulette(roulette);
    updateRoulette({
      updateRouletteInput: {
        ...roulette,
        candidates: roulette.candidates.map((candidate) => {
          return JSON.stringify(candidate);
        }),
      },
    });
  };

  const [spinIt, setSpinIt] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [v, setV] = useState('');
  const initial = roulette.candidates.length < 2;

  return (
    <Wrapper initial={initial}>
      <MyModal
        winner={currentWinner}
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
      />
      <H1Wrapper>
        <Link href={'/'}>
          <a>RoulettePlus</a>
        </Link>
      </H1Wrapper>
      <H2Wrapper>
        <input
          style={{
            border: 'none',
            outline: 'none',
            fontSize: 30,
            textAlign: 'center',
          }}
          value={newRouletteName}
          onChange={(e) => {
            setNewRouletteName(e.currentTarget.value);
          }}
          onBlur={() =>
            handleUpdateRoulette({ ...roulette, name: newRouletteName })
          }
          onKeyDown={(e) => {
            switch (e.key) {
              case 'Enter': {
                handleUpdateRoulette({ ...roulette, name: newRouletteName });
              }
            }
          }}
        />
      </H2Wrapper>
      <RouletteWrapper>
        {initial ? (
          <FM />
        ) : (
          <>
            <div>
              <MemoRoulette
                radius={100}
                candidates={roulette.candidates}
                spinIt={spinIt}
                onCurrentWinnerChange={(cw: Candidate) => {
                  setCurrentWinner(cw);
                }}
                onRest={() => {
                  setModalOpen(true);
                }}
              />
            </div>
            <button onClick={() => setSpinIt(!spinIt)}>
              {spinIt ? 'Reset' : 'Start'}
            </button>
          </>
        )}
      </RouletteWrapper>
      <ControllerWrapper>
        <JPInput
          value={v}
          onChange={(e: FormEvent<HTMLInputElement>) => {
            const value = e.currentTarget.value;
            setV(value);
          }}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            switch (e.key) {
              case 'Enter': {
                const newRoulette = {
                  ...roulette,
                  candidates: [
                    ...roulette.candidates,
                    {
                      idx: roulette.candidates.length + 1,
                      name: v,
                      hide: false,
                    },
                  ],
                };
                handleUpdateRoulette(newRoulette);
                setV('');
              }
            }
          }}
        />
        <CandidatesWrapper>
          {roulette.candidates.length > 0 && <CandidateHeader />}
          {roulette.candidates.map((c, i) => {
            return (
              <CandidateRow
                name={c.name}
                hide={c.hide}
                idx={c.idx}
                key={i}
                highlight={c.idx === currentWinner.idx}
                changeHandler={(s: string) => {
                  const changeTarget = roulette.candidates[i];
                  const newRoulette = {
                    ...roulette,
                    candidates: [
                      ...roulette.candidates.slice(0, i),
                      { ...changeTarget, name: s },
                      ...roulette.candidates.slice(
                        i + 1,
                        roulette.candidates.length + 1,
                      ),
                    ],
                  };
                  handleUpdateRoulette(newRoulette);
                }}
                deleteHandler={() => {
                  const newRoulette = {
                    ...roulette,
                    candidates: roulette.candidates.filter(
                      (_, index) => index !== i,
                    ),
                  };
                  handleUpdateRoulette(newRoulette);
                }}
                hideHandler={() => {
                  const hideTarget = roulette.candidates[i];
                  const newRoulette = {
                    ...roulette,
                    candidates: [
                      ...roulette.candidates.slice(0, i),
                      { ...hideTarget, hide: true },
                      ...roulette.candidates.slice(
                        i + 1,
                        roulette.candidates.length + 1,
                      ),
                    ],
                  };
                  handleUpdateRoulette(newRoulette);
                }}
                showHandler={() => {
                  const showTarget = roulette.candidates[i];
                  const newRoulette = {
                    ...roulette,
                    candidates: [
                      ...roulette.candidates.slice(0, i),
                      { ...showTarget, hide: false },
                      ...roulette.candidates.slice(
                        i + 1,
                        roulette.candidates.length + 1,
                      ),
                    ],
                  };
                  handleUpdateRoulette(newRoulette);
                }}
              />
            );
          })}
        </CandidatesWrapper>
      </ControllerWrapper>
    </Wrapper>
  );
};
