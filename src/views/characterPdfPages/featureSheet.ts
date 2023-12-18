import autoTable from 'jspdf-autotable';
import {
  baseFontSize,
  height,
  nameFontSize,
  pagePadding,
  standardSingleColumn,
} from './constants';
import {
  type Character,
  type Feature,
  type Table,
} from '../../../types/schema';
import { jsPDF } from 'jspdf';
import { PdfContent } from '../pdfContent';
import {
  setHeader,
  setName,
} from './shared';

const getNameAndHeader = (
  character: Character,
  doc: jsPDF
): void => {
  const name = new PdfContent(
    (x: number, y: number) => {
      setName(character, doc, x, y);
    },
    nameFontSize,
    standardSingleColumn,
    pagePadding,
    pagePadding,
    'top',
  );

  const header = new PdfContent(
    (x: number, y: number) => {
      setHeader(character, doc, x, y);
    },
    60,
    standardSingleColumn,
    pagePadding,
    name.getBottom() + 20,
    'top',
  );

  name.render();
  header.render();
};

/**
 * This here is some real horrible code. I wrote it in the early hours of
 * 3 AM. It works, kind of. It works well enough for me right now.
 * 
 * I will likely not revisit this for a while...
 * 
 * Dynamic PDF content is a nightmare.
 */
const getFeatures = (
  character: Character,
  features: Feature[],
  doc: jsPDF,
  startY: number,
): void => {
  let itemY = startY;

  const newPageWhenOutOfBounds = (y: number, itemHeight: number): boolean => {
    if (y + itemHeight + (pagePadding * 2) > height) {
     doc.addPage();
     getNameAndHeader(character, doc);
     return true;
    }
 
    return false;
  };

  const renderListItem = (item: string) => {
    doc.setFontSize(baseFontSize);
    doc.setFont('times', 'normal');
    doc.text('- ' + item, pagePadding, itemY, {
      baseline: 'top',
      maxWidth: standardSingleColumn,
    });
  }

  const renderStringItem = (item: string) => {
    doc.setFontSize(baseFontSize);
    doc.setFont('times', 'normal');
    doc.text(item, pagePadding, itemY, {
      baseline: 'top',
      maxWidth: standardSingleColumn,
    });
  }

  const renderTable = (entry: Table) => {
    autoTable(doc, {
      head: [entry.columnLabels],
      body: entry.rows,
      startY: itemY + 10,
    });
  };

  features.forEach((feature) => {
    let featureHeight = baseFontSize;

    newPageWhenOutOfBounds(itemY, featureHeight);
    
    doc.setFontSize(baseFontSize);
    doc.setFont('times', 'bold');
    doc.text(feature.name, pagePadding, itemY, {
      baseline: 'top',
    });
    itemY += baseFontSize;

    const featureEntries = feature.entries;
    const characterLengthPerLine = 150;
    const regex = new RegExp(".{1," + characterLengthPerLine + "}","g");

    featureEntries.forEach((entry) => {
      if (typeof entry === 'string') {
        const numLines = (entry.match(regex) ?? []).length;
        const itemHeight = baseFontSize * numLines;
        newPageWhenOutOfBounds(itemY, itemHeight) && (itemY = startY);
        renderStringItem(entry);
        featureHeight += itemHeight;
        itemY += itemHeight;
      } else if (entry.type === 'list') {
        entry.items.forEach((item) => {
          const numLines = (item.match(regex) ?? []).length;
          const itemHeight = baseFontSize * numLines;
          newPageWhenOutOfBounds(itemY, itemHeight) && (itemY = startY);
          renderListItem(item);
          featureHeight += itemHeight;
          itemY += itemHeight;
        });
      } else if (entry.type === 'table') {
        const itemHeight = ((entry.rows.length) * 22) + 22;
        newPageWhenOutOfBounds(itemY, itemHeight) && (itemY = startY);
        renderTable(entry);
        featureHeight += itemHeight;
        itemY += itemHeight;
      } else if (entry.type === 'subEntry') {
        doc.setFontSize(baseFontSize);
        doc.setFont('times', 'italic');
        doc.text(entry.name, pagePadding, itemY, {
          baseline: 'top',
        });
        itemY += baseFontSize;

        entry.entries.forEach((entry) => {
          if (typeof entry === 'string') {
            const numLines = (entry.match(regex) ?? []).length;
            const itemHeight = baseFontSize * numLines;
            newPageWhenOutOfBounds(itemY, itemHeight) && (itemY = startY);
            renderStringItem(entry);
            featureHeight += itemHeight;
            itemY += itemHeight;
          } else if (entry.type === 'list') {
            entry.items.forEach((item) => {
              const numLines = (item.match(regex) ?? []).length;
              const itemHeight = baseFontSize * numLines;
              newPageWhenOutOfBounds(itemY, itemHeight) && (itemY = startY);
              renderListItem(item);
              featureHeight += itemHeight;
              itemY += itemHeight;
            });
          } else if (entry.type === 'table') {
            const itemHeight = (entry.rows.length + 1) * 20;
            newPageWhenOutOfBounds(itemY, itemHeight) && (itemY = startY);
            renderTable(entry);
            featureHeight += itemHeight;
            itemY += itemHeight;
          }
        });
      }
    });
  });
};

export const featureSheet = (character: Character, doc: jsPDF) => {
  const classFeatures = [] as Feature[];

  character.classes.forEach((klass) => {
    klass.features.forEach((feature) => {
      classFeatures.push(feature);
    });
    klass.subClass?.features.forEach((feature) => {
      classFeatures.push(feature);
    });
  });

  const features = [
    ...character.background.features,
    ...character.race.features,
    ...character.race.subrace?.features ?? [],
    ...classFeatures,
  ];

  getNameAndHeader(character, doc);
  getFeatures(character, features, doc, 150);
};
