export type Move = {
  san: string;
  uci: string;
};

export type Position = {
  fen: string;
  move?: Move;
};
