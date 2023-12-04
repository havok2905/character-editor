import { type IAbilityScore } from './IAbilityScore';
import { type IAlignment } from './IAlignment';
import { type IArmorType } from './IArmorType';
import { type IBackground } from './IBackground';
import { type IClass } from './IClass';
import { type IGender } from '../shared/IGender';
import { type IHitPoints } from './IHitPoints';
import { type ILanguage } from './ILanguage';
import { type IName } from '../shared/IName';
import { type IRace } from './IRace';
import { type ISkill } from './ISkill';
import { type ISpeed } from './ISpeed';
import { type IToolType } from './IToolType';
import { type IWeaponType } from './IWeaponType';

export interface ICharacter {
  abilityScores: {
    str: IAbilityScore;
    dex: IAbilityScore;
    con: IAbilityScore;
    int: IAbilityScore;
    wis: IAbilityScore;
    cha: IAbilityScore;
  },
  ac: number;
  background: IBackground;
  biography: {
    alignment: IAlignment;
    gender: IGender;
    name: IName;
  };
  classes: IClass[];
  hitPoints: IHitPoints;
  initiative: number;
  inspiration: boolean;
  languages: ILanguage[];
  proficiencies: {
    armor: IArmorType[];
    tool: IToolType[];
    weapon: IWeaponType[];
  }
  proficiencyBonus: number;
  race: IRace;
  skills: {
    acrobatics: ISkill;
    animalHandling: ISkill;
    arcana: ISkill;
    athletics: ISkill;
    deception: ISkill;
    history: ISkill;
    insight: ISkill;
    intimidation: ISkill;
    investigation: ISkill;
    medicine: ISkill;
    nature: ISkill;
    perception: ISkill;
    performance: ISkill;
    persuasion: ISkill;
    religion: ISkill;
    sleightOfHand: ISkill;
    stealth: ISkill;
    survival: ISkill;
  };
  speed: ISpeed[];
}
