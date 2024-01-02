import { type FC } from 'react';
import { AbilityScoreBlock } from './AbilityScoreBlock';
import { ActionItem } from './ActionItem';
import { type Creature } from '../../../types/schema';
import { Feature } from './Feature';
import { getCharacterSpeedString } from '../../utils/dndStringHelpers/getCharacterSpeedString';
import { getHpString } from '../../utils/dndStringHelpers/getHpString';
import { Layout } from './Layout';
import { SpellList } from './SpellList';

interface CreatureSheetProps {
  creature: Creature;
}

export const CreatureSheet: FC<CreatureSheetProps> = ({
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
      {
        creature.regionalEffects.length ? (
          <>
            <h2>Regional Effects</h2>
            {
              creature.regionalEffects.map((action, index) => <ActionItem key={index} action={action}/>)
            }
          </>
        ) : null
      }
    </>
  );
};

export const CreatureSheetPage: FC<CreatureSheetProps> = ({
  creature
}) => {
  return (
    <Layout title={`Creature - ${creature.name}`}>
      <CreatureSheet creature={creature} />
    </Layout>
  );
};
