import {
  type Character,
  type Creature,
} from '../../../types/schema';

export const getHpString = (character: Character | Creature): string => {
  return `${character.hitPoints.current}/${character.hitPoints.max}`;
};
