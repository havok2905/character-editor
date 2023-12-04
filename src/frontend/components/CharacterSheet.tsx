import React, { type FC } from 'react';
import { AbilityScore } from './AbilityScore';
import { getCharacterClassString } from '../../shared/utils/dndStringHelpers/getCharacterClassString';
import { getCharacterHpString } from '../../shared/utils/dndStringHelpers/getCharacterHpString';
import { getCharacterSpeedString } from '../../shared/utils/dndStringHelpers/getCharacterSpeedString';
import { getGenderString } from '../../shared/utils/stringHelpers/getGenderString';
import { getNameString } from '../../shared/utils/stringHelpers/getNameString';
import { type ICharacter } from '../../types/dnd/ICharacter';
import { plusOrNothingForNegative } from '../../shared/utils/plusOrNothingForNegative';
import { Skill } from './Skill';
import './CharacterSheet.css';

export interface ICharacterSheetProps {
  character: ICharacter | null;
}

export const CharacterSheet: FC<ICharacterSheetProps> = ({
  character,
}) => {
  if (!character) return null;

  return (
    <>
      <h1>{getNameString(character.biography.name)}</h1>
      <p>Race: {character.race.name}</p>
      {character.race.subrace ? <p>Sub Race: {character.race.subrace.name}</p> : null}
      <p>Background: {character.background.name}</p>
      <p>Class: {getCharacterClassString(character.classes)}</p>
      <p>Gender: {getGenderString(character.biography.gender)}</p>
      <p>Alignment: {character.biography.alignment}</p>
      <p>Inspiration: {character.inspiration ? 'Yes' : 'None'}</p>
      <hr/>
      <div className="character-sheet-columns">
        <div className="character-sheet-column">
          <p>
            {plusOrNothingForNegative(character.initiative)}{character.initiative} Initiative
          </p>
          <p>
            {plusOrNothingForNegative(character.proficiencyBonus)}{character.proficiencyBonus} Proficiency Bonus
          </p>
          <div className="character-sheet-ability-skill-group">
            <AbilityScore abilityScore={character.abilityScores.str} label="Strength" />
            <div>
              <Skill label="Athletics" skill={character.skills.athletics}/>
            </div>
          </div>
          <div className="character-sheet-ability-skill-group">
            <AbilityScore abilityScore={character.abilityScores.dex} label="Dexterity" />
            <div>
              <Skill label="Acrobatics" skill={character.skills.acrobatics}/>
              <Skill label="Sleight of Hand" skill={character.skills.sleightOfHand}/>
              <Skill label="Stealth" skill={character.skills.stealth}/>
            </div>
          </div>
          <div className="character-sheet-ability-skill-group">
            <AbilityScore abilityScore={character.abilityScores.con} label="Constitution" />
          </div>
          <div className="character-sheet-ability-skill-group">
            <AbilityScore abilityScore={character.abilityScores.int} label="Intelligence" />
            <div>
              <Skill label="Arcana" skill={character.skills.arcana}/>
              <Skill label="History" skill={character.skills.history}/>
              <Skill label="Investigation" skill={character.skills.investigation}/>
              <Skill label="Nature" skill={character.skills.nature}/>
              <Skill label="Religion" skill={character.skills.religion}/>
            </div>
          </div>
          <div className="character-sheet-ability-skill-group">
            <AbilityScore abilityScore={character.abilityScores.wis} label="Wisdom" />
            <div>
              <Skill label="Animal Handling" skill={character.skills.animalHandling}/>
              <Skill label="Insight" skill={character.skills.insight}/>
              <Skill label="Medicine" skill={character.skills.medicine}/>
              <Skill label="Perception" skill={character.skills.perception}/>
              <Skill label="Survival" skill={character.skills.survival}/>
            </div>
          </div>
          <div className="character-sheet-ability-skill-group">
            <AbilityScore abilityScore={character.abilityScores.cha} label="Charisma" />
            <div>
              <Skill label="Deception" skill={character.skills.deception}/>
              <Skill label="Intimidation" skill={character.skills.intimidation}/>
              <Skill label="Performance" skill={character.skills.performance}/>
              <Skill label="Persuasion" skill={character.skills.persuasion}/>   
            </div>
          </div>
        </div>
        <div className="character-sheet-column">
          <p>AC: {character.ac}</p>
          <p>HP: {getCharacterHpString(character)}</p>
          <p>Temp HP: {character.hitPoints.temporary}</p>
          <p>Hit Dice: {character.classes.map(item => `${item.level}d${item.hitDiceValue}`)}</p>
          <p>Size: {character.race.size}</p>
          <p>Speed: {getCharacterSpeedString(character.speed)}</p>
          <p>Languages: {character.languages.join(', ')}</p>
          <p>Armor Proficiencies: {character.proficiencies.armor.join(', ')}</p>
          <p>Tool Proficiencies: {character.proficiencies.tool.join(', ')}</p>
          <p>Weapon Proficiencies: {character.proficiencies.weapon.join(', ')}</p>
        </div>
      </div>
    </>
  );
};
