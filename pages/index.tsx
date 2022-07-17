import {
  useReducer,
  useState,
  FormEvent,
  KeyboardEvent,
  FC,
  memo,
  ReactNode,
  useEffect
} from "react";
import { NextPage } from "next";
import { useSpring, animated } from "react-spring";
import { MemoRoulette } from "components/Roulette";
import { JPInput } from "components/JPInput";
import { CandidateHeader, CandidateRow } from "components/Candidate";
import MyModal from "components/MyModal";
import styled from "styled-components";
import { initialState } from "stateManagement/states";
import { Candidate } from "stateManagement/states";
import { reducerWithMiddleware } from "stateManagement/reducer";
import { getAppStateFromLS } from "lib/localStorage";

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

const HeaderWrapper = styled.div`
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

const getInitialState = () => {
  try {
    return getAppStateFromLS();
  } catch {
    return initialState;
  }
};


const Home: NextPage = () => {
  const [isRendered, setIsRendered] = useState(false)
  useEffect(() => {
    setIsRendered(true);
  }, []);

  const [spinIt, setSpinIt] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [state, dispatch] = useReducer(
    reducerWithMiddleware,
    initialState
  );

  useEffect(() => {
    const initialState = getInitialState()
    dispatch({
      type: "set_initial_state",
      candidates: initialState.candidates,
      currentWinner: initialState.currentWinner
    })
  }, [])

  const [v, setV] = useState("");
  const initial = state.candidates.length < 2;
  return isRendered ? (
    <Wrapper initial={initial}>
      <MyModal
        winner={state.currentWinner}
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
      />
      <HeaderWrapper>
        <h1>Roulette</h1>
      </HeaderWrapper>
      <RouletteWrapper>
        {initial ? (
          <FM />
        ) : (
          <>
            <div>
              <MemoRoulette
                radius={100}
                candidates={state.candidates}
                spinIt={spinIt}
                onCurrentWinnerChange={(cw: Candidate) => {
                  dispatch({
                    type: "set_current_winner",
                    candidate: cw
                  });
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
                dispatch({
                  type: "add_candidate",
                  candidate: { idx: 1, name: v, hide: false }
                });
                setV("");
              }
            }
          }}
        />
        <CandidatesWrapper>
          {state.candidates.length > 0 ? <CandidateHeader /> : null}
          {state.candidates.map((c, i) => {
            return (
              <CandidateRow
                name={c.name}
                hide={c.hide}
                idx={c.idx}
                key={i}
                highlight={c.idx === state.currentWinner.idx}
                changeHandler={(s: string) => {
                  dispatch({
                    type: "change_candidate",
                    candidateName: s,
                    index: i
                  });
                }}
                deleteHandler={() => {
                  dispatch({ type: "delete_candidate", index: i });
                }}
                hideHandler={() => {
                  dispatch({ type: "hide_candidate", index: i });
                }}
                showHandler={() => {
                  dispatch({ type: "show_candidate", index: i });
                }}
              />
            );
          })}
        </CandidatesWrapper>
      </ControllerWrapper>
    </Wrapper>
  ): (<></>);
}

export default Home
