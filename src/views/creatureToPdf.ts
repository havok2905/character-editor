import { type Creature } from '../../types/schema';
import { height, width } from './characterPdfPages/constants';
import { jsPDF } from 'jspdf';
import { spellSheet } from './characterPdfPages/spellSheet';
import { creatureSheet } from './characterPdfPages/creatureSheet';
import { creatureFeatureSheet } from './characterPdfPages/creatureFeatureSheet';

export const creatureToPdf = (creature: Creature): jsPDF => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [ height, width ],
  });

  creatureSheet(creature, doc);

  if (
    creature.actions.length ||
    creature.features.length ||
    creature.reactions.length ||
    creature.lairActions.length ||
    creature.legendaryActions.length ||
    creature.regionalEffects.length
  ) {
    doc.addPage();
    creatureFeatureSheet(creature, doc);
  }  

  if (creature.spellLists.length) {
    doc.addPage();
    spellSheet(creature, doc);
  }

  return doc;
};
