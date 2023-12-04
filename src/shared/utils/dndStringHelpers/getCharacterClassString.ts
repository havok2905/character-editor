import { type IClass } from '../../../types/dnd/IClass';

export const getCharacterClassString = (classes: IClass[]): string => {
  return classes.map((klass) => {
    return `${klass.name} (${klass.level})`;
  }).join(', ');
};
