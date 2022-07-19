import {
  useState,
  FormEvent,
  KeyboardEvent,
  FC,
  memo,
  ReactNode,
} from "react";
import { useSpring, animated } from "react-spring";
import { MemoRoulette } from "components/Roulette";
import { JPInput } from "components/JPInput";
import { CandidateHeader, CandidateRow } from "components/Candidate";
import MyModal from "components/MyModal";
import styled from "styled-components";
import { Candidate } from "stateManagement/states";
import Link from "next/link";
import { useRoulette } from "hooks/useRoulette";

const AppWrapper = styled.div`
  font-family: sans-serif;
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: 1fr 8fr 1fr;
  grid-template-areas:
    "header header"
    "roulette controller"
    "footer footer";
`;
const InitialAppWrapper = styled.div`
  font-family: sans-serif;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 8fr 1fr;
  grid-template-areas:
    "header"
    "roulette"
    "controller"
    "footer";
`;

const Wrapper: FC<{ initial: boolean, children: ReactNode }> = ({ initial, children }) => {
  return initial ? (
    <InitialAppWrapper>{children}</InitialAppWrapper>
  ) : (
    <AppWrapper>{children}</AppWrapper>
  );
};

const H1Wrapper = styled.h1`
  font-size: 30px;
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
    onRest: () => set(!flip)
  });
  return <animated.h2 style={props}>Enter candidates</animated.h2>;
}

const FM = memo(FlippingMessage);

type Props = {
  rouletteName: string;
};

export const RouletteContainer = (props: Props) => {
  const {roulette, setRoulette, currentWinner, setCurrentWinner} = useRoulette(props.rouletteName);
  const [spinIt, setSpinIt] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [v, setV] = useState("");
  const initial = roulette.candidates.length < 2;

  return (
    <Wrapper initial={initial}>
      <MyModal
        winner={currentWinner}
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
      />
      <H1Wrapper><Link href={"/"}><a>Roulette</a></Link></H1Wrapper>
      <H2Wrapper>{props.rouletteName}</H2Wrapper>
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
                  setCurrentWinner(cw)
                }}
                onRest={() => {
                  setModalOpen(true);
                }}
              />
            </div>
            <button onClick={() => setSpinIt(!spinIt)}>
              {spinIt ? "Reset" : "Start"}
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
              case "Enter": {
                setRoulette({...roulette, candidates: [...roulette.candidates, { idx: roulette.candidates.length + 1, name: v, hide: false }]})
                setV("");
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
                changeHandler={(s: string) => {}}
                deleteHandler={() => {}}
                hideHandler={() => {}}
                showHandler={() => {}}
              />
            );
          })}
        </CandidatesWrapper>
      </ControllerWrapper>
    </Wrapper>
  );
}
