import { type FC } from 'react';
import {
  type SpellItem,
  type SpellList as SpellListType,
  type SpellListWarlock,
} from '../../../types/schema';

interface SpellListProps {
  spellList: SpellListType | SpellListWarlock;
}

export const SpellList: FC<SpellListProps> = ({
  spellList,
}) => {
  const isSpellListWarlock = (spellList: SpellListType | SpellListWarlock): spellList is SpellListWarlock => {
    return !!spellList.warlock;
  };

  const getSpellItem = (spellItem: SpellItem): string => {
    return `${spellItem.alwaysPrepared ? '*' : ''}${spellItem.value}`;
  };

  if (isSpellListWarlock(spellList)) {
    return (
      <>
        <h3>Spell List - Warlock</h3>
        <p><strong>Ability:</strong> {spellList.ability}</p>
        <p><strong>Mod:</strong> {spellList.mod}</p>
        <p><strong>Save DC:</strong> {spellList.saveDc}</p>
        <p><strong>Cantrips:</strong> {spellList.cantrips.map(getSpellItem).join(', ')}</p>
        <p><strong>{`Spells; Level ${spellList.warlock.level} (${spellList.warlock.spellSlots})`}:</strong> ${`${spellList.warlock.spells.map(getSpellItem).join(', ')}`}</p>
      </>
    );
  }

  return (
    <>
      <h3>Spell List - {spellList.source}</h3>
      <p><strong>Ability:</strong> {spellList.ability}</p>
      <p><strong>Mod:</strong> {spellList.mod}</p>
      <p><strong>Save DC:</strong> {spellList.saveDc}</p>
      <p><strong>Cantrips:</strong> {spellList.cantrips.map(getSpellItem).join(', ')}</p>
      <p><strong>1st:</strong> {spellList.first.spells.map(getSpellItem).join(', ')}</p>
      <p><strong>2nd:</strong> {spellList.second.spells.map(getSpellItem).join(', ')}</p>
      <p><strong>3rd:</strong> {spellList.third.spells.map(getSpellItem).join(', ')}</p>
      <p><strong>4th:</strong> {spellList.fourth.spells.map(getSpellItem).join(', ')}</p>
      <p><strong>5th:</strong> {spellList.fifth.spells.map(getSpellItem).join(', ')}</p>
      <p><strong>6th:</strong> {spellList.sixth.spells.map(getSpellItem).join(', ')}</p>
      <p><strong>7th:</strong> {spellList.seventh.spells.map(getSpellItem).join(', ')}</p>
      <p><strong>8th:</strong> {spellList.eighth.spells.map(getSpellItem).join(', ')}</p>
      <p><strong>9th:</strong> {spellList.ninth.spells.map(getSpellItem).join(', ')}</p>
    </>
  );
};
