import { type ICharacter } from '../../types/dnd/ICharacter';
import { type QueryFunction } from 'react-query';

export const getCharacter = (id: string): QueryFunction<ICharacter> => {
  return () => fetch(`/api/character/${id}`).then(response => response.json());
};
