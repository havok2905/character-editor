import React, { type FC, useMemo } from 'react';
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
  const proficiencyString = useMemo(() => {
    if (proficiency === 'proficient') return 'P';
    if (proficiency === 'expertise') return 'E';
    return '-';
  }, [ proficiency ]);

  return (
    <p className="skill">[{proficiencyString}] {plusOrNothingForNegative(mod)}{mod} {label}</p>
  );
};
