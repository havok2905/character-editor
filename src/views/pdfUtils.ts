import {
  type Action,
  type Character,
  type Creature,
  type Feature,
  type List,
  type Skill,
  type SpellItem,
  type SpellList,
  type SpellListWarlock,
  type SubEntry,
  type Table,
} from '../../types/schema';
import { type Content } from 'pdfmake/interfaces';

export const getProficiencyString = (skill: Skill) => {
  if (skill.proficiency === 'expertise') return 'E';
  if (skill.proficiency === 'proficient') return 'P';
  return '';
};

export const getAbilityTable = (creature: Character | Creature) => {
  return {
    headerRows: 1,
    widths: [ '*', '*', '*', '*', '*', '*' ],
    body: [
      [ 'STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA' ],
      [
        creature.abilityScores.str.score,
        creature.abilityScores.dex.score,
        creature.abilityScores.con.score,
        creature.abilityScores.int.score,
        creature.abilityScores.wis.score,
        creature.abilityScores.cha.score,
      ],
      [
        creature.abilityScores.str.mod,
        creature.abilityScores.dex.mod,
        creature.abilityScores.con.mod,
        creature.abilityScores.int.mod,
        creature.abilityScores.wis.mod,
        creature.abilityScores.cha.mod,
      ],
      [
        creature.abilityScores.str.savingThrowProficiency ? '*' : '-',
        creature.abilityScores.dex.savingThrowProficiency ? '*' : '-',
        creature.abilityScores.con.savingThrowProficiency ? '*' : '-',
        creature.abilityScores.int.savingThrowProficiency ? '*' : '-',
        creature.abilityScores.wis.savingThrowProficiency ? '*' : '-',
        creature.abilityScores.cha.savingThrowProficiency ? '*' : '-'
      ],
    ],
  };
};

export const getSkillTable = (creature: Character | Creature) => {
  return {
    headerRows: 1,
    widths: [ '*', '*', '*', '*' ],
    body: [
      [ 'Skill', 'Ability', 'Mod', 'Proficiency' ],
      [
        'Acrobatics',
        creature.skills.acrobatics.ability,
        creature.skills.acrobatics.mod,
        getProficiencyString(creature.skills.acrobatics)
      ],
      [
        'Animal Handling',
        creature.skills.animalHandling.ability,
        creature.skills.animalHandling.mod,
        getProficiencyString(creature.skills.animalHandling)
      ],
      [
        'Arcana',
        creature.skills.arcana.ability,
        creature.skills.arcana.mod,
        getProficiencyString(creature.skills.arcana)
      ],
      [
        'Athletics',
        creature.skills.athletics.ability,
        creature.skills.athletics.mod,
        getProficiencyString(creature.skills.athletics)
      ],
      [
        'Deception',
        creature.skills.deception.ability,
        creature.skills.deception.mod,
        getProficiencyString(creature.skills.deception)
      ],
      [
        'History',
        creature.skills.history.ability,
        creature.skills.history.mod,
        getProficiencyString(creature.skills.history)
      ],
      [
        'Insight',
        creature.skills.insight.ability,
        creature.skills.insight.mod,
        getProficiencyString(creature.skills.insight)
      ],
      [
        'Intimidation',
        creature.skills.intimidation.ability,
        creature.skills.intimidation.mod,
        getProficiencyString(creature.skills.intimidation)
      ],
      [
        'Investigation',
        creature.skills.investigation.ability,
        creature.skills.investigation.mod,
        getProficiencyString(creature.skills.investigation)
      ],
      [
        'Medicine',
        creature.skills.medicine.ability,
        creature.skills.medicine.mod,
        getProficiencyString(creature.skills.medicine)
      ],
      [
        'Nature',
        creature.skills.nature.ability,
        creature.skills.nature.mod,
        getProficiencyString(creature.skills.nature)
      ],
      [
        'Perception',
        creature.skills.perception.ability,
        creature.skills.perception.mod,
        getProficiencyString(creature.skills.perception)
      ],
      [
        'Performance',
        creature.skills.performance.ability,
        creature.skills.performance.mod,
        getProficiencyString(creature.skills.performance)
      ],
      [
        'Persuasion',
        creature.skills.persuasion.ability,
        creature.skills.persuasion.mod,
        getProficiencyString(creature.skills.persuasion)
      ],
      [
        'Religion',
        creature.skills.religion.ability,
        creature.skills.religion.mod,
        getProficiencyString(creature.skills.religion)
      ],
      [
        'Sleight of Hand',
        creature.skills.sleightOfHand.ability,
        creature.skills.sleightOfHand.mod,
        getProficiencyString(creature.skills.sleightOfHand)
      ],
      [
        'Stealth',
        creature.skills.stealth.ability,
        creature.skills.stealth.mod,
        getProficiencyString(creature.skills.stealth)
      ],
      [
        'Survival',
        creature.skills.survival.ability,
        creature.skills.survival.mod,
        getProficiencyString(creature.skills.survival)
      ],
    ]
  };
};

export const getSpellItem = (spellItem: SpellItem): string => {
  return `${spellItem.alwaysPrepared ? '*' : ''}${spellItem.value}`;
};

export const isSpellListWarlock = (spellList: SpellList | SpellListWarlock): spellList is SpellListWarlock => {
  return !!spellList.warlock;
};

export const getEntry = (entry: string | List | SubEntry | Table): Content | null => {
  if (typeof entry === 'string') {
    return {
      text: entry,
      lineHeight: 1.5
    };
  }

  if (entry.type === 'list') {
    return {
      ul: entry.items,
      lineHeight: 1.5
    };
  }

  if (entry.type === 'table') {
    const numWidths = entry.columnLabels.length;
    const widths = [];

    for (let x=0; x<numWidths; x++) {
      widths.push('*');
    }

    return {
      table: {
        headerRows: 1,
        widths,
        body: [
          entry.columnLabels,
          ...entry.rows
        ]
      }
    };
  }

  if (entry.type === 'subEntry') {
    return {
      stack: entry.entries.map(e => getEntry(e)) as Content[],
    };
  }

  return null;
};

export const getFeatures = (features: Feature[]) => {
  return features.map(feature => {
    return [
      {
        text: feature.name,
        fontSize: 14,
        bold: true,
        lineHeight: 1.5
      },
      ...feature.entries.map(entry => getEntry(entry)),
    ];
  }).flat();
};

export const getActions = (actions: Action[]) => {
  return actions.map(action => {
    return [
      {
        text: action.name,
        fontSize: 14,
        bold: true,
        lineHeight: 1.5
      },
      ...action.entries.map(entry => getEntry(entry)),
    ];
  }).flat();
};

export const getSpellLists = (creature: Character | Creature) => {
  return creature.spellLists.map(spellList => {
    const content: Content[] = [
      {
        text: `Spell List - ${spellList.source}`,
        fontSize: 16,
        lineHeight: 1.5,
        bold: true
      },
      {
        text: `Ability: ${spellList.ability}`,
        lineHeight: 1.5,
      },
      {
        text: `Save DC: ${spellList.saveDc}`,
        lineHeight: 1.5,
      },
      {
        text: `Mod: ${spellList.mod}`,
        lineHeight: 1.5,
      }
    ];

    if (isSpellListWarlock(spellList)) {
      content.push({
        table: {
          headerRows: 1,
          widths: [ 75, 75, '*' ],
          body: [
            [ 'Level', 'Slots', 'Spells' ],
            [ 'Cantrips', '-', spellList.cantrips.map(getSpellItem).join(', ') ],
            [ `Level ${spellList.warlock.level}`, spellList.warlock.spellSlots, spellList.warlock.spells.map(getSpellItem).join(', ') ]
          ],
        },
      });
    } else {
      content.push({
        table: {
          headerRows: 1,
          widths: [ 75, 75, '*' ],
          body: [
            [ 'Level', 'Slots', 'Spells' ],
            [ 'Cantrips', '-', spellList.cantrips.map(getSpellItem).join(', ') ],
            [ '1st', creature.spellSlots[0], spellList.first.spells.map(getSpellItem).join(', ') ],
            [ '2nd', creature.spellSlots[1], spellList.second.spells.map(getSpellItem).join(', ') ],
            [ '3rd', creature.spellSlots[2], spellList.third.spells.map(getSpellItem).join(', ') ],
            [ '4th', creature.spellSlots[3], spellList.fourth.spells.map(getSpellItem).join(', ') ],
            [ '5th', creature.spellSlots[4], spellList.fifth.spells.map(getSpellItem).join(', ') ],
            [ '6th', creature.spellSlots[5], spellList.sixth.spells.map(getSpellItem).join(', ') ],
            [ '7th', creature.spellSlots[6], spellList.seventh.spells.map(getSpellItem).join(', ') ],
            [ '8th', creature.spellSlots[7], spellList.eighth.spells.map(getSpellItem).join(', ') ],
            [ '9th', creature.spellSlots[8], spellList.ninth.spells.map(getSpellItem).join(', ') ],
          ]
        }
      });
    }

    return content;
  });
};
