export type Candidate = {
  idx: number;
  name: string;
  hide: boolean;
};

export type Roulette = {
  id: string;
  createdAt: number;
  name: string;
  description?: string
  candidates: Candidate[];
}
