import { z } from 'zod';
import { pronounSchema } from './pronounSchema';

export const genderSchema = z.object({
  name: z.string(),
  pronouns: z.optional(z.array(pronounSchema))
});
