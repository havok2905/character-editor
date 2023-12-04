import { type ISize } from './ISize';

export interface IRace {
  name: string;
  size: ISize;
  subrace?: {
    name: string
  }
}
