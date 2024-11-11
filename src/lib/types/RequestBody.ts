import type { EvaluatedPosition } from './Position.ts';

export type ParseRequestBody = {
  pgn?: string;
};

export type ReportRequestBody = {
  positions?: EvaluatedPosition[];
};
