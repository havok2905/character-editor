import { type Weight } from '../../../types/schema';

export const getWeightString = (weight: Weight): string => {
  return `${weight.value}${weight.indicator}`;
};
