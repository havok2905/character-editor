import {
  type AbilityScore,
  type Character,
  // type Entry,
  type Feature,
  type Skill,
} from '../../../types/schema';
import {
  abilityScoreItemSize,
  abilityScoreItemStrokeWidth,
  baseFontLineHeight,
  baseFontSize,
  boxedContentItemPadding,
  nameFontSize,
  pagePadding,
  secondThirdColumnStart,
  standardHalfColumn,
  standardSingleColumn,
  thirdThirdColumnStart,
  width,
} from './constants';
import { getCharacterClassString } from '../../utils/dndStringHelpers/getCharacterClassString';
import { getGenderString } from '../../utils/stringHelpers/getGenderString';
import { getNameString } from '../../utils/stringHelpers/getNameString';
import { plusOrNothingForNegative } from '../../utils/plusOrNothingForNegative';
import { jsPDF } from 'jspdf';

const getProficiencyString = (skill: Skill) => {
  if (skill.proficiency === 'expertise') return '[E]';
  if (skill.proficiency === 'proficient') return '[P]';
  return '[ ]';
};

export const setAbilityScore = (
  abilityScore: AbilityScore,
  label: string,
  doc: jsPDF,
  x: number,
  y: number,
) => {
  const half = abilityScoreItemSize / 2;
  const fontSizeLarge = 24;
  const fontSizeSmall = 10;

  const leftOffset = x + half + abilityScoreItemStrokeWidth;
  const modY = y + abilityScoreItemStrokeWidth + 12;
  const scoreY = modY + 12;
  const labelY = scoreY + 25;
  const profY = labelY + 10;
  
  doc.setLineWidth(abilityScoreItemStrokeWidth);
  doc.setDrawColor(0, 0, 0);
  doc.rect(
    x + abilityScoreItemStrokeWidth,
    y + abilityScoreItemStrokeWidth,
    abilityScoreItemSize,
    abilityScoreItemSize
  );
  
  doc.setFontSize(fontSizeSmall);
  doc.setFont('times', 'normal');
  doc.text(`${plusOrNothingForNegative(abilityScore.mod)}${abilityScore.mod}`, leftOffset, modY, {
    align: 'center',
    baseline: 'top',
  });

  doc.setFontSize(fontSizeLarge);
  doc.setFont('times', 'normal');
  doc.text(abilityScore.score.toLocaleString(), leftOffset, scoreY, {
    align: 'center',
    baseline: 'top',
  });

  doc.setFontSize(fontSizeSmall);
  doc.setFont('times', 'normal');
  doc.text(label, leftOffset, labelY, {
    align: 'center',
    baseline: 'top',
  });

  doc.setFontSize(fontSizeSmall);
  doc.setFont('times', 'normal');
  doc.text(abilityScore.savingThrowProficiency ? '*' : '-', leftOffset, profY, {
    align: 'center',
    baseline: 'top',
  });
};

export const setBoxedContent = (
  doc: jsPDF,
  key: string,
  value: string,
  x: number,
  y: number,
  sizeX: number,
  sizeY: number,
) => {
  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'bold');
  doc.text(
    key,
    x,
    y,
    {
      baseline: 'bottom',
    }
  );

  doc.setLineWidth(0);
  doc.rect(
    x,
    y,
    sizeX,
    sizeY,
  );

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(
    value,
    x + boxedContentItemPadding,
    y + boxedContentItemPadding,
    {
      baseline: 'top',
      maxWidth: standardHalfColumn - boxedContentItemPadding * 2,
    }
  );
};

export const setFeature = (
  feature: Feature,
  doc: jsPDF,
  x: number,
  y: number,
) => {
  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'bold');
  doc.text(feature.name, x, y, {
    baseline: 'top',
  });

  let entryY = y + baseFontLineHeight;

  feature.entries.forEach((entry) => {
    if (typeof entry === 'string') {
      doc.setFontSize(baseFontSize);
      doc.setFont('times', 'normal');
      doc.text(entry, x, entryY, {
        baseline: 'top',
        maxWidth: standardSingleColumn,
      });
      entryY += baseFontLineHeight;
    }
  });
};

export const setHeader = (
  character: Character,
  doc: jsPDF,
  x: number,
  y: number,
) => {
  doc.setLineWidth(0);

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'bold');
  doc.line(x, y, width - pagePadding, y);
  doc.text('Race', x, y + 2, {
    baseline: 'top',
  });
  doc.text('Subrace', secondThirdColumnStart, y + 2, {
    baseline: 'top',
  });
  doc.text('Class', thirdThirdColumnStart, y + 2, {
    baseline: 'top',
  });
  doc.setFont('times', 'normal');
  doc.text(character.race.name, x, y - 2, {
    baseline: 'bottom',
  });
  doc.text(character.race.subrace?.name ?? '', secondThirdColumnStart, y - 2, {
    baseline: 'bottom',
  });
  doc.text(getCharacterClassString(character.classes), thirdThirdColumnStart, y - 2, {
    baseline: 'bottom',
  });

  const subHeadingTwoY = y + 30;

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'bold');
  doc.line(x, subHeadingTwoY, width - pagePadding, subHeadingTwoY);
  doc.text('Background', x, subHeadingTwoY + 2, {
    baseline: 'top',
  });
  doc.text('Gender', secondThirdColumnStart, subHeadingTwoY + 2, {
    baseline: 'top',
  });
  doc.text('Alignment', thirdThirdColumnStart, subHeadingTwoY + 2, {
    baseline: 'top',
  });
  doc.setFont('times', 'normal');
  doc.text(character.background.name, x, subHeadingTwoY - 2, {
    baseline: 'bottom',
  });
  doc.text(getGenderString(character.biography.gender), secondThirdColumnStart, subHeadingTwoY - 2, {
    baseline: 'bottom',
  });
  doc.text(character.biography.alignment, thirdThirdColumnStart, subHeadingTwoY - 2, {
    baseline: 'bottom',
  });
};

export const setKeyValueStat = (
  doc: jsPDF,
  key: string,
  value: string,
  x: number,
  y: number,
) => {
  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(`${key}: ${value}`, x, y, {
    baseline: 'top',
  });
};

export const setName = (
  character: Character,
  doc: jsPDF,
  x: number,
  y: number,
) => {
  doc.setFontSize(nameFontSize);
  doc.setFont('times', 'normal');
  doc.text(getNameString(character.biography.name), x, y, {
    baseline: 'top',
  });
};

export const setSkill = (
  label: string,
  skill: Skill,
  doc: jsPDF,
  x: number,
  y: number,
) => {
  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(
    `${getProficiencyString(skill)} ${plusOrNothingForNegative(skill.mod)}${skill.mod} ${label}`, 
    x,
    y,
    { baseline: 'top' },
  );
};
