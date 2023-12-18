import {
  backstoryBoxHeight,
  baseFontLineHeight,
  boxedContentItemGap,
  nameFontSize,
  pagePadding,
  personalityTraitBoxHeight,
  secondHalfColumnStart,
  standardHalfColumn,
  standardSingleColumn,
} from './constants';
import { type Character } from '../../../types/schema';
import { getHeightString } from '../../utils/stringHelpers/getHeightString';
import { getWeightString } from '../../utils/stringHelpers/getWeightString';
import { jsPDF } from 'jspdf';
import { PdfContent } from '../pdfContent';
import {
  setBoxedContent,
  setHeader,
  setKeyValueStat,
  setName,
} from './shared';

export const biographySheet = (character: Character, doc: jsPDF) => {
  const name = new PdfContent(
    (x: number, y: number) => {
      setName(character, doc, x, y);
    },
    nameFontSize,
    standardSingleColumn,
    pagePadding,
    pagePadding,
    'top',
  );

  const header = new PdfContent(
    (x: number, y: number) => {
      setHeader(character, doc, x, y);
    },
    60,
    standardSingleColumn,
    pagePadding,
    name.getBottom() + 20,
    'top',
  );

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
        character.biography.backstory,
        x,
        y,
        standardHalfColumn,
        backstoryBoxHeight,
      );
    },
    backstoryBoxHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    150,
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
    flaws.getBottom() + boxedContentItemGap,
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

  name.render();
  header.render();

  personalityTraits.render();
  ideals.render();
  bonds.render();
  flaws.render();
  backstory.render();

  dress.render();
  eyes.render();
  hair.render();
  skin.render();
  height.render();
  weight.render();
  description.render();
};
