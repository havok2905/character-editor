import { type ICharacter } from '../../types/dnd/ICharacter';

export const saveCharacter = (id: string, character: ICharacter) => {
  return fetch(`/api/character/${id}`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      character
    }),
  }).then(response => response.json());
};
