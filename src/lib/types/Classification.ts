export enum Classification {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
}

export interface ClassificationCount extends Record<Classification, number> {}
