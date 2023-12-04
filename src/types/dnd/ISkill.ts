export interface ISkill {
  ability: 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
  mod: number;
  proficiency?: 'none' | 'proficient' | 'expertise';
}
