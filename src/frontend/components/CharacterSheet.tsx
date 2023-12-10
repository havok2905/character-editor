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
    <div className="character-sheet">
      <h2>{getNameString(character.biography.name)}</h2>
      <div className="character-sheet-header-items">
        <div className="character-sheet-header-item">
          <p>{character.race.name}</p>
          <p><strong>Race</strong></p>
        </div>
        <div className="character-sheet-header-item">
          <p>{character.race?.subrace?.name}</p>
          <p><strong>Subrace</strong></p>
        </div>
        <div className="character-sheet-header-item">
          <p>{getCharacterClassString(character.classes)}</p>
          <p><strong>Class</strong></p>
        </div>
        <div className="character-sheet-header-item">
          <p>{character.background.name}</p>
          <p><strong>Background</strong></p>
        </div>
        <div className="character-sheet-header-item">
          <p>{getGenderString(character.biography.gender)}</p>
          <p><strong>Gender</strong></p>
        </div>
        <div className="character-sheet-header-item">
          <p>{character.biography.alignment}</p>
          <p><strong>Alignment</strong></p>
        </div>
      </div>
      <div className="character-sheet-columns">
        <div className="character-sheet-column">
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
          <p><strong>Inspiration:</strong> {character.inspiration ? 'Yes' : 'None'}</p>
          <p><strong>Initiative:</strong> {plusOrNothingForNegative(character.initiative)}{character.initiative}</p>
          <p><strong>Proficiency Bonus:</strong> {plusOrNothingForNegative(character.proficiencyBonus)}{character.proficiencyBonus}</p>
          <p><strong>AC:</strong> {character.ac}</p>
          <p><strong>HP:</strong> {getCharacterHpString(character)}</p>
          <p><strong>Temp HP:</strong> {character.hitPoints.temporary}</p>
          <p><strong>Hit Dice:</strong> {character.classes.map(item => `${item.level}d${item.hitDiceValue}`)}</p>
          <p><strong>Size:</strong> {character.race.size}</p>
          <p><strong>Speed:</strong> {getCharacterSpeedString(character.speed)}</p>
          <p><strong>Languages:</strong> {character.languages.join(', ')}</p>
          <p><strong>Armor Proficiencies:</strong> {character.proficiencies.armor.join(', ')}</p>
          <p><strong>Tool Proficiencies:</strong> {character.proficiencies.tool.join(', ')}</p>
          <p><strong>Weapon Proficiencies:</strong> {character.proficiencies.weapon.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};
