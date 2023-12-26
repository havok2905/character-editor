import {
  abilityScoreItemGap,
  abilityScoreItemSize,
  baseFontLineHeight,
  baseFontSize,
  boxedContentItemGap,
  height,
  pagePadding,
  proficiencyBoxHeight,
  secondHalfColumnStart,
  skillWidth,
  standardHalfColumn,
} from './constants';
import { type Character } from '../../../types/schema';
import { getCharacterSpeedString } from '../../utils/dndStringHelpers/getCharacterSpeedString';
import { getHpString } from '../../utils/dndStringHelpers/getHpString';
import { plusOrNothingForNegative } from '../../utils/plusOrNothingForNegative';
import { type jsPDF } from 'jspdf';
import { PdfContent } from '../pdfContent';
import {
  getNameAndHeader,
  setAbilityScore,
  setBoxedContent,
  setKeyValueStat,
  setSkill,
} from './shared';
import fs from 'fs';
import path from 'path';

export const characterSheet = (character: Character, doc: jsPDF) => {
  const str = new PdfContent(
    (x: number, y: number) => { setAbilityScore(character.abilityScores.str, 'STRENGTH', doc, x, y); },
    abilityScoreItemSize,
    abilityScoreItemSize,
    pagePadding,
    150,
    'top',
  );

  const dex = new PdfContent(
    (x: number, y: number) => { setAbilityScore(character.abilityScores.dex, 'DEXTERITY', doc, x, y); },
    abilityScoreItemSize,
    abilityScoreItemSize,
    pagePadding,
    str.getBottom() + abilityScoreItemGap,
    'top',
  );

  const con = new PdfContent(
    (x: number, y: number) => { setAbilityScore(character.abilityScores.con, 'CONSTITUTION', doc, x, y); },
    abilityScoreItemSize,
    abilityScoreItemSize,
    pagePadding,
    dex.getBottom() + abilityScoreItemGap,
    'top',
  );

  const int = new PdfContent(
    (x: number, y: number) => { setAbilityScore(character.abilityScores.int, 'INTELLIGENCE', doc, x, y); },
    abilityScoreItemSize,
    abilityScoreItemSize,
    pagePadding,
    con.getBottom() + abilityScoreItemGap,
    'top',
  );

  const wis = new PdfContent(
    (x: number, y: number) => { setAbilityScore(character.abilityScores.wis, 'WISDOM', doc, x, y); },
    abilityScoreItemSize,
    abilityScoreItemSize,
    pagePadding,
    int.getBottom() + abilityScoreItemGap,
    'top',
  );

  const cha = new PdfContent(
    (x: number, y: number) => { setAbilityScore(character.abilityScores.cha, 'CHARISMA', doc, x, y); },
    abilityScoreItemSize,
    abilityScoreItemSize,
    pagePadding,
    wis.getBottom() + abilityScoreItemGap,
    'top',
  );

  const athletics = new PdfContent(
    (x: number, y: number) => { setSkill('Athletics', character.skills.athletics, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    str.getRight() + abilityScoreItemGap,
    str.getTop(),
    'top',
  );

  const acrobatics = new PdfContent(
    (x: number, y: number) => { setSkill('Acrobatics', character.skills.acrobatics, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    dex.getRight() + abilityScoreItemGap,
    dex.getTop(),
    'top',
  );

  const stealth = new PdfContent(
    (x: number, y: number) => { setSkill('Stealth', character.skills.stealth, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    dex.getRight() + abilityScoreItemGap,
    acrobatics.getBottom(),
    'top',
  );

  const sleightOfHand = new PdfContent(
    (x: number, y: number) => { setSkill('Sleight of Hand', character.skills.sleightOfHand, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    dex.getRight() + abilityScoreItemGap,
    stealth.getBottom(),
    'top',
  );

  const arcana = new PdfContent(
    (x: number, y: number) => { setSkill('Arcana', character.skills.arcana, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    int.getRight() + abilityScoreItemGap,
    int.getTop(),
    'top',
  );

  const history = new PdfContent(
    (x: number, y: number) => { setSkill('History', character.skills.history, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    int.getRight() + abilityScoreItemGap,
    arcana.getBottom(),
    'top',
  );

  const investigation = new PdfContent(
    (x: number, y: number) => { setSkill('Investigation', character.skills.investigation, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    int.getRight() + abilityScoreItemGap,
    history.getBottom(),
    'top',
  );

  const nature = new PdfContent(
    (x: number, y: number) => { setSkill('Nature', character.skills.nature, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    int.getRight() + abilityScoreItemGap,
    investigation.getBottom(),
    'top',
  );

  const religion = new PdfContent(
    (x: number, y: number) => { setSkill('Religion', character.skills.religion, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    int.getRight() + abilityScoreItemGap,
    nature.getBottom(),
    'top',
  );

  const animalHandling = new PdfContent(
    (x: number, y: number) => { setSkill('Animal Handling', character.skills.animalHandling, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    wis.getRight() + abilityScoreItemGap,
    wis.getTop(),
    'top',
  );

  const insight = new PdfContent(
    (x: number, y: number) => { setSkill('Insight', character.skills.insight, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    wis.getRight() + abilityScoreItemGap,
    animalHandling.getBottom(),
    'top',
  );

  const medicine = new PdfContent(
    (x: number, y: number) => { setSkill('Medicine', character.skills.medicine, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    wis.getRight() + abilityScoreItemGap,
    insight.getBottom(),
    'top',
  );

  const perception = new PdfContent(
    (x: number, y: number) => { setSkill('Perception', character.skills.perception, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    wis.getRight() + abilityScoreItemGap,
    medicine.getBottom(),
    'top',
  );

  const survival = new PdfContent(
    (x: number, y: number) => { setSkill('Survival', character.skills.survival, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    wis.getRight() + abilityScoreItemGap,
    perception.getBottom(),
    'top',
  );

  const deception = new PdfContent(
    (x: number, y: number) => { setSkill('Deception', character.skills.deception, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    cha.getRight() + abilityScoreItemGap,
    cha.getTop(),
    'top',
  );

  const intimidation = new PdfContent(
    (x: number, y: number) => { setSkill('Intimidation', character.skills.intimidation, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    cha.getRight() + abilityScoreItemGap,
    deception.getBottom(),
    'top',
  );

  const performance = new PdfContent(
    (x: number, y: number) => { setSkill('Performance', character.skills.performance, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    cha.getRight() + abilityScoreItemGap,
    intimidation.getBottom(),
    'top',
  );

  const persuasion = new PdfContent(
    (x: number, y: number) => { setSkill('Persuasion', character.skills.persuasion, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    cha.getRight() + abilityScoreItemGap,
    performance.getBottom(),
    'top',
  );

  const inspiration = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'Inspiration', (character.inspiration ? 'Yes' : 'No'), x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    150,
    'top',
  );

  const initiative = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'Initiative', `${plusOrNothingForNegative(character.initiative)}${character.initiative}`, x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    inspiration.getBottom(),
    'top',
  );

  const proficiencyBonus = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'Proficiency Bonus', `${plusOrNothingForNegative(character.proficiencyBonus)}${character.proficiencyBonus}`, x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    initiative.getBottom(),
    'top',
  );

  const ac = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'AC', `${character.ac}`, x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    proficiencyBonus.getBottom(),
    'top',
  );

  const hp = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'HP', getHpString(character), x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    ac.getBottom(),
    'top',
  );

  const tempHp = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'Temp HP', `${character.hitPoints.temporary}`, x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    hp.getBottom(),
    'top',
  );

  const hitDice = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'Hit Dice', `${character.classes.map(item => `${item.level}d${item.hitDiceValue}`)}`, x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    tempHp.getBottom(),
    'top',
  );

  const size = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'Size', character.race.size, x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    hitDice.getBottom(),
    'top',
  );

  const speed = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'Speed', getCharacterSpeedString(character.speed), x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    size.getBottom(),
    'top',
  );

  const conditionImmunities = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'Condition Immunities', character.conditionImmunities.join(', '), x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    speed.getBottom(),
    'top',
  );

  const conditionResistances = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'Condition Resistances', character.conditionResistances.join(', '), x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    conditionImmunities.getBottom(),
    'top',
  );

  const conditionVulnerabilities = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'Condition Vulnerabilities', character.conditionVulnerabilities.join(', '), x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    conditionResistances.getBottom(),
    'top',
  );

  const damageImmunities = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'Damage Immunities', character.damageImmunities.join(', '), x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    conditionVulnerabilities.getBottom(),
    'top',
  );

  const damageResistances = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'Damage Resistances', character.damageResistances.join(', '), x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    damageImmunities.getBottom(),
    'top',
  );

  const damageVulnerabilities = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'Damage Vulnerabilities', character.damageVulnerabilities.join(', '), x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    damageResistances.getBottom(),
    'top',
  );

  const senses = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'Senses', character.senses.join(', '), x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    damageVulnerabilities.getBottom(),
    'top',
  );

  const languages = new PdfContent(
    (x: number, y: number) => {
      setBoxedContent(
        doc,
        'Languages',
        character.languages.join(', '),
        x,
        y,
        standardHalfColumn,
        proficiencyBoxHeight,
      );
    },
    baseFontSize + proficiencyBoxHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    senses.getBottom() + 30,
    'top',
  );

  const armor = new PdfContent(
    (x: number, y: number) => {
      setBoxedContent(
        doc,
        'Armor',
        character.proficiencies.armor.join(', '),
        x,
        y,
        standardHalfColumn,
        proficiencyBoxHeight,
      );
    },
    baseFontSize + proficiencyBoxHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    languages.getBottom() + boxedContentItemGap,
    'top',
  );

  const weapons = new PdfContent(
    (x: number, y: number) => {
      setBoxedContent(
        doc,
        'Weapons',
        character.proficiencies.weapon.join(', '),
        x,
        y,
        standardHalfColumn,
        proficiencyBoxHeight,
      );    
    },
    baseFontSize + proficiencyBoxHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    armor.getBottom() + boxedContentItemGap,
    'top',
  );

  const tools = new PdfContent(
    (x: number, y: number) => {
      setBoxedContent(
        doc,
        'Tools',
        character.proficiencies.tool.join(', '),
        x,
        y,
        standardHalfColumn,
        proficiencyBoxHeight,
      );
    },
    baseFontSize + proficiencyBoxHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    weapons.getBottom() + boxedContentItemGap,
    'top',
  );

  getNameAndHeader(character, doc);

  str.render();
  dex.render();
  con.render();
  int.render();
  wis.render();
  cha.render();

  athletics.render();

  acrobatics.render();
  stealth.render();
  sleightOfHand.render();

  arcana.render();
  investigation.render();
  history.render();
  nature.render();
  religion.render();

  animalHandling.render();
  insight.render();
  medicine.render();
  perception.render();
  survival.render();

  deception.render();
  intimidation.render();
  performance.render();
  persuasion.render();

  inspiration.render();
  initiative.render();
  proficiencyBonus.render();
  ac.render();
  hp.render();
  tempHp.render();
  hitDice.render();
  size.render();
  speed.render();

  conditionImmunities.render();
  conditionResistances.render();
  conditionVulnerabilities.render();
  damageImmunities.render();
  damageResistances.render();
  damageVulnerabilities.render();
  senses.render();

  languages.render();
  armor.render();
  weapons.render();
  tools.render();

  if (character.token) {
    const tokenPath = path.resolve(path.join(__dirname, `../../../assets/tokens/${character.token}`));
    const token = fs.readFileSync(tokenPath, { encoding: 'base64' });
  
    doc.addImage(token, 'PNG', pagePadding, height - pagePadding - 150, 150, 150);
  }
};
