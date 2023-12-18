// LAYOUT NUMBERS

export const height = 842; // Standard A4 in pixels
export const width = 595; // Standard A4 in pixels
export const pagePadding = 20;

export const baseFontLineHeight = 14;
export const baseFontSize = 12;
export const nameFontSize = 40;

export const standardSingleColumn = width - pagePadding * 2;

export const standardHalfColumnGap = 20;
export const standardHalfColumn = (width - (pagePadding * 2) - standardHalfColumnGap) / 2;
export const secondHalfColumnStart = pagePadding + standardHalfColumn + standardHalfColumnGap;

// Only used in headers and do not need gaps
export const standardThirdColumn = (width - (pagePadding * 2)) / 3;
export const secondThirdColumnStart = pagePadding + standardThirdColumn;
export const thirdThirdColumnStart = secondThirdColumnStart + standardThirdColumn;

export const boxedContentItemGap = 20;
export const boxedContentItemPadding = 4;

// ABILITY SCORE

export const abilityScoreItemGap = 10;
export const abilityScoreItemSize = 70;
export const abilityScoreItemStrokeWidth = 2;
export const abilityScoreItemSkillGap = 10;
export const skillWidth = 100;

// PROFICIENCIES

export const proficiencyBoxHeight = 60;

// BIOGRAPHY

export const backstoryBoxHeight = 460;
export const personalityTraitBoxHeight = 100;
