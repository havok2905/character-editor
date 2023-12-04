import { type IGender } from '../../../types/shared/IGender';

export const getGenderString = (gender: IGender): string => {
  const {
    name,
    pronouns
  } = gender;

  const pronounsString = pronouns ? pronouns?.map((pronounItem) => {
    const orderedParts = [
      pronounItem.objectivePronoun,
      pronounItem.subjectivePronoun,
      pronounItem.possessivePronoun
    ].filter(Boolean).join('/');

    return `(${orderedParts})`;
  }).join(',') : '';

  return `${name} ${pronounsString}`;
};
