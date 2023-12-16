import {
  type AbilityScore,
  type Character,
  type Skill
} from '../../types/schema';
import { getCharacterClassString } from '../utils/dndStringHelpers/getCharacterClassString';
import { getCharacterHpString } from '../utils/dndStringHelpers/getCharacterHpString';
import { getCharacterSpeedString } from '../utils/dndStringHelpers/getCharacterSpeedString';
import { getGenderString } from '../utils/stringHelpers/getGenderString';
import { getHeightString } from '../utils/stringHelpers/getHeightString';
import { getNameString } from '../utils/stringHelpers/getNameString';
import { getWeightString } from '../utils/stringHelpers/getWeightString';
import { jsPDF } from 'jspdf';
import { plusOrNothingForNegative } from '../utils/plusOrNothingForNegative';

// LAYOUT NUMBERS

const height = 842; // Standard A4 in pixels
const width = 595; // Standard A4 in pixels
const pagePadding = 20;

const baseFontLineHeight = 14;
const baseFontSize = 12;
const nameFontSize = 40;

const standardHalfColumnGap = 20;
const standardHalfColumn = (width - (pagePadding * 2) - standardHalfColumnGap) / 2;
const secondHalfColumnStart = pagePadding + standardHalfColumn + standardHalfColumnGap;

// Only used in headers and do not need gaps
const standardThirdColumn = (width - (pagePadding * 2)) / 3;
const secondThirdColumnStart = pagePadding + standardThirdColumn;
const thirdThirdColumnStart = secondThirdColumnStart + standardThirdColumn;

const boxedContentItemGap = 20;
const boxedContentItemPadding = 4;

// NAME

const nameX = pagePadding;
const nameY = pagePadding;

// SUB HEADING

const subHeadingY = 90;
const subHeadingTwoY = 120;

// ABILITY SCORE

const abilityScoreItemGap = 10;
const abilityScoreItemSize = 70;
const abilityScoreItemStrokeWidth = 2;
const abilityScoreItemSkillGap = 10;

// STRENGTH

const strengthX = pagePadding;
const strengthY = 150;

const athleticsX = pagePadding + abilityScoreItemSize + abilityScoreItemSkillGap;
const athleticsY = strengthY;

// DEXTERITY

const dexterityX = pagePadding;
const dexterityY = strengthY + abilityScoreItemSize + abilityScoreItemGap;

const acrobaticsX = pagePadding + abilityScoreItemSize + abilityScoreItemSkillGap;
const acrobaticsY = dexterityY;

const sleightOfHandX = pagePadding + abilityScoreItemSize + abilityScoreItemSkillGap;
const sleightOfHandY = acrobaticsY + baseFontLineHeight;

const stealthX = pagePadding + abilityScoreItemSize + abilityScoreItemSkillGap;
const stealthY = sleightOfHandY + baseFontLineHeight;

// CONSTITUTION

const constitutionX = pagePadding;
const constitutionY = dexterityY + abilityScoreItemSize + abilityScoreItemGap;

// INTELLIGENCE

const intelligenceX = pagePadding;
const intelligenceY = constitutionY + abilityScoreItemSize + abilityScoreItemGap;

const arcanaX = pagePadding + abilityScoreItemSize + abilityScoreItemSkillGap;
const arcanaY = intelligenceY;

const historyX = pagePadding + abilityScoreItemSize + abilityScoreItemSkillGap;
const historyY = arcanaY + baseFontLineHeight;

const investigationX = pagePadding + abilityScoreItemSize + abilityScoreItemSkillGap;
const investigationY = historyY + baseFontLineHeight;

const natureX = pagePadding + abilityScoreItemSize + abilityScoreItemSkillGap;
const natureY = investigationY + baseFontLineHeight;

const religionX = pagePadding + abilityScoreItemSize + abilityScoreItemSkillGap;
const religionY = natureY + baseFontLineHeight;

// WISDOM

const wisdomX = pagePadding;
const wisdomY = intelligenceY + abilityScoreItemSize + abilityScoreItemGap;

const animalHandlingX = pagePadding + abilityScoreItemSize + abilityScoreItemSkillGap;
const animalHandlingY = wisdomY;

const insightX = pagePadding + abilityScoreItemSize + abilityScoreItemSkillGap;
const insightY = animalHandlingY + baseFontLineHeight;

const medicineX = pagePadding + abilityScoreItemSize + abilityScoreItemSkillGap;
const medicineY = insightY + baseFontLineHeight;

const perceptionX = pagePadding + abilityScoreItemSize + abilityScoreItemSkillGap;
const perceptionY = medicineY + baseFontLineHeight;

const survivalX = pagePadding + abilityScoreItemSize + abilityScoreItemSkillGap;
const survivalY = perceptionY + baseFontLineHeight;

// CHARISMA

const charismaX = pagePadding;
const charismaY = wisdomY + abilityScoreItemSize + abilityScoreItemGap;

const deceptionX = pagePadding + abilityScoreItemSize + abilityScoreItemSkillGap;
const deceptionY = charismaY;

const intimidationX = pagePadding + abilityScoreItemSize + abilityScoreItemSkillGap;
const intimidationY = deceptionY + baseFontLineHeight;

const performanceX = pagePadding + abilityScoreItemSize + abilityScoreItemSkillGap;
const performanceY = intimidationY + baseFontLineHeight;

const persuasionX = pagePadding + abilityScoreItemSize + abilityScoreItemSkillGap;
const persuasionY = performanceY + baseFontLineHeight;

// KEY VALUE STATS

const inspirationX = secondHalfColumnStart;
const inspirationY = 150;

const initiativeX = secondHalfColumnStart;
const initiativeY = inspirationY + baseFontLineHeight;

const proficiencyBonusX = secondHalfColumnStart;
const proficiencyBonusY = initiativeY + baseFontLineHeight;

const acX = secondHalfColumnStart;
const acY = proficiencyBonusY + baseFontLineHeight;

const hpX = secondHalfColumnStart;
const hpY = acY + baseFontLineHeight;

const tempHpX = secondHalfColumnStart;
const tempHpY = hpY + baseFontLineHeight;

const hitDiceX = secondHalfColumnStart;
const hitDiceY = tempHpY + baseFontLineHeight;

const sizeX = secondHalfColumnStart;
const sizeY = hitDiceY + baseFontLineHeight;

const speedX = secondHalfColumnStart;
const speedY = sizeY + baseFontLineHeight;

// PROFICIENCIES

const proficiencyBoxHeight = 60;

const languagesX = secondHalfColumnStart;
const languagesY = speedY + 30;

const armorX = secondHalfColumnStart;
const armorY = languagesY + proficiencyBoxHeight + boxedContentItemGap;

const weaponsX = secondHalfColumnStart;
const weaponsY = armorY + proficiencyBoxHeight + boxedContentItemGap;

const toolsX = secondHalfColumnStart;
const toolsY = weaponsY + proficiencyBoxHeight + boxedContentItemGap;

// BIOGRAPHY

const backstoryBoxHeight = 460;
const personalityTraitBoxHeight = 100;

const backstoryX = secondHalfColumnStart;
const backstoryY = 150;

const personalityTraitsX = pagePadding;
const personalityTraitsY = 150;

const idealsX = pagePadding;
const idealsY = personalityTraitsY + personalityTraitBoxHeight + boxedContentItemGap;

const bondsX = pagePadding;
const bondsY = idealsY + personalityTraitBoxHeight + boxedContentItemGap;

const flawsX = pagePadding;
const flawsY = bondsY + personalityTraitBoxHeight + boxedContentItemGap;

const dressX = pagePadding
const dressY = flawsY + personalityTraitBoxHeight + boxedContentItemGap;

const eyesX = pagePadding
const eyesY = dressY + baseFontLineHeight;

const hairX = pagePadding
const hairY = eyesY + baseFontLineHeight;

const skinX = pagePadding
const skinY = hairY + baseFontLineHeight;

const heightX = pagePadding
const heightY = skinY + baseFontLineHeight;

const weightX = pagePadding
const weightY = heightY + baseFontLineHeight;

const descriptionX = pagePadding
const descriptionY = weightY + baseFontLineHeight;

const setAbilityScore = (
  abilityScore: AbilityScore,
  label: string,
  doc: jsPDF,
  size: number,
  strokeWidth: number,
  x: number,
  y: number,
) => {
  const half = size / 2;
  const fontSizeLarge = 24;
  const fontSizeSmall = 10;

  const leftOffset = x + half + strokeWidth;
  const modY = y + strokeWidth + 12;
  const scoreY = modY + 12;
  const labelY = scoreY + 25;
  const profY = labelY + 10;
  
  doc.setLineWidth(strokeWidth);
  doc.setDrawColor(0, 0, 0);
  doc.rect(
    x + strokeWidth,
    y + strokeWidth,
    size,
    size
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

const setHeader = (
  character: Character,
  doc: jsPDF,
) => {
  doc.setLineWidth(0);

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'bold');
  doc.line(pagePadding, subHeadingY, width - pagePadding, subHeadingY);
  doc.text('Race', pagePadding, subHeadingY + 2, {
    baseline: 'top',
  });
  doc.text('Subrace', secondThirdColumnStart, subHeadingY + 2, {
    baseline: 'top',
  });
  doc.text('Class', thirdThirdColumnStart, subHeadingY + 2, {
    baseline: 'top',
  });
  doc.setFont('times', 'normal');
  doc.text(character.race.name, pagePadding, subHeadingY - 2, {
    baseline: 'bottom',
  });
  doc.text(character.race.subrace?.name ?? '', secondThirdColumnStart, subHeadingY - 2, {
    baseline: 'bottom',
  });
  doc.text(getCharacterClassString(character.classes), thirdThirdColumnStart, subHeadingY - 2, {
    baseline: 'bottom',
  });

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'bold');
  doc.line(pagePadding, subHeadingTwoY, width - pagePadding, subHeadingTwoY);
  doc.text('Background', pagePadding, subHeadingTwoY + 2, {
    baseline: 'top',
  });
  doc.text('Gender', secondThirdColumnStart, subHeadingTwoY + 2, {
    baseline: 'top',
  });
  doc.text('Alignment', thirdThirdColumnStart, subHeadingTwoY + 2, {
    baseline: 'top',
  });
  doc.setFont('times', 'normal');
  doc.text(character.background.name, pagePadding, subHeadingTwoY - 2, {
    baseline: 'bottom',
  });
  doc.text(getGenderString(character.biography.gender), secondThirdColumnStart, subHeadingTwoY - 2, {
    baseline: 'bottom',
  });
  doc.text(character.biography.alignment, thirdThirdColumnStart, subHeadingTwoY - 2, {
    baseline: 'bottom',
  });
};

const setName = (
  character: Character,
  doc: jsPDF,
) => {
  doc.setFontSize(nameFontSize);
  doc.setFont('times', 'normal');
  doc.text(getNameString(character.biography.name), nameX, nameY, {
    baseline: 'top',
  });
};

const setSkill = (
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

const setKeyValueStat = (
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

const setBoxedContent = (
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

const getProficiencyString = (skill: Skill) => {
  if (skill.proficiency === 'expertise') return '[E]';
  if (skill.proficiency === 'proficient') return '[P]';
  return '[ ]';
};

export const characterToPdf = (character: Character): jsPDF => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [ height, width ],
  });

  // CHARACTER PAGE

  setName(character, doc);

  setHeader(character, doc);

  setAbilityScore(
    character.abilityScores.str,
    'STRENGTH',
    doc,
    abilityScoreItemSize,
    abilityScoreItemStrokeWidth,
    strengthX,
    strengthY,
  );

  setSkill(
    'Athletics',
    character.skills.athletics,
    doc,
    athleticsX,
    athleticsY,
  );

  setAbilityScore(
    character.abilityScores.dex,
    'DEXTERITY',
    doc,
    abilityScoreItemSize,
    abilityScoreItemStrokeWidth,
    dexterityX,
    dexterityY,
  );

  setSkill(
    'Acrobatics',
    character.skills.acrobatics,
    doc,
    acrobaticsX,
    acrobaticsY,
  );

  setSkill(
    'Stealth',
    character.skills.stealth,
    doc,
    stealthX,
    stealthY,
  );

  setSkill(
    'Sleight of Hand',
    character.skills.sleightOfHand,
    doc,
    sleightOfHandX,
    sleightOfHandY,
  );

  setAbilityScore(
    character.abilityScores.con,
    'CONSTITUTION',
    doc,
    abilityScoreItemSize,
    abilityScoreItemStrokeWidth,
    constitutionX,
    constitutionY,
  );

  setAbilityScore(
    character.abilityScores.int,
    'INTELLIGENCE',
    doc,
    abilityScoreItemSize,
    abilityScoreItemStrokeWidth,
    intelligenceX,
    intelligenceY,
  );

  setSkill(
    'Arcana',
    character.skills.arcana,
    doc,
    arcanaX,
    arcanaY,
  );

  setSkill(
    'History',
    character.skills.history,
    doc,
    historyX,
    historyY,
  );

  setSkill(
    'Investigation',
    character.skills.investigation,
    doc,
    investigationX,
    investigationY,
  );

  setSkill(
    'Nature',
    character.skills.nature,
    doc,
    natureX,
    natureY,
  );

  setSkill(
    'Religion',
    character.skills.religion,
    doc,
    religionX,
    religionY,
  );

  setAbilityScore(
    character.abilityScores.wis,
    'WISDOM',
    doc,
    abilityScoreItemSize,
    abilityScoreItemStrokeWidth,
    wisdomX,
    wisdomY,
  );

  setSkill(
    'Animal Handling',
    character.skills.animalHandling,
    doc,
    animalHandlingX,
    animalHandlingY,
  );

  setSkill(
    'Insight',
    character.skills.insight,
    doc,
    insightX,
    insightY,
  );

  setSkill(
    'Medicine',
    character.skills.medicine,
    doc,
    medicineX,
    medicineY,
  );

  setSkill(
    'Perception',
    character.skills.perception,
    doc,
    perceptionX,
    perceptionY,
  );

  setSkill(
    'Survival',
    character.skills.survival,
    doc,
    survivalX,
    survivalY,
  );

  setAbilityScore(
    character.abilityScores.cha,
    'CHARISMA',
    doc,
    abilityScoreItemSize,
    abilityScoreItemStrokeWidth,
    charismaX,
    charismaY,
  );

  setSkill(
    'Deception',
    character.skills.deception,
    doc,
    deceptionX,
    deceptionY,
  );

  setSkill(
    'Intimidation',
    character.skills.intimidation,
    doc,
    intimidationX,
    intimidationY,
  );

  setSkill(
    'Performance',
    character.skills.performance,
    doc,
    performanceX,
    performanceY,
  );

  setSkill(
    'Persuasion',
    character.skills.persuasion,
    doc,
    persuasionX,
    persuasionY,
  );

  setKeyValueStat(
    doc,
    'Inspiration',
    (character.inspiration ? 'Yes' : 'No'),
    inspirationX,
    inspirationY,
  );

  setKeyValueStat(
    doc,
    'Initiative',
    `${plusOrNothingForNegative(character.initiative)}${character.initiative}`,
    initiativeX,
    initiativeY,
  );

  setKeyValueStat(
    doc,
    'Proficiency Bonus',
    `${plusOrNothingForNegative(character.proficiencyBonus)}${character.proficiencyBonus}`,
    proficiencyBonusX,
    proficiencyBonusY,
  );

  setKeyValueStat(
    doc,
    'AC',
    `${character.ac}`,
    acX,
    acY,
  );

  setKeyValueStat(
    doc,
    'HP',
    getCharacterHpString(character),
    hpX,
    hpY,
  );

  setKeyValueStat(
    doc,
    'Temp HP',
    `${character.hitPoints.temporary}`,
    tempHpX,
    tempHpY,
  );

  setKeyValueStat(
    doc,
    'Hit Dice',
    `${character.classes.map(item => `${item.level}d${item.hitDiceValue}`)}`,
    hitDiceX,
    hitDiceY,
  );

  setKeyValueStat(
    doc,
    'Size',
    character.race.size,
    sizeX,
    sizeY,
  );

  setKeyValueStat(
    doc,
    'Speed',
    getCharacterSpeedString(character.speed),
    speedX,
    speedY,
  );

  setBoxedContent(
    doc,
    'Languages',
    character.languages.join(', '),
    languagesX,
    languagesY,
    standardHalfColumn,
    proficiencyBoxHeight,
  );

  setBoxedContent(
    doc,
    'Armor',
    character.proficiencies.armor.join(', '),
    armorX,
    armorY,
    standardHalfColumn,
    proficiencyBoxHeight,
  );

  setBoxedContent(
    doc,
    'Weapons',
    character.proficiencies.weapon.join(', '),
    weaponsX,
    weaponsY,
    standardHalfColumn,
    proficiencyBoxHeight,
  );

  setBoxedContent(
    doc,
    'Tools',
    character.proficiencies.tool.join(', '),
    toolsX,
    toolsY,
    standardHalfColumn,
    proficiencyBoxHeight,
  );

  // BIOGRAPHY PAGE

  doc.addPage();

  setName(character, doc);
  setHeader(character, doc);

  setBoxedContent(
    doc,
    'Personality Traits',
    character.biography.personalityTraits,
    personalityTraitsX,
    personalityTraitsY,
    standardHalfColumn,
    personalityTraitBoxHeight,
  );

  setBoxedContent(
    doc,
    'Ideals',
    character.biography.ideals,
    idealsX,
    idealsY,
    standardHalfColumn,
    personalityTraitBoxHeight,
  );

  setBoxedContent(
    doc,
    'Bonds',
    character.biography.bonds,
    bondsX,
    bondsY,
    standardHalfColumn,
    personalityTraitBoxHeight,
  );

  setBoxedContent(
    doc,
    'Flaws',
    character.biography.flaws,
    flawsX,
    flawsY,
    standardHalfColumn,
    personalityTraitBoxHeight,
  );

  setBoxedContent(
    doc,
    'Backstory',
    character.biography.backstory,
    backstoryX,
    backstoryY,
    standardHalfColumn,
    backstoryBoxHeight,
  );

  setKeyValueStat(
    doc,
    'Dress',
    character.biography.physicalDescription.dress,
    dressX,
    dressY,
  );

  setKeyValueStat(
    doc,
    'Eyes',
    character.biography.physicalDescription.eyes,
    eyesX,
    eyesY,
  );

  setKeyValueStat(
    doc,
    'Hair',
    character.biography.physicalDescription.hair,
    hairX,
    hairY,
  );

  setKeyValueStat(
    doc,
    'Skin',
    character.biography.physicalDescription.skin,
    skinX,
    skinY,
  );

  setKeyValueStat(
    doc,
    'Height',
    getHeightString(character.biography.physicalDescription.height),
    heightX,
    heightY,
  );

  setKeyValueStat(
    doc,
    'Weight',
    getWeightString(character.biography.physicalDescription.weight),
    weightX,
    weightY,
  );

  setKeyValueStat(
    doc,
    'Description',
    character.biography.physicalDescription.description,
    descriptionX,
    descriptionY,
  );

  return doc;
};
