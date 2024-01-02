import {
  baseFontLineHeight,
  baseFontSize,
  largeFontLineHeight,
  largeFontSize,
  nameFontSize,
  pagePadding,
  standardSingleColumn,
} from './constants';
import { type Creature } from '../../../types/schema';
import { type jsPDF } from 'jspdf';
import {
  getActions,
  getFeatures,
} from './shared';
import { PdfContent } from '../pdfContent';

export const creatureFeatureSheet = (
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

  name.render();

  let y = name.getBottom() + 20;

  if (creature.features.length) {
    const featuresTitle = new PdfContent(
      (x: number, y: number) => {
        doc.setFontSize(largeFontSize);
        doc.setFont('times', 'bold');
        doc.text('Features', x, y, {
          baseline: 'top',
          maxWidth: standardSingleColumn,
        });
      },
      largeFontLineHeight,
      standardSingleColumn,
      pagePadding,
      y,
      'top',
    );

    y = featuresTitle.getBottom();
    featuresTitle.render();

    y = getFeatures(null, creature.features, doc, y);
  }

  if (creature.actions.length) {
    const actionsTitle = new PdfContent(
      (x: number, y: number) => {
        doc.setFontSize(largeFontSize);
        doc.setFont('times', 'bold');
        doc.text('Actions', x, y, {
          baseline: 'top',
          maxWidth: standardSingleColumn,
        });
      },
      largeFontLineHeight,
      standardSingleColumn,
      pagePadding,
      y,
      'top',
    );

    y = actionsTitle.getBottom();
    actionsTitle.render();

    y = getActions(null, creature.actions, doc, y);
  }

  if (creature.reactions.length) {
    const reactionsTitle = new PdfContent(
      (x: number, y: number) => {
        doc.setFontSize(largeFontSize);
        doc.setFont('times', 'bold');
        doc.text('Reactions', x, y, {
          baseline: 'top',
          maxWidth: standardSingleColumn,
        });
      },
      largeFontLineHeight,
      standardSingleColumn,
      pagePadding,
      y,
      'top',
    );

    y = reactionsTitle.getBottom();
    reactionsTitle.render();
  
    y = getActions(null, creature.reactions, doc, y);
  }

  if (creature.legendaryActions.length) {
    const legendaryActionsTitle = new PdfContent(
      (x: number, y: number) => {
        doc.setFontSize(largeFontSize);
        doc.setFont('times', 'normal');
        doc.text('Legendary Actions', x, y, {
          baseline: 'top',
          maxWidth: standardSingleColumn,
        });
      },
      largeFontLineHeight,
      standardSingleColumn,
      pagePadding,
      y,
      'top',
    );

    y = legendaryActionsTitle.getBottom();
    legendaryActionsTitle.render();
  
    if (creature.legendaryActionsText) {
      const legendaryActionsText = new PdfContent(
        (x: number, y: number) => {
          doc.setFontSize(baseFontSize);
          doc.setFont('times', 'normal');
          doc.text(creature.legendaryActionsText, x, y, {
            baseline: 'top',
            maxWidth: standardSingleColumn,
          });
        },
        baseFontLineHeight,
        standardSingleColumn,
        pagePadding,
        y,
        'top',
      );

      y = legendaryActionsText.getBottom();
      legendaryActionsText.render();
    }

    y = getActions(null, creature.legendaryActions, doc, y);
  }

  if (creature.lairActions.length) {
    const lairActionsTitle = new PdfContent(
      (x: number, y: number) => {
        doc.setFontSize(largeFontSize);
        doc.setFont('times', 'normal');
        doc.text('Lair Actions', x, y, {
          baseline: 'top',
          maxWidth: standardSingleColumn,
        });
      },
      largeFontLineHeight,
      standardSingleColumn,
      pagePadding,
      y,
      'top',
    );

    y = lairActionsTitle.getBottom();
    lairActionsTitle.render();
  
    if (creature.lairActionsText) {
      const lairActionsText = new PdfContent(
        (x: number, y: number) => {
          doc.setFontSize(baseFontSize);
          doc.setFont('times', 'normal');
          doc.text(creature.lairActionsText, x, y, {
            baseline: 'top',
            maxWidth: standardSingleColumn,
          });
        },
        baseFontLineHeight,
        standardSingleColumn,
        pagePadding,
        y,
        'top',
      );

      y = lairActionsText.getBottom();
      lairActionsText.render();
    }

    y = getActions(null, creature.lairActions, doc, y);
  }

  if (creature.regionalEffects.length) {
    const regionalEffectsTitle = new PdfContent(
      (x: number, y: number) => {
        doc.setFontSize(largeFontSize);
        doc.setFont('times', 'normal');
        doc.text('Regional Effects', x, y, {
          baseline: 'top',
          maxWidth: standardSingleColumn,
        });
      },
      largeFontLineHeight,
      standardSingleColumn,
      pagePadding,
      y,
      'top',
    );

    y = regionalEffectsTitle.getBottom();
    regionalEffectsTitle.render();

    y = getActions(null, creature.regionalEffects, doc, y);
  }
};
