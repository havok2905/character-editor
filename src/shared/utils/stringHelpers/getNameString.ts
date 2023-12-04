import { type IName } from '../../../types/shared/IName';

export const getNameString = (name: IName): string => {
  const {
    first,
    honorific = '',
    last = '',
    middle = '',
    prefix = '',
    suffix = '',
    title = '',
  } = name;

  const nameOrderedParts = [
    prefix,
    first,
    middle,
    last,
    suffix,
    honorific
  ].filter(Boolean).join(' ');

  return `${nameOrderedParts}${title ? ` - ${title}` : ''}`;
};
