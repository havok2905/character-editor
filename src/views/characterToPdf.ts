import { biographySheet } from './characterPdfPages/biographySheet';
import { characterSheet } from './characterPdfPages/characterSheet';
import { type Character } from '../../types/schema';
import { featureSheet } from './characterPdfPages/featureSheet';
import { height, width } from './characterPdfPages/constants';
import { jsPDF } from 'jspdf';
import { spellSheet } from './characterPdfPages/spellSheet';

export const characterToPdf = (character: Character): jsPDF => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [ height, width ],
  });

  characterSheet(character, doc);

  doc.addPage();
  biographySheet(character, doc);

  doc.addPage();
  featureSheet(character, doc);

  doc.addPage();
  spellSheet(character, doc);

  return doc;
};
