import { type Name } from '../../../types/schema';

export const getNameString = (name: Name): string => {
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
