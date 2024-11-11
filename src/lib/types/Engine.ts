export type Evaluation = {
  type: 'cp' | 'mate';
  value: number;
};

export type EngineLine = {
  id: number;
  depth: number;
  evaluation: Evaluation;
  moveUCI: string;
  moveSAN?: string;
};
