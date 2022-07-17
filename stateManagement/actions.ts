import { Candidate } from "./states";

type SetInitialStateAction = {
  name: string;
  type: "set_initial_state";
  candidates: Candidate[];
  currentWinner: Candidate;
}

type AddCandidateAction = {
  name: string;
  type: "add_candidate";
  candidate: Candidate;
};

type ChangeCandidateAction = {
  name: string;
  type: "change_candidate";
  candidateName: string;
  index: number;
};

type DeleteCandidateAction = {
  name: string;
  type: "delete_candidate";
  index: number;
};

type HideCandidateAction = {
  name: string;
  type: "hide_candidate";
  index: number;
};

type ShowCandidateAction = {
  name: string;
  type: "show_candidate";
  index: number;
};

type SetCurrentWinnerAction = {
  name: string;
  type: "set_current_winner";
  candidate: Candidate;
};

export type Action =
  | SetInitialStateAction
  | AddCandidateAction
  | ChangeCandidateAction
  | DeleteCandidateAction
  | HideCandidateAction
  | ShowCandidateAction
  | SetCurrentWinnerAction;
