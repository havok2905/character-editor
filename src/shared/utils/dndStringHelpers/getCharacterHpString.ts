import { type ICharacter } from '../../../types/dnd/ICharacter';

export const getCharacterHpString = (character: ICharacter): string => {
  return `${character.hitPoints.current}/${character.hitPoints.max}`;
};
