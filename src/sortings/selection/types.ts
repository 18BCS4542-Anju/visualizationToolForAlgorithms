export type sortedStatusShape = 'NS' | 'IP' | 'AS';

export type ControllerShape = {
  speed: number;
  size: number;
};

export type ArrayStatusShape = {
  sorted: sortedStatusShape;
  data: Array<number>;
};

export type AlogrithmShape = {
  data: Array<number>;
  sorted: sortedStatusShape;
  speed: number;
  updateSortedStatus: (arg0: sortedStatusShape) => void;
};
