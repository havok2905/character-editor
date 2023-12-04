import { z } from 'zod';

export const pronounSchema = z.object({
  objectivePronoun: z.optional(z.string()), // he/she/they
  possessivePronoun: z.optional(z.string()), // his/her/their
  subjectivePronoun: z.optional(z.string()), // him/her/them
});
