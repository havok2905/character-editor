import { biographySheet } from './characterPdfPages/biographySheet';
import { characterSheet } from './characterPdfPages/characterSheet';
import {
  type Character,
  type Feature
} from '../../types/schema';
import { featureSheet } from './characterPdfPages/featureSheet';
import { height, width } from './characterPdfPages/constants';
import { inventorySheet } from './characterPdfPages/inventorySheet';
import { jsPDF } from 'jspdf';
import { spellSheet } from './characterPdfPages/spellSheet';
import { creatureSheet } from './characterPdfPages/creatureSheet';
import { creatureFeatureSheet } from './characterPdfPages/creatureFeatureSheet';

export const characterToPdf = (character: Character): jsPDF => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [ height, width ],
  });

  const classFeatures = [] as Feature[];

  character.classes.forEach((klass) => {
    klass.features.forEach((feature) => {
      classFeatures.push(feature);
    });
    klass.subClass?.features.forEach((feature) => {
      classFeatures.push(feature);
    });
  });

  const characterFeatures = [
    ...character.background.features,
    ...character.race.features,
    ...character.race.subrace?.features ?? [],
    ...classFeatures,
  ];

  characterSheet(character, doc);

  doc.addPage();
  biographySheet(character, doc);

  doc.addPage();
  featureSheet(characterFeatures, character, doc);

  doc.addPage();
  spellSheet(character, doc);

  doc.addPage();
  inventorySheet(character, doc);

  character.pets.forEach((pet) => {
    doc.addPage();
    creatureSheet(pet, doc);

    if (
      pet.actions.length ||
      pet.features.length ||
      pet.reactions.length ||
      pet.lairActions.length ||
      pet.legendaryActions.length
    ) {
      doc.addPage();
      creatureFeatureSheet(pet, character, doc);
    }  

    if (pet.spellLists.length) {
      doc.addPage();
      spellSheet(pet, doc);
    }
  });

  return doc;
};
