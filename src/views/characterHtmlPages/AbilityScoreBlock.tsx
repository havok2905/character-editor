import { type FC } from 'react';
import {
  type AbilityScore,
  type Skill,
} from '../../../types/schema';
import { plusOrNothingForNegative } from '../../utils/plusOrNothingForNegative';

interface AbilityScoreBlockProps {
  abilityScore: AbilityScore;
  label: string;
  skills: [Skill, string][];
}

export const AbilityScoreBlock: FC<AbilityScoreBlockProps> = ({
  abilityScore,
  label,
  skills,
}) => {
  return (
    <div className="havok-design-system-ability-score-container">
      <div className="havok-design-system-ability-score">
        <p>{plusOrNothingForNegative(abilityScore.mod)}{abilityScore.mod}</p>
        <p className="havok-design-system-ability-score-score">
          {abilityScore.score}
        </p>
        <p>{label}</p>
        <p>{abilityScore.savingThrowProficiency ? '*' : '-'}</p>
      </div>
      <div>
        {
          skills.map(([ skill, label ], index) => {
            const proficiencyString = skill.proficiency === 'proficient' ? 'P' : skill.proficiency === 'expertise' ? 'E' : '';
            return (
              <p key={index}>
                [{proficiencyString}] {plusOrNothingForNegative(skill.mod)}{skill.mod} {label}
              </p>
            );
          })
        }
      </div>
    </div>
  );
};
