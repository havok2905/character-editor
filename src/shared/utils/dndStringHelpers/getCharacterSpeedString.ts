import { type ISpeed } from '../../../types/dnd/ISpeed';

export const getCharacterSpeedString = (speed: ISpeed[]): string => {
  const speedItems = speed.map((item) => {
    return `${item.name ? item.name + ' ' : ''}${item.value} ${item.unit}`;
  });

  return speedItems.join(', ');
};
