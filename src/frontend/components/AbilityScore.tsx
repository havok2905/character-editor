import React, { type FC, useMemo } from 'react';
import { CheckIcon, DashIcon } from './icons';
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
  const proficiencyIcon = useMemo(() => {
    if (savingThrowProficiency) return <CheckIcon/>;
    return <DashIcon/>;
  }, [ savingThrowProficiency ]);

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
        <p>{proficiencyIcon}</p>
      </div>
    </div>
  );
};
