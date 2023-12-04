import { type ICharacter } from '../types/dnd/ICharacter';

export const defaultValue: ICharacter = {
  abilityScores: {
    str: {
      mod: -1,
      savingThrowProficiency: false,
      score: 8
    },
    dex: {
      mod: 1,
      savingThrowProficiency: false,
      score: 13
    },
    con: {
      mod: 0,
      savingThrowProficiency: false,
      score: 10
    },
    int: {
      mod: 2,
      savingThrowProficiency: true,
      score: 14
    },
    wis: {
      mod: 2,
      savingThrowProficiency: true,
      score: 15
    },
    cha: {
      mod: 2,
      savingThrowProficiency: false,
      score: 14
    }
  },
  ac: 10,
  background: {
    name: 'guild artisan'
  },
  biography: {
    alignment: 'chaotic good',
    gender: {
      name: 'woman',
      pronouns: [
        {
          objectivePronoun: 'she',
          possessivePronoun: 'her',
          subjectivePronoun: 'her' 
        }
      ]
    },
    name: {
      first: 'Ella',
      last: 'Olkereth'
    },
  },
  classes: [
    {
      hitDiceValue: 8,
      level: 1,
      name: 'druid'
    }
  ],
  hitPoints: {
    current: 10,
    max: 10,
    temporary: 0,
  },
  initiative: 0,
  inspiration: false,
  languages: [
    'celestial',
    'common',
    'druidic',
    'sylvan'
  ],
  proficiencies: {
    armor: [
      'light armor',
      'medium armor',
      'shields'
    ],
    tool: [
      'herbalism kit'
    ],
    weapon: [
      'club',
      'dagger',
      'dart',
      'javelin',
      'mace',
      'quarterstaff',
      'scimitar',
      'sickle',
      'sling',
      'spear'
    ]
  },
  proficiencyBonus: 2,
  race: {
    name: 'aasimar',
    size: 'medium',
    subrace: {
      name: 'protector'
    }
  },
  skills: {
    acrobatics: {
      ability: 'dex',
      mod: 1,
      proficiency: 'none'
    },
    animalHandling: {
      ability: 'wis',
      mod: 2,
      proficiency: 'none'
    },
    arcana: {
      ability: 'int',
      mod: 4,
      proficiency: 'proficient'
    },
    athletics: {
      ability: 'str',
      mod: -1,
      proficiency: 'none'
    },
    deception: {
      ability: 'cha',
      mod: 2,
      proficiency: 'none'
    },
    history: {
      ability: 'int',
      mod: 2,
      proficiency: 'none'
    },
    insight: {
      ability: 'wis',
      mod: 2,
      proficiency: 'none'
    },
    intimidation: {
      ability: 'cha',
      mod: 2,
      proficiency: 'none'
    },
    investigation: {
      ability: 'int',
      mod: 2,
      proficiency: 'none'
    },
    medicine: {
      ability: 'wis',
      mod: 2,
      proficiency: 'none'
    },
    nature: {
      ability: 'int',
      mod: 4,
      proficiency: 'proficient'
    },
    perception: {
      ability: 'wis',
      mod: 2,
      proficiency: 'none'
    },
    performance: {
      ability: 'cha',
      mod: 2,
      proficiency: 'none'
    },
    persuasion: {
      ability: 'cha',
      mod: 2,
      proficiency: 'none'
    },
    religion: {
      ability: 'int',
      mod: 2,
      proficiency: 'none'
    },
    sleightOfHand: {
      ability: 'dex',
      mod: 1,
      proficiency: 'none'
    },
    stealth: {
      ability: 'dex',
      mod: 1,
      proficiency: 'none'
    },
    survival: {
      ability: 'wis',
      mod: 2,
      proficiency: 'none'
    }
  },
  speed: [
    {
      value: 30,
      unit: 'feet'
    }
  ]
};
