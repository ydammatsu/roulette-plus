export type Candidate = {
  idx: number;
  name: string;
  hide: boolean;
};
export type State = {
  candidates: Candidate[];
  currentWinner: Candidate;
};

export const initialState = {
  candidates: [],
  currentWinner: { idx: -1, name: "dummy", hide: true }
};
