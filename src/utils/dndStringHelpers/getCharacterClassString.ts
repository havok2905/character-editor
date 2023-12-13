import { type Class } from '../../../types/schema';

export const getCharacterClassString = (classes: Class[]): string => {
  return classes.map((klass) => {
    return `${klass.name}${klass.subClass?.name ? `; ${klass.subClass.name}` : ''} (${klass.level})`;
  }).join(', ');
};
