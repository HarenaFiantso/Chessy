import type { ClassificationCount } from './Classification';
import type { EvaluatedPosition } from './Position';

export type Report = {
  accuracies: {
    white: number;
    black: number;
  };
  classifications: {
    white: ClassificationCount;
    black: ClassificationCount;
  };
  positions: EvaluatedPosition[];
};
