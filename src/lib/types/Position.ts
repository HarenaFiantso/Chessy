import type { EngineLine, Evaluation } from './Engine.ts';
import type { ClassificationCount } from './Classification.ts';

export type Move = {
  san: string;
  uci: string;
};

export type Position = {
  fen: string;
  move?: Move;
};

export interface EvaluatedPosition extends Position {
  move: Move;
  topLines: EngineLine[];
  cutoffEvaluation?: Evaluation;
  classification?: ClassificationCount;
  opening?: string;
  worker: string;
}
