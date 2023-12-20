import autoTable from 'jspdf-autotable';
import {
  baseFontLineHeight,
  baseFontSize,
  pagePadding,
  standardSingleColumn,
} from './constants';
import { type Character } from '../../../types/schema';
import { type jsPDF } from 'jspdf';
import { PdfContent } from '../pdfContent';
import { getNameAndHeader } from './shared';

export const inventorySheet = (character: Character, doc: jsPDF) => {
  const inventoryHeader = new PdfContent(
    (x: number, y: number) => {
      doc.setFontSize(baseFontSize);
      doc.setFont('times', 'bold');
      doc.text('Inventory', x, y, {
        baseline: 'top',
      });
    },
    baseFontLineHeight,
    standardSingleColumn,
    pagePadding,
    150,
    'top',
  );

  getNameAndHeader(character, doc);

  inventoryHeader.render();

  autoTable(doc, {
    head: [
      [
        'Name',
        'Total',
        'Description',
      ]
    ],
    body: character.inventory.map((item) => {
      return [
        item.name,
        String(item.total),
        item.description ?? '',
      ];
    }),
    startY: inventoryHeader.getBottom(),
  });
};
