import { type Character } from '../../../types/schema';

export const getCharacterHpString = (character: Character): string => {
  return `${character.hitPoints.current}/${character.hitPoints.max}`;
};
