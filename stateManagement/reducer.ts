import { Action } from "./actions";
import { State } from "./states";
import { saveAppStateToLS } from "../lib/localStorage";
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "set_initial_state":
      return {
        candidates: action.candidates,
        currentWinner: action.currentWinner
      };
    case "add_candidate":
      return {
        ...state,
        candidates: [
          action.candidate,
          ...state.candidates.map((c) => ({ ...c, idx: c.idx + 1 }))
        ]
      };
    case "delete_candidate":
      return {
        ...state,
        candidates: state.candidates.filter((_, i) => i !== action.index)
      };
    case "change_candidate":
      let changeTarget = state.candidates[action.index];
      return {
        ...state,
        candidates: [
          ...state.candidates.slice(0, action.index),
          { ...changeTarget, name: action.candidateName },
          ...state.candidates.slice(
            action.index + 1,
            state.candidates.length + 1
          )
        ]
      };
    case "hide_candidate":
      let hideTarget = state.candidates[action.index];
      return {
        ...state,
        candidates: [
          ...state.candidates.slice(0, action.index),
          { ...hideTarget, hide: true },
          ...state.candidates.slice(
            action.index + 1,
            state.candidates.length + 1
          )
        ]
      };
    case "show_candidate":
      let showTarget = state.candidates[action.index];
      return {
        ...state,
        candidates: [
          ...state.candidates.slice(0, action.index),
          { ...showTarget, hide: false },
          ...state.candidates.slice(
            action.index + 1,
            state.candidates.length + 1
          )
        ]
      };
    case "set_current_winner":
      return {
        ...state,
        currentWinner: action.candidate
      };

    default:
      return state;
  }
};

export const reducerWithMiddleware: typeof reducer = (state, action) => {
  const s = reducer(state, action);

  saveAppStateToLS(s);
  return s;
};
