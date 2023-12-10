import React, { type FC, useMemo } from 'react';
import {
  CheckAllIcon,
  CheckIcon,
  DashIcon
} from './icons';
import { type ISkill } from '../../types/dnd/ISkill';
import { plusOrNothingForNegative } from '../../shared/utils/plusOrNothingForNegative';
import './Skill.css';

export interface ISkillProps {
  label: string;
  skill: ISkill,
}

export const Skill: FC<ISkillProps> = ({
  label,
  skill: {
    mod,
    proficiency
  }
}) => {
  const proficiencyIcon = useMemo(() => {
    if (proficiency === 'proficient') return <CheckIcon/>;
    if (proficiency === 'expertise') return <CheckAllIcon/>;
    return <DashIcon/>;
  }, [ proficiency ]);

  return (
    <p className="skill">{proficiencyIcon} {plusOrNothingForNegative(mod)}{mod} {label}</p>
  );
};
