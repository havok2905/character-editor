import { z } from 'zod';
import { abilitySchema } from './abilitySchema';
import { alignmentSchema } from './alignmentSchema';
import { genderSchema } from '../shared/genderSchema';
import { nameSchema } from '../shared/nameSchema';
import { proficiencySchema } from './proficiencySchema';
import { sizeSchema } from './sizeSchema';

export const characterSchema = z.object({
  abilityScores: z.object({
    str: z.object({
      mod: z.number(),
      savingThrowProficiency: z.boolean(),
      score: z.number()
    }),
    dex: z.object({
      mod: z.number(),
      savingThrowProficiency: z.boolean(),
      score: z.number()
    }),
    con: z.object({
      mod: z.number(),
      savingThrowProficiency: z.boolean(),
      score: z.number()
    }),
    int: z.object({
      mod: z.number(),
      savingThrowProficiency: z.boolean(),
      score: z.number()
    }),
    wis: z.object({
      mod: z.number(),
      savingThrowProficiency: z.boolean(),
      score: z.number()
    }),
    cha: z.object({
      mod: z.number(),
      savingThrowProficiency: z.boolean(),
      score: z.number()
    })
  }),
  ac: z.number(),
  background: z.object({
    name: z.string()
  }),
  biography: z.object({
    alignment: alignmentSchema,
    gender: genderSchema,
    name: nameSchema,
  }),
  classes: z.array(z.object({
    hitDiceValue: z.number(),
    level: z.number(),
    name: z.string(),
  })),
  hitPoints: z.object({
    current: z.number(),
    max: z.number(),
    temporary: z.number(),
  }),
  initiative: z.number(),
  inspiration: z.boolean(),
  languages: z.array(z.string()),
  proficiencies: z.object({
    armor: z.array(z.string()),
    tool: z.array(z.string()),
    weapon: z.array(z.string())
  }),
  proficiencyBonus: z.number().min(2).max(10),
  race: z.object({
    name: z.string(),
    size: sizeSchema,
    subrace: z.optional(z.object({
      name: z.string()
    }))
  }),
  skills: z.object({
    acrobatics: z.object({
      ability: abilitySchema,
      mod: z.number(),
      proficiency: z.optional(proficiencySchema)
    }),
    animalHandling: z.object({
      ability: abilitySchema,
      mod: z.number(),
      proficiency: z.optional(proficiencySchema)
    }),
    arcana: z.object({
      ability: abilitySchema,
      mod: z.number(),
      proficiency: z.optional(proficiencySchema)
    }),
    athletics: z.object({
      ability: abilitySchema,
      mod: z.number(),
      proficiency: z.optional(proficiencySchema)
    }),
    deception: z.object({
      ability: abilitySchema,
      mod: z.number(),
      proficiency: z.optional(proficiencySchema)
    }),
    history: z.object({
      ability: abilitySchema,
      mod: z.number(),
      proficiency: z.optional(proficiencySchema)
    }),
    insight: z.object({
      ability: abilitySchema,
      mod: z.number(),
      proficiency: z.optional(proficiencySchema)
    }),
    intimidation: z.object({
      ability: abilitySchema,
      mod: z.number(),
      proficiency: z.optional(proficiencySchema)
    }),
    investigation: z.object({
      ability: abilitySchema,
      mod: z.number(),
      proficiency: z.optional(proficiencySchema)
    }),
    medicine: z.object({
      ability: abilitySchema,
      mod: z.number(),
      proficiency: z.optional(proficiencySchema)
    }),
    nature: z.object({
      ability: abilitySchema,
      mod: z.number(),
      proficiency: z.optional(proficiencySchema)
    }),
    perception: z.object({
      ability: abilitySchema,
      mod: z.number(),
      proficiency: z.optional(proficiencySchema)
    }),
    performance: z.object({
      ability: abilitySchema,
      mod: z.number(),
      proficiency: z.optional(proficiencySchema)
    }),
    persuasion: z.object({
      ability: abilitySchema,
      mod: z.number(),
      proficiency: z.optional(proficiencySchema)
    }),
    religion: z.object({
      ability: abilitySchema,
      mod: z.number(),
      proficiency: z.optional(proficiencySchema)
    }),
    sleightOfHand: z.object({
      ability: abilitySchema,
      mod: z.number(),
      proficiency: z.optional(proficiencySchema)
    }),
    stealth: z.object({
      ability: abilitySchema,
      mod: z.number(),
      proficiency: z.optional(proficiencySchema)
    }),
    survival: z.object({
      ability: abilitySchema,
      mod: z.number(),
      proficiency: z.optional(proficiencySchema)
    })
  }),
  speed: z.array(z.object({
    name: z.optional(z.string()),
    unit: z.string(),
    value: z.number()
  }))
});
