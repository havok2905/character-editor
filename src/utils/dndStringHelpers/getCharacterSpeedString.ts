import { type Speed } from '../../../types/schema';

export const getCharacterSpeedString = (speed: Speed[]): string => {
  const speedItems = speed.map((item) => {
    return `${item.name ? item.name + ' ' : ''}${item.value} ${item.unit}`;
  });

  return speedItems.join(', ');
};
