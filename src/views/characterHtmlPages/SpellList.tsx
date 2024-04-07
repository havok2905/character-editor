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
      <table>
        <thead>
          <tr>
            <th scope="col">Spell Level</th>
            <th scope="col">Spells</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cantrips</td>
            <td>{spellList.cantrips.map(getSpellItem).join(', ')}</td>
          </tr>
          <tr>
            <td>1st</td>
            <td>{spellList.first.spells.map(getSpellItem).join(', ')}</td>
          </tr>
          <tr>
            <td>2nd</td>
            <td>{spellList.second.spells.map(getSpellItem).join(', ')}</td>
          </tr>
          <tr>
            <td>3rd</td>
            <td>{spellList.third.spells.map(getSpellItem).join(', ')}</td>
          </tr>
          <tr>
            <td>4th</td>
            <td>{spellList.fourth.spells.map(getSpellItem).join(', ')}</td>
          </tr>
          <tr>
            <td>5th</td>
            <td>{spellList.fifth.spells.map(getSpellItem).join(', ')}</td>
          </tr>
          <tr>
            <td>6th</td>
            <td>{spellList.sixth.spells.map(getSpellItem).join(', ')}</td>
          </tr>
          <tr>
            <td>7th</td>
            <td>{spellList.seventh.spells.map(getSpellItem).join(', ')}</td>
          </tr>
          <tr>
            <td>8th</td>
            <td>{spellList.eighth.spells.map(getSpellItem).join(', ')}</td>
          </tr>
          <tr>
            <td>9th</td>
            <td>{spellList.ninth.spells.map(getSpellItem).join(', ')}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
