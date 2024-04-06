import {
  type Character,
  type Feature
} from '../../types/schema';
import { getCharacterClassString } from '../utils/dndStringHelpers/getCharacterClassString';
import { getCharacterSpeedString } from '../utils/dndStringHelpers/getCharacterSpeedString';
import { getHeightString } from '../utils/stringHelpers/getHeightString';
import { getWeightString } from '../utils/stringHelpers/getWeightString';
import { getGenderString } from '../utils/stringHelpers/getGenderString';
import { getNameString } from '../utils/stringHelpers/getNameString';
import {
  getAbilityTable,
  getFeatures,
  getSpellLists,
  getSkillTable,
  getEntry,
} from './pdfUtils';
import {
  getCreature
} from './creatureToPdf';
import PdfPrinter from 'pdfmake';
import {
  type Content,
  type TDocumentDefinitions
} from 'pdfmake/interfaces';
import path from 'path';

export const characterToPdf = (character: Character) => {
  const printer = new PdfPrinter({
    Times: {
      normal: 'Times-Roman',
      bold: 'Times-Bold',
      italics: 'Times-Italic',
      bolditalics: 'Times-BoldItalic'
    },
  });

  const tokenPath = path.resolve(path.join(__dirname, `../../assets/tokens/${character.token}`));

  const classFeatures = [] as Feature[];
  const featFeatures = [] as Feature[];

  character.classes.forEach((klass) => {
    klass.features.forEach((feature) => {
      classFeatures.push(feature);
    });
    klass.subClass?.features.forEach((feature) => {
      classFeatures.push(feature);
    });
  });

  character.feats.forEach((feat) => {
    feat.features.forEach((feature) => {
      featFeatures.push(feature);
    });
  });

  const characterFeatures = [
    ...character.background.features,
    ...character.race.features,
    ...character.race.subrace?.features ?? [],
    ...featFeatures,
    ...classFeatures,
  ];

  const abilityTable = getAbilityTable(character);
  const skillsTable = getSkillTable(character);
  const spellLists = getSpellLists(character);
  const features = getFeatures(characterFeatures);

  const documentDefinitions: TDocumentDefinitions = {
    content: [
      {
        image: tokenPath,
        height: 150,
        width: 150,
      },
      {
        text: getNameString(character.biography.name),
        fontSize: 40
      },
      {
        columnGap: 10,
        columns: [
          {
            text: `Race: ${character.race.name}`,
            lineHeight: 1.5,
          },
          {
            text: `Subrace: ${character.race?.subrace?.name}`,
            lineHeight: 1.5,
          },
          {
            text: `Class: ${getCharacterClassString(character.classes)}`,
            lineHeight: 1.5,
          }
        ]
      },
      {
        columnGap: 10,
        columns: [
          {
            text: `Background: ${character.background.name}`,
            lineHeight: 1.5,
          },
          {
            text: `Gender: ${getGenderString(character.biography.gender)}`,
            lineHeight: 1.5,
          },
          {
            text: `Alignment: ${character.biography.alignment}`,
            lineHeight: 1.5,
          }
        ]
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
              `Inspiration: ${character.inspiration ? 'Yes' : 'No'}`,
              `Initiative: ${character.initiative}`,
              `Proficiency Bonus: ${character.proficiencyBonus}`,
              `AC: ${character.ac}`,
              `HP: ${character.hitPoints.current}/${character.hitPoints.max}`,
              `Temp HP: ${character.hitPoints.temporary}`,
              `Size: ${character.size}`,
              `Speed: ${getCharacterSpeedString(character.speed)}`,
              `Condition Immunities: ${character.conditionImmunities.join(', ')}`,
              `Condition Resistances: ${character.conditionResistances.join(', ')}`,
              `Condition Vulnerabilities: ${character.conditionVulnerabilities.join(', ')}`,
              `Damage Immunities: ${character.damageImmunities.join(', ')}`,
              `Damage Resistances: ${character.damageResistances.join(', ')}`,
              `Damage Vulnerabilities: ${character.damageVulnerabilities.join(', ')}`,
              `Senses: ${character.senses.join(', ')}`,
              `Languages: ${character.languages.join(', ')}`,
              `Armor: ${character.proficiencies.armor.join(', ')}`,
              `Weapons: ${character.proficiencies.weapon.join(', ')}`,
              `Tools: ${character.proficiencies.tool.join(', ')}`,
            ],
            width: '50%',
            lineHeight: 1.5,
          }
        ]
      },
      ...(
        characterFeatures.length ? [
          {
            text: 'Features',
            lineHeight: 1.5,
            fontSize: 24,
          },
          ...features as Content[],
        ] : []
      ),
      ...(
        character.spellLists.length ? [
          {
            text: 'Spellcasting',
            lineHeight: 1.5,
            fontSize: 24,
          },
          ...spellLists
        ] : []
      ),
      {
        text: 'Inventory',
        lineHeight: 1.5,
        fontSize: 24,
      },
      {
        table: {
          headerRows: 1,
          widths: [ '*', '*', '*' ],
          body: [
            [ 'Name', 'Total', 'Description' ],
            ...character.inventory.map(item => {
              return [
                item.name as string,
                String(item.total),
                item.description ?? '',
              ];
            })
          ]
        }
      },
      {
        text: 'Biography',
        lineHeight: 1.5,
        fontSize: 24,
      },
      {
        text: 'Personality Traits',
        lineHeight: 1.5,
        bold: true,
      },
      {
        text: character.biography.personalityTraits,
        lineHeight: 1.5,
      },
      {
        text: 'Ideals',
        lineHeight: 1.5,
        bold: true,
      },
      {
        text: character.biography.ideals,
        lineHeight: 1.5,
      },
      {
        text: 'Bonds',
        lineHeight: 1.5,
        bold: true,
      },
      {
        text: character.biography.bonds,
        lineHeight: 1.5,
      },
      {
        text: 'Flaws',
        lineHeight: 1.5,
        bold: true,
      },
      {
        text: character.biography.flaws,
        lineHeight: 1.5,
      },
      {
        text: 'Physical Description',
        lineHeight: 1.5,
        bold: true,
      },
      {
        text: `Age: ${character.biography.physicalDescription.age}`,
        lineHeight: 1.5,
      },
      {
        text: `Dress: ${character.biography.physicalDescription.dress}`,
        lineHeight: 1.5,
      },
      {
        text: `Eyes: ${character.biography.physicalDescription.eyes}`,
        lineHeight: 1.5,
      },
      {
        text: `Hair: ${character.biography.physicalDescription.hair}`,
        lineHeight: 1.5,
      },
      {
        text: `Skin: ${character.biography.physicalDescription.skin}`,
        lineHeight: 1.5,
      },
      {
        text: `Height: ${getHeightString(character.biography.physicalDescription.height)}`,
        lineHeight: 1.5,
      },
      {
        text: `Weight: ${getWeightString(character.biography.physicalDescription.weight)}`,
        lineHeight: 1.5,
      },
      {
        text: `Description: ${character.biography.physicalDescription.description}`,
        lineHeight: 1.5,
      },
      {
        text: 'Backstory',
        lineHeight: 1.5,
        bold: true,
      },
      ...character.biography.backstory.entries.map(getEntry) as Content[],
      ...character.pets.map(pet => getCreature(pet) as Content[])
    ],
    defaultStyle: {
      font: 'Times'
    }
  };

  return printer.createPdfKitDocument(documentDefinitions);
};
