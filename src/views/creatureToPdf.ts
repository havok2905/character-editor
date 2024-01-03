import { type Creature } from '../../types/schema';
import { getCharacterSpeedString } from '../utils/dndStringHelpers/getCharacterSpeedString';
import {
  getAbilityTable,
  getActions,
  getFeatures,
  getSpellLists,
  getSkillTable,
} from './pdfUtils';
import PdfPrinter from 'pdfmake';
import { type TDocumentDefinitions, type Content } from 'pdfmake/interfaces';
import path from 'path';

export const getCreature = (creature: Creature) => {
  const tokenPath = path.resolve(path.join(__dirname, `../../assets/tokens/${creature.token}`));
  const abilityTable = getAbilityTable(creature);
  const skillsTable = getSkillTable(creature);
  const spellLists = getSpellLists(creature);

  return [
    {
      image: tokenPath,
      height: 150,
      width: 150,
    },
    {
      text: creature.name,
      fontSize: 40
    },
    {
      table: abilityTable,
      alignment: 'center',
      margin: [ 0, 0, 0, 10 ]
    },
    {
      columnGap: 10,
      columns: [
        {
          table: skillsTable,
          alignment: 'center',
          margin: [ 0, 0, 0, 10 ],
        },
        {
          stack: [
            `Proficiency Bonus: ${creature.proficiencyBonus}`,
            `CR: ${creature.cr}`,
            `AC: ${creature.ac}`,
            `HP: ${creature.hitPoints.current}/${creature.hitPoints.max}`,
            `Temp HP: ${creature.hitPoints.temporary}`,
            `Alignment: ${creature.alignment}`,
            `Type: ${creature.creatureType}`,
            `Size: ${creature.size}`,
            `Speed: ${getCharacterSpeedString(creature.speed)}`,
            `Condition Immunities: ${creature.conditionImmunities.join(', ')}`,
            `Condition Resistances: ${creature.conditionResistances.join(', ')}`,
            `Condition Vulnerabilities: ${creature.conditionVulnerabilities.join(', ')}`,
            `Damage Immunities: ${creature.damageImmunities.join(', ')}`,
            `Damage Resistances: ${creature.damageResistances.join(', ')}`,
            `Damage Vulnerabilities: ${creature.damageVulnerabilities.join(', ')}`,
            `Senses: ${creature.senses.join(', ')}`,
            `Languages: ${creature.languages.join(', ')}`,
          ],
          width: '50%',
          lineHeight: 1.5,
        }
      ]
    },
    ...(
      creature.features.length ? [
        {
          text: 'Features',
          lineHeight: 1.5,
          fontSize: 24,
        },
        ...getFeatures(creature.features) as Content[],
      ] : []
    ),
    ...(
      creature.actions.length ? [
        {
          text: 'Actions',
          lineHeight: 1.5,
          fontSize: 24
        },
        ...getActions(creature.actions) as Content[],
      ] : []
    ),
    ...(
      creature.reactions.length ? [
        {
          text: 'Reactions',
          lineHeight: 1.5,
          fontSize: 24
        },
        ...getActions(creature.reactions) as Content[],
      ] : []
    ),
    ...(
      creature.legendaryActions.length ? [
        {
          text: 'Legendary Actions',
          lineHeight: 1.5,
          fontSize: 24
        },
        {
          text: creature.legendaryActionsText,
          lineHeight: 1.5,
        },
        ...getActions(creature.legendaryActions) as Content[],
      ] : []
    ),
    ...(
      creature.lairActions.length ? [
        {
          text: 'Lair Actions',
          lineHeight: 1.5,
          fontSize: 24
        },
        {
          text: creature.lairActionsText,
          lineHeight: 1.5,
        },
        ...getActions(creature.lairActions) as Content[],
      ] : []
    ),
    ...(
      creature.regionalEffects.length ? [
        {
          text: 'Regional Effects',
          lineHeight: 1.5,
          fontSize: 24,
        },
        ...getActions(creature.regionalEffects) as Content[],
      ] : []
    ),
    ...(
      creature.spellLists.length ? [
        {
          text: 'Spellcasting',
          lineHeight: 1.5,
          fontSize: 24,
        },
        ...spellLists
      ] : []
    ),
  ];
};

export const creatureToPdf = (creature: Creature) => {
  const printer = new PdfPrinter({
    Times: {
      normal: 'Times-Roman',
      bold: 'Times-Bold',
      italics: 'Times-Italic',
      bolditalics: 'Times-BoldItalic'
    },
  });

  const documentDefinitions: TDocumentDefinitions = {
    content: [
      ...getCreature(creature) as Content[],
    ],
    defaultStyle: {
      font: 'Times',
    }
  };

  return printer.createPdfKitDocument(documentDefinitions);
};
