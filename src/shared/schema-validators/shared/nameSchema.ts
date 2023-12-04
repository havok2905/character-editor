import { z } from 'zod';

export const nameSchema = z.object({
  first: z.string(),
  honorific: z.optional(z.string()),
  last: z.optional(z.string()),
  middle: z.optional(z.string()),
  prefix: z.optional(z.string()),
  suffix: z.optional(z.string()),
  title: z.optional(z.string()),
});
