import {
  backstoryBoxHeight,
  baseFontLineHeight,
  boxedContentItemGap,
  pagePadding,
  personalityTraitBoxHeight,
  secondHalfColumnStart,
  standardHalfColumn,
} from './constants';
import { type Character } from '../../../types/schema';
import { getHeightString } from '../../utils/stringHelpers/getHeightString';
import { getWeightString } from '../../utils/stringHelpers/getWeightString';
import { type jsPDF } from 'jspdf';
import { PdfContent } from '../pdfContent';
import {
  getBackstory,
  getNameAndHeader,
  setBoxedContent,
  setKeyValueStat,
} from './shared';

export const biographySheet = (character: Character, doc: jsPDF) => {
  const personalityTraits = new PdfContent(
    (x: number, y: number) => {
      setBoxedContent(
        doc,
        'Personality Traits',
        character.biography.personalityTraits,
        x,
        y,
        standardHalfColumn,
        personalityTraitBoxHeight,
      );
    },
    personalityTraitBoxHeight,
    standardHalfColumn,
    pagePadding,
    150,
    'top',
  );

  const ideals = new PdfContent(
    (x: number, y: number) => {
      setBoxedContent(
        doc,
        'Ideals',
        character.biography.ideals,
        x,
        y,
        standardHalfColumn,
        personalityTraitBoxHeight,
      );
    },
    personalityTraitBoxHeight,
    standardHalfColumn,
    pagePadding,
    personalityTraits.getBottom() + boxedContentItemGap,
    'top',
  );

  const bonds = new PdfContent(
    (x: number, y: number) => {
      setBoxedContent(
        doc,
        'Ideals',
        character.biography.bonds,
        x,
        y,
        standardHalfColumn,
        personalityTraitBoxHeight,
      );
    },
    personalityTraitBoxHeight,
    standardHalfColumn,
    pagePadding,
    ideals.getBottom() + boxedContentItemGap,
    'top',
  );

  const flaws = new PdfContent(
    (x: number, y: number) => {
      setBoxedContent(
        doc,
        'Flaws',
        character.biography.flaws,
        x,
        y,
        standardHalfColumn,
        personalityTraitBoxHeight,
      );
    },
    personalityTraitBoxHeight,
    standardHalfColumn,
    pagePadding,
    bonds.getBottom() + boxedContentItemGap,
    'top',
  );

  const backstory = new PdfContent(
    (x: number, y: number) => {
      setBoxedContent(
        doc,
        'Backstory',
        '',
        x,
        y,
        standardHalfColumn,
        backstoryBoxHeight,
      );

      getBackstory(character, doc, y);
    },
    backstoryBoxHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    150,
    'top',
  );

  const age = new PdfContent(
    (x: number, y: number) => {
      setKeyValueStat(
        doc,
        'Age',
        String(character.biography.physicalDescription.age),
        x,
        y,
      );
    },
    baseFontLineHeight,
    standardHalfColumn,
    pagePadding,
    flaws.getBottom() + boxedContentItemGap,
    'top',
  );

  const dress = new PdfContent(
    (x: number, y: number) => {
      setKeyValueStat(
        doc,
        'Dress',
        character.biography.physicalDescription.dress,
        x,
        y,
      );
    },
    baseFontLineHeight,
    standardHalfColumn,
    pagePadding,
    age.getBottom(),
    'top',
  );

  const eyes = new PdfContent(
    (x: number, y: number) => {
      setKeyValueStat(
        doc,
        'Eyes',
        character.biography.physicalDescription.eyes,
        x,
        y,
      );
    },
    baseFontLineHeight,
    standardHalfColumn,
    pagePadding,
    dress.getBottom(),
    'top',
  );

  const hair = new PdfContent(
    (x: number, y: number) => {
      setKeyValueStat(
        doc,
        'Hair',
        character.biography.physicalDescription.hair,
        x,
        y,
      );
    },
    baseFontLineHeight,
    standardHalfColumn,
    pagePadding,
    eyes.getBottom(),
    'top',
  );

  const skin = new PdfContent(
    (x: number, y: number) => {
      setKeyValueStat(
        doc,
        'Skin',
        character.biography.physicalDescription.skin,
        x,
        y,
      );
    },
    baseFontLineHeight,
    standardHalfColumn,
    pagePadding,
    hair.getBottom(),
    'top',
  );

  const height = new PdfContent(
    (x: number, y: number) => {
      setKeyValueStat(
        doc,
        'Height',
        getHeightString(character.biography.physicalDescription.height),
        x,
        y,
      );
    },
    baseFontLineHeight,
    standardHalfColumn,
    pagePadding,
    skin.getBottom(),
    'top',
  );

  const weight = new PdfContent(
    (x: number, y: number) => {
      setKeyValueStat(
        doc,
        'Weight',
        getWeightString(character.biography.physicalDescription.weight),
        x,
        y,
      );
    },
    baseFontLineHeight,
    standardHalfColumn,
    pagePadding,
    height.getBottom(),
    'top',
  );

  const description = new PdfContent(
    (x: number, y: number) => {
      setKeyValueStat(
        doc,
        'Description',
        character.biography.physicalDescription.description,
        x,
        y,
      );
    },
    baseFontLineHeight,
    standardHalfColumn,
    pagePadding,
    weight.getBottom(),
    'top',
  );

  getNameAndHeader(character, doc);

  personalityTraits.render();
  ideals.render();
  bonds.render();
  flaws.render();
  backstory.render();

  age.render();
  dress.render();
  eyes.render();
  hair.render();
  skin.render();
  height.render();
  weight.render();
  description.render();
};
