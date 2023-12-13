import { type Character } from '../../types/schema';
import { getCharacterClassString } from '../utils/dndStringHelpers/getCharacterClassString';
import { getCharacterHpString } from '../utils/dndStringHelpers/getCharacterHpString';
import { getCharacterSpeedString } from '../utils/dndStringHelpers/getCharacterSpeedString';
import { getGenderString } from '../utils/stringHelpers/getGenderString';
import { getNameString } from '../utils/stringHelpers/getNameString';
import { plusOrNothingForNegative } from '../utils/plusOrNothingForNegative';

interface IMarkdownTableColumn {
  id: string;
  label: string;
}

type IMarkdownTableRow = Record<string, unknown>;

const getMarkdownTable = (
  columns: IMarkdownTableColumn[],
  rows: IMarkdownTableRow[]
): string => {
  const headerCells = columns.map((column) => `|${column.label}`);
  const headerDividers = columns.map((column) => `|${column.label.replace(/[\S]/g, '-')}`);
  
  const rowsString = rows.map((row) => {
    const rowString = columns.map((column) => `${row[column.id]}`).join('|');
    return `|${rowString}|`;
  }).join('\n');
  
  return `${headerCells.join('')}|
${headerDividers.join('')}|
${rowsString}`;
};

const getMarkdownKeyValuePair = (key: string, value: unknown) => {
  return `**${key}:** ${value}`;
};

export const characterToMarkdown = (character: Character | null): string => {
  if (!character) return '';

  const abilityScoreTable = getMarkdownTable([
    { id: 'str', label: 'STR' },
    { id: 'dex', label: 'DEX' },
    { id: 'con', label: 'CON' },
    { id: 'int', label: 'INT' },
    { id: 'wis', label: 'WIS' },
    { id: 'cha', label: 'CHA' },
  ], [
    {
      str: character.abilityScores.str.savingThrowProficiency ? '*' : '-',
      dex: character.abilityScores.dex.savingThrowProficiency ? '*' : '-',
      con: character.abilityScores.con.savingThrowProficiency ? '*' : '-',
      int: character.abilityScores.int.savingThrowProficiency ? '*' : '-',
      wis: character.abilityScores.wis.savingThrowProficiency ? '*' : '-',
      cha: character.abilityScores.cha.savingThrowProficiency ? '*' : '-',
    },
    {
      str: character.abilityScores.str.score,
      dex: character.abilityScores.dex.score,
      con: character.abilityScores.con.score,
      int: character.abilityScores.int.score,
      wis: character.abilityScores.wis.score,
      cha: character.abilityScores.cha.score,
    },
    {
      str: character.abilityScores.str.mod,
      dex: character.abilityScores.dex.mod,
      con: character.abilityScores.con.mod,
      int: character.abilityScores.int.mod,
      wis: character.abilityScores.wis.mod,
      cha: character.abilityScores.cha.mod,
    },
  ]);

  const skillsTable = getMarkdownTable([
    { id: 'name', label: 'Name' },
    { id: 'ability', label: 'Ability' },
    { id: 'mod', label: 'Mod' },
    { id: 'proficiency', label: 'Proficiency' },
  ], [
    {
      name: 'Animal Handling',
      ability: character.skills.animalHandling.ability,
      mod: character.skills.animalHandling.mod,
      proficiency: character.skills.animalHandling.proficiency,
    },
    {
      name: 'Acrobatics',
      ability: character.skills.acrobatics.ability,
      mod: character.skills.acrobatics.mod,
      proficiency: character.skills.acrobatics.proficiency,
    },
    {
      name: 'Arcana',
      ability: character.skills.arcana.ability,
      mod: character.skills.arcana.mod,
      proficiency: character.skills.arcana.proficiency,
    },
    {
      name: 'Athletics',
      ability: character.skills.athletics.ability,
      mod: character.skills.athletics.mod,
      proficiency: character.skills.athletics.proficiency,
    },
    {
      name: 'Deception',
      ability: character.skills.deception.ability,
      mod: character.skills.deception.mod,
      proficiency: character.skills.deception.proficiency,
    },
    {
      name: 'History',
      ability: character.skills.history.ability,
      mod: character.skills.history.mod,
      proficiency: character.skills.history.proficiency,
    },
    {
      name: 'Insight',
      ability: character.skills.insight.ability,
      mod: character.skills.insight.mod,
      proficiency: character.skills.insight.proficiency,
    },
    {
      name: 'Intimidation',
      ability: character.skills.intimidation.ability,
      mod: character.skills.intimidation.mod,
      proficiency: character.skills.intimidation.proficiency,
    },
    {
      name: 'Investigation',
      ability: character.skills.investigation.ability,
      mod: character.skills.investigation.mod,
      proficiency: character.skills.investigation.proficiency,
    },
    {
      name: 'Medicine',
      ability: character.skills.medicine.ability,
      mod: character.skills.medicine.mod,
      proficiency: character.skills.medicine.proficiency,
    },
    {
      name: 'Nature',
      ability: character.skills.nature.ability,
      mod: character.skills.nature.mod,
      proficiency: character.skills.nature.proficiency,
    },
    {
      name: 'Perception',
      ability: character.skills.perception.ability,
      mod: character.skills.perception.mod,
      proficiency: character.skills.perception.proficiency,
    },
    {
      name: 'Performance',
      ability: character.skills.performance.ability,
      mod: character.skills.performance.mod,
      proficiency: character.skills.performance.proficiency,
    },
    {
      name: 'Persuasion',
      ability: character.skills.persuasion.ability,
      mod: character.skills.persuasion.mod,
      proficiency: character.skills.persuasion.proficiency,
    },
    {
      name: 'Religion',
      ability: character.skills.religion.ability,
      mod: character.skills.religion.mod,
      proficiency: character.skills.religion.proficiency,
    },
    {
      name: 'Sleight of Hand',
      ability: character.skills.sleightOfHand.ability,
      mod: character.skills.sleightOfHand.mod,
      proficiency: character.skills.sleightOfHand.proficiency,
    },
    {
      name: 'Stealth',
      ability: character.skills.stealth.ability,
      mod: character.skills.stealth.mod,
      proficiency: character.skills.stealth.proficiency,
    },
    {
      name: 'Survival',
      ability: character.skills.survival.ability,
      mod: character.skills.survival.mod,
      proficiency: character.skills.survival.proficiency,
    },
  ]);

  const ac = getMarkdownKeyValuePair('AC', character.ac);
  const alignment = getMarkdownKeyValuePair('Alignment', character.biography.alignment);
  const armor = getMarkdownKeyValuePair('Armor', character.proficiencies.armor.join(', '));
  const background = getMarkdownKeyValuePair('Background', character.background.name);
  const classes = getMarkdownKeyValuePair('Class', getCharacterClassString(character.classes));
  const gender = getMarkdownKeyValuePair('Gender', getGenderString(character.biography.gender));
  const hitDice = getMarkdownKeyValuePair('Hit Dice', character.classes.map(item => `${item.level}d${item.hitDiceValue}`));
  const hp = getMarkdownKeyValuePair('HP', getCharacterHpString(character));
  const initiative = getMarkdownKeyValuePair('Initiative', `${plusOrNothingForNegative(character.initiative)}${character.initiative}`);
  const inspiration = getMarkdownKeyValuePair('Inspiration', character.inspiration ? 'yes' : 'none');
  const languages = getMarkdownKeyValuePair('Languages', character.languages.join(', '));
  const name = getNameString(character.biography.name);
  const proficiencyBonus = getMarkdownKeyValuePair('Proficiency Bonus', `${plusOrNothingForNegative(character.proficiencyBonus)}${character.proficiencyBonus}`);
  const race = getMarkdownKeyValuePair('Race', character.race.name);
  const size = getMarkdownKeyValuePair('Size', character.race.size);
  const speed = getMarkdownKeyValuePair('Speed', getCharacterSpeedString(character.speed));
  const subRace = getMarkdownKeyValuePair('Subrace', character.race.subrace?.name);
  const tempHp = getMarkdownKeyValuePair('Temp HP', character.hitPoints.temporary);
  const tools = getMarkdownKeyValuePair('Tools', character.proficiencies.tool.join(', '));
  const weapons = getMarkdownKeyValuePair('Weapons', character.proficiencies.weapon.join(', '));

  return `# ${name}

${race}

${subRace}

${background}

${classes}

${gender}

${alignment}

${inspiration}

---

## Abilities

${abilityScoreTable}

---

## Skills

${skillsTable}

---

${proficiencyBonus}

${initiative}

${ac}

${hp}

${tempHp}

${hitDice}

${size}

${speed}

---

${armor}

${weapons}

${tools}

${languages}`;
};
