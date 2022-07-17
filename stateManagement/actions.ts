import { Candidate } from "./states";

type SetInitialState = {
  type: "set_initial_state"
  candidates: Candidate[];
  currentWinner: Candidate;
}

type AddCandidateAction = {
  type: "add_candidate";
  candidate: Candidate;
};

type ChangeCandidateAction = {
  type: "change_candidate";
  candidateName: string;
  index: number;
};

type DeleteCandidateAction = {
  type: "delete_candidate";
  index: number;
};

type HideCandidateAction = {
  type: "hide_candidate";
  index: number;
};

type ShowCandidateAction = {
  type: "show_candidate";
  index: number;
};

type SetCurrentWinnerAction = {
  type: "set_current_winner";
  candidate: Candidate;
};

export type Action =
  | SetInitialState
  | AddCandidateAction
  | ChangeCandidateAction
  | DeleteCandidateAction
  | HideCandidateAction
  | ShowCandidateAction
  | SetCurrentWinnerAction;
