import {
  type AbilityScore,
  type Action,
  type Character,
  type Feature,
  type Skill,
  type Table,
} from '../../../types/schema';
import autoTable from 'jspdf-autotable';
import {
  abilityScoreItemSize,
  abilityScoreItemStrokeWidth,
  baseFontLineHeight,
  baseFontSize,
  boxedContentItemPadding,
  height,
  nameFontSize,
  pagePadding,
  secondHalfColumnStart,
  secondThirdColumnStart,
  standardHalfColumn,
  standardSingleColumn,
  thirdThirdColumnStart,
  width,
} from './constants';
import { getCharacterClassString } from '../../utils/dndStringHelpers/getCharacterClassString';
import { getGenderString } from '../../utils/stringHelpers/getGenderString';
import { getNameString } from '../../utils/stringHelpers/getNameString';
import { PdfContent } from '../pdfContent';
import { plusOrNothingForNegative } from '../../utils/plusOrNothingForNegative';
import { type jsPDF } from 'jspdf';

const getProficiencyString = (skill: Skill) => {
  if (skill.proficiency === 'expertise') return '[E]';
  if (skill.proficiency === 'proficient') return '[P]';
  return '[ ]';
};

export const setAbilityScore = (
  abilityScore: AbilityScore,
  label: string,
  doc: jsPDF,
  x: number,
  y: number,
) => {
  const half = abilityScoreItemSize / 2;
  const fontSizeLarge = 24;
  const fontSizeSmall = 10;

  const leftOffset = x + half + abilityScoreItemStrokeWidth;
  const modY = y + abilityScoreItemStrokeWidth + 12;
  const scoreY = modY + 12;
  const labelY = scoreY + 25;
  const profY = labelY + 10;
  
  doc.setLineWidth(abilityScoreItemStrokeWidth);
  doc.setDrawColor(0, 0, 0);
  doc.rect(
    x + abilityScoreItemStrokeWidth,
    y + abilityScoreItemStrokeWidth,
    abilityScoreItemSize,
    abilityScoreItemSize
  );
  
  doc.setFontSize(fontSizeSmall);
  doc.setFont('times', 'normal');
  doc.text(`${plusOrNothingForNegative(abilityScore.mod)}${abilityScore.mod}`, leftOffset, modY, {
    align: 'center',
    baseline: 'top',
  });

  doc.setFontSize(fontSizeLarge);
  doc.setFont('times', 'normal');
  doc.text(abilityScore.score.toLocaleString(), leftOffset, scoreY, {
    align: 'center',
    baseline: 'top',
  });

  doc.setFontSize(fontSizeSmall);
  doc.setFont('times', 'normal');
  doc.text(label, leftOffset, labelY, {
    align: 'center',
    baseline: 'top',
  });

  doc.setFontSize(fontSizeSmall);
  doc.setFont('times', 'normal');
  doc.text(abilityScore.savingThrowProficiency ? '*' : '-', leftOffset, profY, {
    align: 'center',
    baseline: 'top',
  });
};

export const setBoxedContent = (
  doc: jsPDF,
  key: string,
  value: string,
  x: number,
  y: number,
  sizeX: number,
  sizeY: number,
) => {
  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'bold');
  doc.text(
    key,
    x,
    y,
    {
      baseline: 'bottom',
    }
  );

  doc.setLineWidth(0);
  doc.rect(
    x,
    y,
    sizeX,
    sizeY,
  );

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(
    value,
    x + boxedContentItemPadding,
    y + boxedContentItemPadding,
    {
      baseline: 'top',
      maxWidth: standardHalfColumn - boxedContentItemPadding * 2,
    }
  );
};

export const setFeature = (
  feature: Feature,
  doc: jsPDF,
  x: number,
  y: number,
) => {
  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'bold');
  doc.text(feature.name, x, y, {
    baseline: 'top',
  });

  let entryY = y + baseFontLineHeight;

  feature.entries.forEach((entry) => {
    if (typeof entry === 'string') {
      doc.setFontSize(baseFontSize);
      doc.setFont('times', 'normal');
      doc.text(entry, x, entryY, {
        baseline: 'top',
        maxWidth: standardSingleColumn,
      });
      entryY += baseFontLineHeight;
    }
  });
};

export const setHeader = (
  character: Character,
  doc: jsPDF,
  x: number,
  y: number,
) => {
  doc.setLineWidth(0);

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'bold');
  doc.line(x, y, width - pagePadding, y);
  doc.text('Race', x, y + 2, {
    baseline: 'top',
  });
  doc.text('Subrace', secondThirdColumnStart, y + 2, {
    baseline: 'top',
  });
  doc.text('Class', thirdThirdColumnStart, y + 2, {
    baseline: 'top',
  });
  doc.setFont('times', 'normal');
  doc.text(character.race.name, x, y - 2, {
    baseline: 'bottom',
  });
  doc.text(character.race.subrace?.name ?? '', secondThirdColumnStart, y - 2, {
    baseline: 'bottom',
  });
  doc.text(getCharacterClassString(character.classes), thirdThirdColumnStart, y - 2, {
    baseline: 'bottom',
  });

  const subHeadingTwoY = y + 30;

  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'bold');
  doc.line(x, subHeadingTwoY, width - pagePadding, subHeadingTwoY);
  doc.text('Background', x, subHeadingTwoY + 2, {
    baseline: 'top',
  });
  doc.text('Gender', secondThirdColumnStart, subHeadingTwoY + 2, {
    baseline: 'top',
  });
  doc.text('Alignment', thirdThirdColumnStart, subHeadingTwoY + 2, {
    baseline: 'top',
  });
  doc.setFont('times', 'normal');
  doc.text(character.background.name, x, subHeadingTwoY - 2, {
    baseline: 'bottom',
  });
  doc.text(getGenderString(character.biography.gender), secondThirdColumnStart, subHeadingTwoY - 2, {
    baseline: 'bottom',
  });
  doc.text(character.biography.alignment, thirdThirdColumnStart, subHeadingTwoY - 2, {
    baseline: 'bottom',
  });
};

export const setKeyValueStat = (
  doc: jsPDF,
  key: string,
  value: string,
  x: number,
  y: number,
) => {
  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(`${key}: ${value}`, x, y, {
    baseline: 'top',
  });
};

export const setName = (
  character: Character,
  doc: jsPDF,
  x: number,
  y: number,
) => {
  doc.setFontSize(nameFontSize);
  doc.setFont('times', 'normal');
  doc.text(getNameString(character.biography.name), x, y, {
    baseline: 'top',
  });
};

export const setSkill = (
  label: string,
  skill: Skill,
  doc: jsPDF,
  x: number,
  y: number,
) => {
  doc.setFontSize(baseFontSize);
  doc.setFont('times', 'normal');
  doc.text(
    `${getProficiencyString(skill)} ${plusOrNothingForNegative(skill.mod)}${skill.mod} ${label}`, 
    x,
    y,
    { baseline: 'top' },
  );
};

export const getNameAndHeader = (
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
 * 
 * Ugh, stacking actions on features requires knowing where we left off in
 * PDF generation. Just return the Y position for now.
 * This likely this calls for a much more foundational refactor of
 * PDF generation that I'm just not interested in building out at the
 * moment, to allow for true dynamic content and precalculated sizing.
 */
export const getFeatures = (
  character: Character | null,
  features: Feature[],
  doc: jsPDF,
  startY: number,
): number => {
  let itemY = startY;

  const newPageWhenOutOfBounds = (y: number, itemHeight: number): boolean => {
    if (y + itemHeight + (pagePadding * 2) > height) {
      doc.addPage();
      if (character) getNameAndHeader(character, doc);
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
  };

  const renderStringItem = (item: string) => {
    doc.setFontSize(baseFontSize);
    doc.setFont('times', 'normal');
    doc.text(item, pagePadding, itemY, {
      baseline: 'top',
      maxWidth: standardSingleColumn,
    });
  };

  const renderTable = (entry: Table) => {
    autoTable(doc, {
      head: [ entry.columnLabels ],
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
    const regex = new RegExp('.{1,' + characterLengthPerLine + '}', 'g');

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

  return itemY;
};

/**
 * This is more or less a copy of getFeatures.
 */
export const getActions = (
  character: Character | null,
  actions: Action[],
  doc: jsPDF,
  startY: number,
): number => {
  let itemY = startY;

  const newPageWhenOutOfBounds = (y: number, itemHeight: number): boolean => {
    if (y + itemHeight + (pagePadding * 2) > height) {
      doc.addPage();
      if (character) getNameAndHeader(character, doc);
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
  };

  const renderStringItem = (item: string) => {
    doc.setFontSize(baseFontSize);
    doc.setFont('times', 'normal');
    doc.text(item, pagePadding, itemY, {
      baseline: 'top',
      maxWidth: standardSingleColumn,
    });
  };

  const renderTable = (entry: Table) => {
    autoTable(doc, {
      head: [ entry.columnLabels ],
      body: entry.rows,
      startY: itemY + 10,
    });
  };

  actions.forEach((action) => {
    let featureHeight = baseFontSize;

    newPageWhenOutOfBounds(itemY, featureHeight);
    
    doc.setFontSize(baseFontSize);
    doc.setFont('times', 'bold');
    doc.text(action.name, pagePadding, itemY, {
      baseline: 'top',
    });
    itemY += baseFontSize;

    const featureEntries = action.entries;
    const characterLengthPerLine = 150;
    const regex = new RegExp('.{1,' + characterLengthPerLine + '}', 'g');

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

  return itemY;
};

/**
 * This is more or less a copy of getFeatures.
 */
export const getBackstory = (
  character: Character,
  doc: jsPDF,
  startY: number,
): number => {
  let itemY = startY + 4;

  const renderListItem = (item: string) => {
    doc.setFontSize(baseFontSize);
    doc.setFont('times', 'normal');
    doc.text('- ' + item, secondHalfColumnStart + 4, itemY, {
      baseline: 'top',
      maxWidth: standardHalfColumn - 8,
    });
  };

  const renderStringItem = (item: string) => {
    doc.setFontSize(baseFontSize);
    doc.setFont('times', 'normal');
    doc.text(item, secondHalfColumnStart + 4, itemY, {
      baseline: 'top',
      maxWidth: standardHalfColumn - 8,
    });
  };

  const renderTable = (entry: Table) => {
    autoTable(doc, {
      head: [ entry.columnLabels ],
      body: entry.rows,
      startY: itemY + 10,
    });
  };

  character.biography.backstory.entries.forEach((entry) => {
    const characterLengthPerLine = 70;
    const regex = new RegExp('.{1,' + characterLengthPerLine + '}', 'g');

    if (typeof entry === 'string') {
      const numLines = (entry.match(regex) ?? []).length;
      const itemHeight = baseFontSize * numLines;
      renderStringItem(entry);
      itemY += itemHeight;
    } else if (entry.type === 'list') {
      entry.items.forEach((item) => {
        const numLines = (item.match(regex) ?? []).length;
        const itemHeight = baseFontSize * numLines;
        renderListItem(item);
        itemY += itemHeight;
      });
    } else if (entry.type === 'table') {
      const itemHeight = ((entry.rows.length) * 22) + 22;
      renderTable(entry);
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
          renderStringItem(entry);
          itemY += itemHeight;
        } else if (entry.type === 'list') {
          entry.items.forEach((item) => {
            const numLines = (item.match(regex) ?? []).length;
            const itemHeight = baseFontSize * numLines;
            renderListItem(item);
            itemY += itemHeight;
          });
        } else if (entry.type === 'table') {
          const itemHeight = (entry.rows.length + 1) * 20;
          renderTable(entry);
          itemY += itemHeight;
        }
      });
    }
  });

  return itemY;
};
