import { type FC } from 'react';
import { AbilityScoreBlock } from './AbilityScoreBlock';
import { ActionItem } from './ActionItem';
import { type Character, type Creature } from '../../../types/schema';
import { Entry } from './Entry';
import { Feature } from './Feature';
import { getCharacterClassString } from '../../utils/dndStringHelpers/getCharacterClassString';
import { getCharacterSpeedString } from '../../utils/dndStringHelpers/getCharacterSpeedString';
import { getGenderString } from '../../utils/stringHelpers/getGenderString';
import { getHeightString } from '../../utils/stringHelpers/getHeightString';
import { getHpString } from '../../utils/dndStringHelpers/getHpString';
import { getNameString } from '../../utils/stringHelpers/getNameString';
import { getWeightString } from '../../utils/stringHelpers/getWeightString';
import { Layout } from './Layout';
import { SpellList } from './SpellList';

interface CreatureSheetProps {
  creature: Creature;
}

const CreatureSheet: FC<CreatureSheetProps> = ({
  creature
}) => {
  return (
    <>
      <h1>{creature.name}</h1>
      <img className="havok-design-system-token" src={`./${creature.token}`}/>
      <div className="havok-design-system-half-column">
        <div>
          <AbilityScoreBlock
            abilityScore={creature.abilityScores.str}
            label="Strength"
            skills={[
              [ creature.skills.athletics, 'Athletics' ]
            ]}/>
          <AbilityScoreBlock
            abilityScore={creature.abilityScores.dex}
            label="Dexterity"
            skills={[
              [ creature.skills.acrobatics, 'Acrobatics' ],
              [ creature.skills.stealth, 'Stealth' ],
              [ creature.skills.sleightOfHand, 'Sleight Of Hand' ]
            ]}/>
          <AbilityScoreBlock
            abilityScore={creature.abilityScores.con}
            label="Constitution"
            skills={[]}/>
          <AbilityScoreBlock
            abilityScore={creature.abilityScores.int}
            label="Intelligence"
            skills={[
              [ creature.skills.arcana, 'Arcana' ],
              [ creature.skills.history, 'History' ],
              [ creature.skills.investigation, 'Investigation' ],
              [ creature.skills.nature, 'Nature' ],
              [ creature.skills.religion, 'Religion' ]
            ]}/>
          <AbilityScoreBlock
            abilityScore={creature.abilityScores.wis}
            label="Wisdom"
            skills={[
              [ creature.skills.animalHandling, 'Animal Handling' ],
              [ creature.skills.insight, 'Insight' ],
              [ creature.skills.medicine, 'Medicine' ],
              [ creature.skills.perception, 'Perception' ],
              [ creature.skills.survival, 'Survival' ]
            ]}/>
          <AbilityScoreBlock
            abilityScore={creature.abilityScores.cha}
            label="Charisma"
            skills={[
              [ creature.skills.deception, 'Deception' ],
              [ creature.skills.intimidation, 'Intimidation' ],
              [ creature.skills.performance, 'Performance' ],
              [ creature.skills.persuasion, 'Persuasion' ],
            ]}/>
        </div>
        <div className="havok-design-system-key-value-container">
          <p><strong>Proficiency Bonus:</strong> {creature.proficiencyBonus}</p>
          <p><strong>CR:</strong> {creature.cr}</p>
          <p><strong>AC:</strong> {creature.ac}</p>
          <p><strong>HP:</strong> {getHpString(creature)}</p>
          <p><strong>Temp HP:</strong> {creature.hitPoints.temporary}</p>
          <p><strong>Type:</strong> {creature.creatureType}</p>
          <p><strong>Size:</strong> {creature.size}</p>
          <p><strong>Speed:</strong> {getCharacterSpeedString(creature.speed)}</p>
          <p><strong>Condition Immunities:</strong> {creature.conditionImmunities.join(', ')}</p>
          <p><strong>Condition Resistances:</strong> {creature.conditionResistances.join(', ')}</p>
          <p><strong>Condition Vulnerabilities:</strong> {creature.conditionVulnerabilities.join(', ')}</p>
          <p><strong>Damage Immunities:</strong> {creature.damageImmunities.join(', ')}</p>
          <p><strong>Damage Resistances:</strong> {creature.damageResistances.join(', ')}</p>
          <p><strong>Damage Vulnerabilities:</strong> {creature.damageVulnerabilities.join(', ')}</p>
          <p><strong>Senses:</strong> {creature.senses.join(', ')}</p>
          <p><strong>Languages:</strong> {creature.languages.join(', ')}</p>
        </div>
      </div>
      {
        creature.spellLists.length ? (
          <>
            <h2>Spellcasting</h2>
            <p><strong>Spell Slots:</strong> {creature.spellSlots.join(', ')}</p>
            {
              creature.spellLists.map((spellList, index) => <SpellList key={index} spellList={spellList} />)
            }
          </>
        ) : null
      }
      {
        creature.features.length ? (
          <>
            <h2>Features</h2>
            {
              creature.features.map((feature, index) => <Feature key={index} feature={feature}/>)
            }
          </>
        ) : null
      }
      {
        creature.actions.length ? (
          <>
            <h2>Actions</h2>
            {
              creature.actions.map((action, index) => <ActionItem key={index} action={action}/>)
            }
          </>
        ) : null
      }
      {
        creature.reactions.length ? (
          <>
            <h2>Reactions</h2>
            {
              creature.reactions.map((action, index) => <ActionItem key={index} action={action}/>)
            }
          </>
        ) : null
      }
      {
        creature.legendaryActions.length ? (
          <>
            <h2>Legendary Actions</h2>
            <p>{creature.legendaryActionsText}</p>
            {
              creature.legendaryActions.map((action, index) => <ActionItem key={index} action={action}/>)
            }
          </>
        ) : null
      }
      {
        creature.lairActions.length ? (
          <>
            <h2>Lair Actions</h2>
            <p>{creature.lairActionsText}</p>
            {
              creature.lairActions.map((action, index) => <ActionItem key={index} action={action}/>)
            }
          </>
        ) : null
      }
    </>
  );
};

interface CharacterSheetProps {
  character: Character;
}

export const CharacterSheet: FC<CharacterSheetProps> = ({
  character
}) => {
  const name = getNameString(character.biography.name);

  return (
    <Layout title={`Character - ${name}`}>
      <h1>{name}</h1>
      <img className="havok-design-system-token" src={`./${character.token}`}/>
      <div className="havok-design-system-sheet-header">
        <div>
          <p>{character.race.name}</p>
          <p><strong>Race</strong></p>
        </div>
        <div>
          <p>{character.race.subrace?.name}</p>
          <p><strong>Subrace</strong></p>
        </div>
        <div>
          <p>{getCharacterClassString(character.classes)}</p>
          <p><strong>Class</strong></p>
        </div>
      </div>
      <div className="havok-design-system-sheet-header">
        <div>
          <p>{getGenderString(character.biography.gender)}</p>
          <p><strong>Gender</strong></p>
        </div>
        <div>
          <p>{character.background.name}</p>
          <p><strong>Background</strong></p>
        </div>
        <div>
          <p>{character.biography.alignment}</p>
          <p><strong>Alignment</strong></p>
        </div>
      </div>
      <div className="havok-design-system-half-column">
        <div>
          <AbilityScoreBlock
            abilityScore={character.abilityScores.str}
            label="Strength"
            skills={[
              [ character.skills.athletics, 'Athletics' ]
            ]}/>
          <AbilityScoreBlock
            abilityScore={character.abilityScores.dex}
            label="Dexterity"
            skills={[
              [ character.skills.acrobatics, 'Acrobatics' ],
              [ character.skills.stealth, 'Stealth' ],
              [ character.skills.sleightOfHand, 'Sleight Of Hand' ]
            ]}/>
          <AbilityScoreBlock
            abilityScore={character.abilityScores.con}
            label="Constitution"
            skills={[]}/>
          <AbilityScoreBlock
            abilityScore={character.abilityScores.int}
            label="Intelligence"
            skills={[
              [ character.skills.arcana, 'Arcana' ],
              [ character.skills.history, 'History' ],
              [ character.skills.investigation, 'Investigation' ],
              [ character.skills.nature, 'Nature' ],
              [ character.skills.religion, 'Religion' ]
            ]}/>
          <AbilityScoreBlock
            abilityScore={character.abilityScores.wis}
            label="Wisdom"
            skills={[
              [ character.skills.animalHandling, 'Animal Handling' ],
              [ character.skills.insight, 'Insight' ],
              [ character.skills.medicine, 'Medicine' ],
              [ character.skills.perception, 'Perception' ],
              [ character.skills.survival, 'Survival' ]
            ]}/>
          <AbilityScoreBlock
            abilityScore={character.abilityScores.cha}
            label="Charisma"
            skills={[
              [ character.skills.deception, 'Deception' ],
              [ character.skills.intimidation, 'Intimidation' ],
              [ character.skills.performance, 'Performance' ],
              [ character.skills.persuasion, 'Persuasion' ],
            ]}/>
        </div>
        <div className="havok-design-system-key-value-container">
          <p><strong>Inspiration:</strong> {character.inspiration ? 'Yes' : 'No'}</p>
          <p><strong>Initiative:</strong> {character.initiative}</p>
          <p><strong>Proficiency Bonus:</strong> {character.proficiencyBonus}</p>
          <p><strong>AC:</strong> {character.ac}</p>
          <p><strong>HP:</strong> {getHpString(character)}</p>
          <p><strong>Temp HP:</strong> {character.hitPoints.temporary}</p>
          <p><strong>Hit Dice:</strong> {`${character.classes.map(item => `${item.level}d${item.hitDiceValue}`)}`}</p>
          <p><strong>Size:</strong> {character.race.size}</p>
          <p><strong>Speed:</strong> {getCharacterSpeedString(character.speed)}</p>
          <p><strong>Condition Immunities:</strong> {character.conditionImmunities.join(', ')}</p>
          <p><strong>Condition Resistances:</strong> {character.conditionResistances.join(', ')}</p>
          <p><strong>Condition Vulnerabilities:</strong> {character.conditionVulnerabilities.join(', ')}</p>
          <p><strong>Damage Immunities:</strong> {character.damageImmunities.join(', ')}</p>
          <p><strong>Damage Resistances:</strong> {character.damageResistances.join(', ')}</p>
          <p><strong>Damage Vulnerabilities:</strong> {character.damageVulnerabilities.join(', ')}</p>
          <p><strong>Senses:</strong> {character.senses.join(', ')}</p>
          <p><strong>Languages:</strong> {character.languages.join(', ')}</p>
          <p><strong>Armor:</strong> {character.proficiencies.armor.join(', ')}</p>
          <p><strong>Weapons:</strong> {character.proficiencies.weapon.join(', ')}</p>
          <p><strong>Tools:</strong> {character.proficiencies.tool.join(', ')}</p>
        </div>
      </div>
      <h2>Biography</h2>
      <p><strong>Personality Traits:</strong> {character.biography.personalityTraits}</p>
      <p><strong>Ideals:</strong> {character.biography.ideals}</p>
      <p><strong>Bonds:</strong> {character.biography.bonds}</p>
      <p><strong>Flaws:</strong> {character.biography.flaws}</p>
      <h3>Backstory</h3>
      {
        character.biography.backstory.entries.map((item, index) => <Entry key={index} entry={item}/>)
      }
      <h3>Physical Description</h3>
      <p><strong>Age:</strong> {character.biography.physicalDescription.age}</p>
      <p><strong>Dress:</strong> {character.biography.physicalDescription.dress}</p>
      <p><strong>Eyes:</strong> {character.biography.physicalDescription.eyes}</p>
      <p><strong>Hair:</strong> {character.biography.physicalDescription.hair}</p>
      <p><strong>Skin:</strong> {character.biography.physicalDescription.skin}</p>
      <p><strong>Height:</strong> {getHeightString(character.biography.physicalDescription.height)}</p>
      <p><strong>Weight:</strong> {getWeightString(character.biography.physicalDescription.weight)}</p>
      <p><strong>Description:</strong> {character.biography.physicalDescription.description}</p>
      <h2>Features</h2>
      {character.background.features.map((feature, index) => <Feature key={index} feature={feature}/>)}
      {character.race.features.map((feature, index) => <Feature key={index} feature={feature}/>)}
      {character.race.subrace?.features.map((feature, index) => <Feature key={index} feature={feature}/>)}
      {
        character.classes.map((klass) => {
          return klass.features.map((feature, index) => <Feature key={index} feature={feature}/>);
        })
      }
      {
        character.spellLists.length ? (
          <>
            <h2>Spellcasting</h2>
            <p><strong>Spell Slots:</strong> {character.spellSlots.join(', ')}</p>
            {
              character.spellLists.map((spellList, index) => <SpellList key={index} spellList={spellList} />)
            }
          </>
        ) : null
      }
      <h2>Inventory</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Total</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {
            character.inventory.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.total}</td>
                  <td>{item.description}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
      {
        character.pets.map((pet, index) => <CreatureSheet key={index} creature={pet}/>)
      }
    </Layout>
  );
};