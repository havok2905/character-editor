import {
  baseFontLineHeight,
  baseFontSize,
  nameFontSize,
  pagePadding,
  standardSingleColumn,
} from './constants';
import {
  type Character,
  type Creature,
  type SpellItem,
  type SpellList,
  type SpellListWarlock,
} from '../../../types/schema';
import { type jsPDF } from 'jspdf';
import { PdfContent } from '../pdfContent';
import { getNameAndHeader } from './shared';

const isCreature = (character: Character | Creature): character is Creature => {
  return typeof character.cr === 'string';
};

const isSpellListWarlock = (spellList: SpellList | SpellListWarlock): spellList is SpellListWarlock => {
  return !!spellList.warlock;
};

const getSpellItem = (spellItem: SpellItem): string => {
  return `${spellItem.alwaysPrepared ? '*' : ''}${spellItem.value}`;
};

export const spellSheet = (character: Character | Creature, doc: jsPDF) => {
  const startY = isCreature(character) ? nameFontSize + pagePadding + 20 : 150;

  const spellSlots = new PdfContent(
    (x: number, y: number) => {
      doc.setFontSize(baseFontSize);
      doc.setFont('times', 'normal');
      doc.text(`Spell Slots: ${character.spellSlots.join(', ')}`, x, y, {
        baseline: 'top',
      });
    },
    baseFontLineHeight,
    standardSingleColumn,
    pagePadding,
    startY,
    'top',
  );

  let spellListY = spellSlots.getBottom() + 20;
  const spellListToRender = [] as PdfContent[];

  character.spellLists.forEach((list) => {
    if (isSpellListWarlock(list)) {
      const source = new PdfContent(
        (x: number, y: number) => {
          doc.setFontSize(baseFontSize);
          doc.setFont('times', 'bold');
          doc.text('Spell List - Warlock', x, y, {
            baseline: 'top',
          });
        },
        baseFontLineHeight,
        standardSingleColumn,
        pagePadding,
        spellListY,
        'top',
      );

      spellListToRender.push(source);
      spellListY += baseFontLineHeight;

      const ability = new PdfContent(
        (x: number, y: number) => {
          doc.setFontSize(baseFontSize);
          doc.setFont('times', 'normal');
          doc.text(`Ability: ${list.ability}`, x, y, {
            baseline: 'top',
          });
        },
        baseFontLineHeight,
        standardSingleColumn,
        pagePadding,
        spellListY,
        'top',
      );

      spellListToRender.push(ability);
      spellListY += baseFontLineHeight;

      const mod = new PdfContent(
        (x: number, y: number) => {
          doc.setFontSize(baseFontSize);
          doc.setFont('times', 'normal');
          doc.text(`Mod: ${list.mod}`, x, y, {
            baseline: 'top',
          });
        },
        baseFontLineHeight,
        standardSingleColumn,
        pagePadding,
        spellListY,
        'top',
      );

      spellListToRender.push(mod);
      spellListY += baseFontLineHeight;

      const saveDc = new PdfContent(
        (x: number, y: number) => {
          doc.setFontSize(baseFontSize);
          doc.setFont('times', 'normal');
          doc.text(`Save DC: ${list.saveDc}`, x, y, {
            baseline: 'top',
          });
        },
        baseFontLineHeight,
        standardSingleColumn,
        pagePadding,
        spellListY,
        'top',
      );

      spellListToRender.push(saveDc);
      spellListY += baseFontLineHeight;

      const cantrips = new PdfContent(
        (x: number, y: number) => {
          doc.setFontSize(baseFontSize);
          doc.setFont('times', 'normal');
          doc.text(`Cantrips: ${list.cantrips.map(getSpellItem).join(', ')}`, x, y, {
            baseline: 'top',
          });
        },
        baseFontLineHeight,
        standardSingleColumn,
        pagePadding,
        spellListY,
        'top',
      );

      spellListToRender.push(cantrips);
      spellListY += baseFontLineHeight;

      const spells = new PdfContent(
        (x: number, y: number) => {
          doc.setFontSize(baseFontSize);
          doc.setFont('times', 'normal');
          doc.text(`Spells; Level ${list.warlock.level} (${list.warlock.spellSlots}): ${list.warlock.spells.map(getSpellItem).join(', ')}`, x, y, {
            baseline: 'top',
          });
        },
        baseFontLineHeight,
        standardSingleColumn,
        pagePadding,
        spellListY,
        'top',
      );

      spellListToRender.push(spells);
      spellListY += baseFontLineHeight;
    } else {
      const source = new PdfContent(
        (x: number, y: number) => {
          doc.setFontSize(baseFontSize);
          doc.setFont('times', 'bold');
          doc.text(`Spell List - ${list.source}`, x, y, {
            baseline: 'top',
          });
        },
        baseFontLineHeight,
        standardSingleColumn,
        pagePadding,
        spellListY,
        'top',
      );

      spellListToRender.push(source);
      spellListY += baseFontLineHeight;

      const ability = new PdfContent(
        (x: number, y: number) => {
          doc.setFontSize(baseFontSize);
          doc.setFont('times', 'normal');
          doc.text(`Ability: ${list.ability}`, x, y, {
            baseline: 'top',
          });
        },
        baseFontLineHeight,
        standardSingleColumn,
        pagePadding,
        spellListY,
        'top',
      );

      spellListToRender.push(ability);
      spellListY += baseFontLineHeight;

      const mod = new PdfContent(
        (x: number, y: number) => {
          doc.setFontSize(baseFontSize);
          doc.setFont('times', 'normal');
          doc.text(`Mod: ${list.mod}`, x, y, {
            baseline: 'top',
          });
        },
        baseFontLineHeight,
        standardSingleColumn,
        pagePadding,
        spellListY,
        'top',
      );

      spellListToRender.push(mod);
      spellListY += baseFontLineHeight;

      const saveDc = new PdfContent(
        (x: number, y: number) => {
          doc.setFontSize(baseFontSize);
          doc.setFont('times', 'normal');
          doc.text(`Save DC: ${list.saveDc}`, x, y, {
            baseline: 'top',
          });
        },
        baseFontLineHeight,
        standardSingleColumn,
        pagePadding,
        spellListY,
        'top',
      );

      spellListToRender.push(saveDc);
      spellListY += baseFontLineHeight;

      const cantrips = new PdfContent(
        (x: number, y: number) => {
          doc.setFontSize(baseFontSize);
          doc.setFont('times', 'normal');
          doc.text(`Cantrips: ${list.cantrips.map(getSpellItem).join(', ')}`, x, y, {
            baseline: 'top',
          });
        },
        baseFontLineHeight,
        standardSingleColumn,
        pagePadding,
        spellListY,
        'top',
      );

      spellListToRender.push(cantrips);
      spellListY += baseFontLineHeight;

      const first = new PdfContent(
        (x: number, y: number) => {
          doc.setFontSize(baseFontSize);
          doc.setFont('times', 'normal');
          doc.text(`1st: ${list.first.spells.map(getSpellItem).join(', ')}`, x, y, {
            baseline: 'top',
          });
        },
        baseFontLineHeight,
        standardSingleColumn,
        pagePadding,
        spellListY,
        'top',
      );

      spellListToRender.push(first);
      spellListY += baseFontLineHeight;

      const second = new PdfContent(
        (x: number, y: number) => {
          doc.setFontSize(baseFontSize);
          doc.setFont('times', 'normal');
          doc.text(`2nd: ${list.second.spells.map(getSpellItem).join(', ')}`, x, y, {
            baseline: 'top',
          });
        },
        baseFontLineHeight,
        standardSingleColumn,
        pagePadding,
        spellListY,
        'top',
      );

      spellListToRender.push(second);
      spellListY += baseFontLineHeight;

      const third = new PdfContent(
        (x: number, y: number) => {
          doc.setFontSize(baseFontSize);
          doc.setFont('times', 'normal');
          doc.text(`3rd: ${list.third.spells.map(getSpellItem).join(', ')}`, x, y, {
            baseline: 'top',
          });
        },
        baseFontLineHeight,
        standardSingleColumn,
        pagePadding,
        spellListY,
        'top',
      );

      spellListToRender.push(third);
      spellListY += baseFontLineHeight;

      const fourth = new PdfContent(
        (x: number, y: number) => {
          doc.setFontSize(baseFontSize);
          doc.setFont('times', 'normal');
          doc.text(`4th: ${list.fourth.spells.map(getSpellItem).join(', ')}`, x, y, {
            baseline: 'top',
          });
        },
        baseFontLineHeight,
        standardSingleColumn,
        pagePadding,
        spellListY,
        'top',
      );

      spellListToRender.push(fourth);
      spellListY += baseFontLineHeight;

      const fifth = new PdfContent(
        (x: number, y: number) => {
          doc.setFontSize(baseFontSize);
          doc.setFont('times', 'normal');
          doc.text(`5th: ${list.fifth.spells.map(getSpellItem).join(', ')}`, x, y, {
            baseline: 'top',
          });
        },
        baseFontLineHeight,
        standardSingleColumn,
        pagePadding,
        spellListY,
        'top',
      );

      spellListToRender.push(fifth);
      spellListY += baseFontLineHeight;

      const sixth = new PdfContent(
        (x: number, y: number) => {
          doc.setFontSize(baseFontSize);
          doc.setFont('times', 'normal');
          doc.text(`6th: ${list.sixth.spells.map(getSpellItem).join(', ')}`, x, y, {
            baseline: 'top',
          });
        },
        baseFontLineHeight,
        standardSingleColumn,
        pagePadding,
        spellListY,
        'top',
      );

      spellListToRender.push(sixth);
      spellListY += baseFontLineHeight;

      const seventh = new PdfContent(
        (x: number, y: number) => {
          doc.setFontSize(baseFontSize);
          doc.setFont('times', 'normal');
          doc.text(`7th: ${list.seventh.spells.map(getSpellItem).join(', ')}`, x, y, {
            baseline: 'top',
          });
        },
        baseFontLineHeight,
        standardSingleColumn,
        pagePadding,
        spellListY,
        'top',
      );

      spellListToRender.push(seventh);
      spellListY += baseFontLineHeight;

      const eighth = new PdfContent(
        (x: number, y: number) => {
          doc.setFontSize(baseFontSize);
          doc.setFont('times', 'normal');
          doc.text(`8th: ${list.eighth.spells.map(getSpellItem).join(', ')}`, x, y, {
            baseline: 'top',
          });
        },
        baseFontLineHeight,
        standardSingleColumn,
        pagePadding,
        spellListY,
        'top',
      );

      spellListToRender.push(eighth);
      spellListY += baseFontLineHeight;

      const ninth = new PdfContent(
        (x: number, y: number) => {
          doc.setFontSize(baseFontSize);
          doc.setFont('times', 'normal');
          doc.text(`9th: ${list.ninth.spells.map(getSpellItem).join(', ')}`, x, y, {
            baseline: 'top',
          });
        },
        baseFontLineHeight,
        standardSingleColumn,
        pagePadding,
        spellListY,
        'top',
      );

      spellListToRender.push(ninth);
      spellListY += baseFontLineHeight;
    }
  });

  if (!isCreature(character)) {
    getNameAndHeader(character, doc);
  } else {
    doc.setFontSize(nameFontSize);
    doc.setFont('times', 'normal');
    doc.text(character.name, pagePadding, pagePadding, {
      baseline: 'top',
    });
  }

  spellSlots.render();
  
  spellListToRender.forEach((item) => {
    item.render();
  });
};
