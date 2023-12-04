import React, { type FC } from 'react';
import { type IAbilityScore } from '../../types/dnd/IAbilityScore';
import { plusOrNothingForNegative } from '../../shared/utils/plusOrNothingForNegative';
import './AbilityScore.css';

export interface IAbilityScoreProps {
  abilityScore: IAbilityScore,
  label: string;
}

export const AbilityScore: FC<IAbilityScoreProps> = ({
  abilityScore: {
    mod,
    savingThrowProficiency,
    score
  },
  label
}) => {
  return (
    <div className="ability-score">
      <div>
        <p className="ability-score-mod">
          {plusOrNothingForNegative(mod)}{mod}
        </p>
        <p className="ability-score-score">
          {score}
        </p>
      </div>
      <div className="ability-score-label">
        <p>{label}</p>
        <p>{savingThrowProficiency ? '*' : '-'}</p>
      </div>
    </div>
  );
};
