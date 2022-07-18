export type Candidate = {
  idx: number;
  name: string;
  hide: boolean;
};

export type Roulette = {
  id: string;
  name: string;
  description?: string
  candidates: Candidate[];
}
