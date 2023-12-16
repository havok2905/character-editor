import { type Height } from "../../../types/schema";

export const getHeightString = (height: Height): string => {
  return `${height.firstUnit.value}${height.firstUnit.indicator}${height.secondUnit.value}${height.secondUnit.indicator}`;
};
