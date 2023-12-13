import { type Gender } from '../../../types/schema';

export const getGenderString = (gender: Gender): string => {
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
