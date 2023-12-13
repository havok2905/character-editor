import {
  type AbilityScore,
  type Character,
  type Skill
} from '../../types/schema';
import { getCharacterClassString } from '../utils/dndStringHelpers/getCharacterClassString';
import { getCharacterHpString } from '../utils/dndStringHelpers/getCharacterHpString';
import { getCharacterSpeedString } from '../utils/dndStringHelpers/getCharacterSpeedString';
import { getGenderString } from '../utils/stringHelpers/getGenderString';
import { getNameString } from '../utils/stringHelpers/getNameString';
import { jsPDF } from 'jspdf';
import { plusOrNothingForNegative } from '../utils/plusOrNothingForNegative';

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

const getProficiencyString = (skill: Skill) => {
  if (skill.proficiency === 'expertise') return '[E]';
  if (skill.proficiency === 'proficient') return '[P]';
  return '[ ]';
};

export const characterToPdf = (character: Character): jsPDF => {

  // LAYOUT NUMBERS

  const height = 842; // Standard A4 in pixels
  const width = 595; // Standard A4 in pixels
  const pagePadding = 20;

  const baseFontLineHeight = 14;
  const baseFontSize = 12;
  const nameFontSize = 40;

  const standardHalfColumn = (width - (pagePadding * 2)) / 2;
  const standardThirdColumn = (width - (pagePadding * 2)) / 3;

  const secondHalfColumnStart = pagePadding + standardHalfColumn;
  const secondThirdColumnStart = pagePadding + standardThirdColumn;
  const thirdThirdColumnStart = secondThirdColumnStart + standardThirdColumn;

  // NAME NUMBERS

  const nameX = pagePadding;
  const nameY = pagePadding;

  // SUB HEADING NUMBERS

  const subHeadingY = 90;
  const subHeadingTwoY = 120;

  // ABILITY SCORE NUMBERS
  
  const abilityScoreItemGap = 10;
  const abilityScoreItemSize = 70;
  const abilityScoreItemStrokeWidth = 2;
  const abilityScoreItemSkillGap = 10;

  // STRENGTH NUMBERS

  const strengthX = pagePadding;
  const strengthY = 150;

  const athleticsX = pagePadding + abilityScoreItemSize + abilityScoreItemSkillGap;
  const athleticsY = strengthY;

  // DEXTERITY NUMBERS

  const dexterityX = pagePadding;
  const dexterityY = strengthY + abilityScoreItemSize + abilityScoreItemGap;

  const acrobaticsX = pagePadding + abilityScoreItemSize + abilityScoreItemSkillGap;
  const acrobaticsY = dexterityY;

  const sleightOfHandX = pagePadding + abilityScoreItemSize + abilityScoreItemSkillGap;
  const sleightOfHandY = acrobaticsY + baseFontLineHeight;

  const stealthX = pagePadding + abilityScoreItemSize + abilityScoreItemSkillGap;
  const stealthY = sleightOfHandY + baseFontLineHeight;

  // CONSTITUTION NUMBERS

  const constitutionX = pagePadding;
  const constitutionY = dexterityY + abilityScoreItemSize + abilityScoreItemGap;

  // INTELLIGENCE NUMBERS

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

  // WISDOM NUMBERS

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

  // CHARISMA NUMBERS
  
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

  // KEY VALUE STAT NUMBERS

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

  const proficiencyItemGap = 10;
  const proficiencySectionHeight = 36;
  const proficiencySectionGap = 14;

  const languagesX = secondHalfColumnStart;
  const languagesY = speedY + proficiencySectionHeight + proficiencySectionGap;

  const armorX = secondHalfColumnStart;
  const armorY = languagesY + proficiencySectionHeight + proficiencyItemGap;

  const weaponsX = secondHalfColumnStart;
  const weaponsY = armorY + proficiencySectionHeight + proficiencyItemGap;

  const toolsX = secondHalfColumnStart;
  const toolsY = weaponsY + proficiencySectionHeight + proficiencyItemGap;

  // DOC GENERATION

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [ height, width ],
  });

  doc.setFont('times', 'normal');

  // DOC GENERATION - NAME

  doc.setFontSize(nameFontSize);
  doc.text(getNameString(character.biography.name), nameX, nameY, {
    baseline: 'top',
  });

  // DOC GENERATION - FIRST SUB HEADING

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

  // DOC GENERATION - SECOND SUB HEADING
  
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

  // DOC GENERATION - ABILITY SCORES - STRENGTH

  setAbilityScore(
    character.abilityScores.str,
    'STRENGTH',
    doc,
    abilityScoreItemSize,
    abilityScoreItemStrokeWidth,
    strengthX,
    strengthY,
  );

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(
    `${getProficiencyString(character.skills.athletics)} ${plusOrNothingForNegative(character.skills.athletics.mod)}${character.skills.athletics.mod} Athletics`, 
    athleticsX,
    athleticsY,
    { baseline: 'top' },
  );

  // DOC GENERATION - ABILITY SCORES - DEXTERITY

  setAbilityScore(
    character.abilityScores.dex,
    'DEXTERITY',
    doc,
    abilityScoreItemSize,
    abilityScoreItemStrokeWidth,
    dexterityX,
    dexterityY,
  );

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(
    `${getProficiencyString(character.skills.acrobatics)} ${plusOrNothingForNegative(character.skills.acrobatics.mod)}${character.skills.acrobatics.mod} Acrobatics`, acrobaticsX,
    acrobaticsY,
    { baseline: 'top' },
  );

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(
    `${getProficiencyString(character.skills.sleightOfHand)} ${plusOrNothingForNegative(character.skills.sleightOfHand.mod)}${character.skills.sleightOfHand.mod} Sleight of Hand`,
    sleightOfHandX,
    sleightOfHandY,
    { baseline: 'top' },
  );

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(
    `${getProficiencyString(character.skills.athletics)} ${plusOrNothingForNegative(character.skills.stealth.mod)}${character.skills.stealth.mod} Stealth`,
    stealthX,
    stealthY,
    { baseline: 'top' },
  );

  // DOC GENERATION - ABILITY SCORES - CONSTITUTION

  setAbilityScore(
    character.abilityScores.con,
    'CONSTITUTION',
    doc,
    abilityScoreItemSize,
    abilityScoreItemStrokeWidth,
    constitutionX,
    constitutionY,
  );

  // DOC GENERATION - ABILITY SCORES - INTELLIGENCE

  setAbilityScore(
    character.abilityScores.int,
    'INTELLIGENCE',
    doc,
    abilityScoreItemSize,
    abilityScoreItemStrokeWidth,
    intelligenceX,
    intelligenceY,
  );

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(
    `${getProficiencyString(character.skills.arcana)} ${plusOrNothingForNegative(character.skills.arcana.mod)}${character.skills.arcana.mod} Arcana`,
    arcanaX,
    arcanaY,
    { baseline: 'top' },
  );

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(
    `${getProficiencyString(character.skills.history)} ${plusOrNothingForNegative(character.skills.history.mod)}${character.skills.history.mod} History`,
    historyX,
    historyY,
    { baseline: 'top' },
  );

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(
    `${getProficiencyString(character.skills.investigation)} ${plusOrNothingForNegative(character.skills.investigation.mod)}${character.skills.investigation.mod} Investigation`,
    investigationX,
    investigationY,
    { baseline: 'top' },
  );

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(
    `${getProficiencyString(character.skills.nature)} ${plusOrNothingForNegative(character.skills.nature.mod)}${character.skills.nature.mod} Nature`,
    natureX,
    natureY,
    { baseline: 'top' },
  );

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(
    `${getProficiencyString(character.skills.religion)} ${plusOrNothingForNegative(character.skills.religion.mod)}${character.skills.religion.mod} Religion`,
    religionX,
    religionY,
    { baseline: 'top' },
  );

  // DOC GENERATION - ABILITY SCORES - WISDOM

  setAbilityScore(
    character.abilityScores.wis,
    'WISDOM',
    doc,
    abilityScoreItemSize,
    abilityScoreItemStrokeWidth,
    wisdomX,
    wisdomY,
  );

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(
    `${getProficiencyString(character.skills.animalHandling)} ${plusOrNothingForNegative(character.skills.animalHandling.mod)}${character.skills.animalHandling.mod} Animal Handling`,
    animalHandlingX,
    animalHandlingY,
    { baseline: 'top' },
  );

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(
    `${getProficiencyString(character.skills.insight)} ${plusOrNothingForNegative(character.skills.insight.mod)}${character.skills.insight.mod} Insight`,
    insightX,
    insightY,
    { baseline: 'top' },
  );

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(
    `${getProficiencyString(character.skills.medicine)} ${plusOrNothingForNegative(character.skills.medicine.mod)}${character.skills.medicine.mod} Medicine`,
    medicineX,
    medicineY,
    { baseline: 'top' },
  );

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(
    `${getProficiencyString(character.skills.perception)} ${plusOrNothingForNegative(character.skills.perception.mod)}${character.skills.perception.mod} Perception`,
    perceptionX,
    perceptionY,
    { baseline: 'top' },
  );

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(
    `${getProficiencyString(character.skills.survival)} ${plusOrNothingForNegative(character.skills.survival.mod)}${character.skills.survival.mod} Survival`,
    survivalX,
    survivalY,
    { baseline: 'top' },
  );

  // DOC GENERATION - ABILITY SCORES - CHARISMA

  setAbilityScore(
    character.abilityScores.cha,
    'CHARISMA',
    doc,
    abilityScoreItemSize,
    abilityScoreItemStrokeWidth,
    charismaX,
    charismaY,
  );

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(
    `${getProficiencyString(character.skills.deception)} ${plusOrNothingForNegative(character.skills.deception.mod)}${character.skills.deception.mod} Deception`,
    deceptionX,
    deceptionY,
    { baseline: 'top' },
  );

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(
    `${getProficiencyString(character.skills.intimidation)} ${plusOrNothingForNegative(character.skills.intimidation.mod)}${character.skills.intimidation.mod} Intimidation`,
    intimidationX,
    intimidationY,
    { baseline: 'top' },
  );

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(
    `${getProficiencyString(character.skills.performance)} ${plusOrNothingForNegative(character.skills.performance.mod)}${character.skills.performance.mod} Performance`,
    performanceX,
    performanceY,
    { baseline: 'top' },
  );

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(
    `${getProficiencyString(character.skills.persuasion)} ${plusOrNothingForNegative(character.skills.persuasion.mod)}${character.skills.persuasion.mod} Persuasion`,
    persuasionX,
    persuasionY,
    { baseline: 'top' },
  );

  // DOC GENERATION - KEY VALUE STATS

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(`Inspiration: ${character.inspiration ? 'Yes' : 'No'}`, inspirationX, inspirationY, {
    baseline: 'top',
  });

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(`Initiative: ${plusOrNothingForNegative(character.initiative)}${character.initiative}`, initiativeX, initiativeY, {
    baseline: 'top',
  });

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(`Proficiency Bonus: ${plusOrNothingForNegative(character.proficiencyBonus)}${character.proficiencyBonus}`, proficiencyBonusX, proficiencyBonusY, {
    baseline: 'top',
  });

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(`AC: ${character.ac}`, acX, acY, {
    baseline: 'top',
  });

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(`HP: ${getCharacterHpString(character)}`, hpX, hpY, {
    baseline: 'top',
  });

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(`Temp HP: ${character.hitPoints.temporary}`, tempHpX, tempHpY, {
    baseline: 'top',
  });

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(`Hit Dice: ${character.classes.map(item => `${item.level}d${item.hitDiceValue}`)}`, hitDiceX, hitDiceY, {
    baseline: 'top',
  });

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(`Size: ${character.race.size}`, sizeX, sizeY, {
    baseline: 'top',
  });

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(`Speed: ${getCharacterSpeedString(character.speed)}`, speedX, speedY, {
    baseline: 'top',
  });

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(`Languages: ${character.languages.join(', ')}`, languagesX, languagesY, {
    baseline: 'top',
    maxWidth: standardHalfColumn,
  });

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(`Armor: ${character.proficiencies.armor.join(', ')}`, armorX, armorY, {
    baseline: 'top',
    maxWidth: standardHalfColumn,
  });

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(`Weapons: ${character.proficiencies.weapon.join(', ')}`, weaponsX, weaponsY, {
    baseline: 'top',
    maxWidth: standardHalfColumn,
  });

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(`Tools: ${character.proficiencies.tool.join(', ')}`, toolsX, toolsY, {
    baseline: 'top',
    maxWidth: standardHalfColumn,
  });

  return doc;
};
