import {
  abilityScoreItemGap,
  abilityScoreItemSize,
  baseFontLineHeight,
  baseFontSize,
  height,
  pagePadding,
  nameFontSize,
  proficiencyBoxHeight,
  secondHalfColumnStart,
  skillWidth,
  standardHalfColumn,
  standardSingleColumn,
} from './constants';
import { type Creature } from '../../../types/schema';
import { getCharacterSpeedString } from '../../utils/dndStringHelpers/getCharacterSpeedString';
import { getHpString } from '../../utils/dndStringHelpers/getHpString';
import { type jsPDF } from 'jspdf';
import { PdfContent } from '../pdfContent';
import { plusOrNothingForNegative } from '../../utils/plusOrNothingForNegative';
import {
  setAbilityScore,
  setBoxedContent,
  setKeyValueStat,
  setSkill,
} from './shared';
import fs from 'fs';
import path from 'path';

export const creatureSheet = (
  creature: Creature,
  doc: jsPDF
) => {
  const name = new PdfContent(
    (x: number, y: number) => {
      doc.setFontSize(nameFontSize);
      doc.setFont('times', 'normal');
      doc.text(creature.name, x, y, {
        baseline: 'top',
      });
    },
    nameFontSize,
    standardSingleColumn,
    pagePadding,
    pagePadding,
    'top',
  );

  const str = new PdfContent(
    (x: number, y: number) => { setAbilityScore(creature.abilityScores.str, 'STRENGTH', doc, x, y); },
    abilityScoreItemSize,
    abilityScoreItemSize,
    pagePadding,
    name.getBottom() + 20,
    'top',
  );

  const dex = new PdfContent(
    (x: number, y: number) => { setAbilityScore(creature.abilityScores.dex, 'DEXTERITY', doc, x, y); },
    abilityScoreItemSize,
    abilityScoreItemSize,
    pagePadding,
    str.getBottom() + abilityScoreItemGap,
    'top',
  );

  const con = new PdfContent(
    (x: number, y: number) => { setAbilityScore(creature.abilityScores.con, 'CONSTITUTION', doc, x, y); },
    abilityScoreItemSize,
    abilityScoreItemSize,
    pagePadding,
    dex.getBottom() + abilityScoreItemGap,
    'top',
  );

  const int = new PdfContent(
    (x: number, y: number) => { setAbilityScore(creature.abilityScores.int, 'INTELLIGENCE', doc, x, y); },
    abilityScoreItemSize,
    abilityScoreItemSize,
    pagePadding,
    con.getBottom() + abilityScoreItemGap,
    'top',
  );

  const wis = new PdfContent(
    (x: number, y: number) => { setAbilityScore(creature.abilityScores.wis, 'WISDOM', doc, x, y); },
    abilityScoreItemSize,
    abilityScoreItemSize,
    pagePadding,
    int.getBottom() + abilityScoreItemGap,
    'top',
  );

  const cha = new PdfContent(
    (x: number, y: number) => { setAbilityScore(creature.abilityScores.cha, 'CHARISMA', doc, x, y); },
    abilityScoreItemSize,
    abilityScoreItemSize,
    pagePadding,
    wis.getBottom() + abilityScoreItemGap,
    'top',
  );

  const athletics = new PdfContent(
    (x: number, y: number) => { setSkill('Athletics', creature.skills.athletics, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    str.getRight() + abilityScoreItemGap,
    str.getTop(),
    'top',
  );

  const acrobatics = new PdfContent(
    (x: number, y: number) => { setSkill('Acrobatics', creature.skills.acrobatics, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    dex.getRight() + abilityScoreItemGap,
    dex.getTop(),
    'top',
  );

  const stealth = new PdfContent(
    (x: number, y: number) => { setSkill('Stealth', creature.skills.stealth, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    dex.getRight() + abilityScoreItemGap,
    acrobatics.getBottom(),
    'top',
  );

  const sleightOfHand = new PdfContent(
    (x: number, y: number) => { setSkill('Sleight of Hand', creature.skills.sleightOfHand, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    dex.getRight() + abilityScoreItemGap,
    stealth.getBottom(),
    'top',
  );

  const arcana = new PdfContent(
    (x: number, y: number) => { setSkill('Arcana', creature.skills.arcana, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    int.getRight() + abilityScoreItemGap,
    int.getTop(),
    'top',
  );

  const history = new PdfContent(
    (x: number, y: number) => { setSkill('History', creature.skills.history, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    int.getRight() + abilityScoreItemGap,
    arcana.getBottom(),
    'top',
  );

  const investigation = new PdfContent(
    (x: number, y: number) => { setSkill('Investigation', creature.skills.investigation, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    int.getRight() + abilityScoreItemGap,
    history.getBottom(),
    'top',
  );

  const nature = new PdfContent(
    (x: number, y: number) => { setSkill('Nature', creature.skills.nature, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    int.getRight() + abilityScoreItemGap,
    investigation.getBottom(),
    'top',
  );

  const religion = new PdfContent(
    (x: number, y: number) => { setSkill('Religion', creature.skills.religion, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    int.getRight() + abilityScoreItemGap,
    nature.getBottom(),
    'top',
  );

  const animalHandling = new PdfContent(
    (x: number, y: number) => { setSkill('Animal Handling', creature.skills.animalHandling, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    wis.getRight() + abilityScoreItemGap,
    wis.getTop(),
    'top',
  );

  const insight = new PdfContent(
    (x: number, y: number) => { setSkill('Insight', creature.skills.insight, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    wis.getRight() + abilityScoreItemGap,
    animalHandling.getBottom(),
    'top',
  );

  const medicine = new PdfContent(
    (x: number, y: number) => { setSkill('Medicine', creature.skills.medicine, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    wis.getRight() + abilityScoreItemGap,
    insight.getBottom(),
    'top',
  );

  const perception = new PdfContent(
    (x: number, y: number) => { setSkill('Perception', creature.skills.perception, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    wis.getRight() + abilityScoreItemGap,
    medicine.getBottom(),
    'top',
  );

  const survival = new PdfContent(
    (x: number, y: number) => { setSkill('Survival', creature.skills.survival, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    wis.getRight() + abilityScoreItemGap,
    perception.getBottom(),
    'top',
  );

  const deception = new PdfContent(
    (x: number, y: number) => { setSkill('Deception', creature.skills.deception, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    cha.getRight() + abilityScoreItemGap,
    cha.getTop(),
    'top',
  );

  const intimidation = new PdfContent(
    (x: number, y: number) => { setSkill('Intimidation', creature.skills.intimidation, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    cha.getRight() + abilityScoreItemGap,
    deception.getBottom(),
    'top',
  );

  const performance = new PdfContent(
    (x: number, y: number) => { setSkill('Performance', creature.skills.performance, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    cha.getRight() + abilityScoreItemGap,
    intimidation.getBottom(),
    'top',
  );

  const persuasion = new PdfContent(
    (x: number, y: number) => { setSkill('Persuasion', creature.skills.persuasion, doc, x, y); },
    baseFontLineHeight,
    skillWidth,
    cha.getRight() + abilityScoreItemGap,
    performance.getBottom(),
    'top',
  );

  const proficiencyBonus = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'Proficiency Bonus', `${plusOrNothingForNegative(creature.proficiencyBonus)}${creature.proficiencyBonus}`, x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    name.getBottom() + 20,
    'top',
  );

  const cr = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'CR', creature.cr, x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    proficiencyBonus.getBottom(),
    'top',
  );

  const ac = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'AC', `${creature.ac}`, x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    cr.getBottom(),
    'top',
  );

  const hp = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'HP', getHpString(creature), x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    ac.getBottom(),
    'top',
  );

  const tempHp = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'Temp HP', `${creature.hitPoints.temporary}`, x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    hp.getBottom(),
    'top',
  );

  const type = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'Type', creature.creatureType, x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    tempHp.getBottom(),
    'top',
  );

  const size = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'Size', creature.size, x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    type.getBottom(),
    'top',
  );

  const speed = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'Speed', getCharacterSpeedString(creature.speed), x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    size.getBottom(),
    'top',
  );

  const conditionImmunities = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'Condition Immunities', creature.conditionImmunities.join(', '), x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    speed.getBottom(),
    'top',
  );

  const conditionResistances = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'Condition Resistances', creature.conditionResistances.join(', '), x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    conditionImmunities.getBottom(),
    'top',
  );

  const conditionVulnerabilities = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'Condition Vulnerabilities', creature.conditionVulnerabilities.join(', '), x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    conditionResistances.getBottom(),
    'top',
  );

  const damageImmunities = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'Damage Immunities', creature.damageImmunities.join(', '), x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    conditionVulnerabilities.getBottom(),
    'top',
  );

  const damageResistances = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'Damage Resistances', creature.damageResistances.join(', '), x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    damageImmunities.getBottom(),
    'top',
  );

  const damageVulnerabilities = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'Damage Vulnerabilities', creature.damageVulnerabilities.join(', '), x, y); },
    baseFontLineHeight,
    standardHalfColumn,
    secondHalfColumnStart,
    damageResistances.getBottom(),
    'top',
  );

  const senses = new PdfContent(
    (x: number, y: number) => { setKeyValueStat(doc, 'Senses', creature.senses.join(', '), x, y); },
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
        creature.languages.join(', '),
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

  name.render();

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

  proficiencyBonus.render();
  cr.render();
  ac.render();
  hp.render();
  tempHp.render();
  type.render();
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

  if (creature.token) {
    const tokenPath = path.resolve(path.join(__dirname, `../../../world/tokens/${creature.token}`));
    const token = fs.readFileSync(tokenPath, { encoding: 'base64' });
  
    doc.addImage(token, 'PNG', pagePadding, height - pagePadding - 150, 150, 150);
  }
};
