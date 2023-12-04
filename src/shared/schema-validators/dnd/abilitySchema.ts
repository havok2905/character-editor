import { z } from 'zod';

export const abilitySchema = z.union([
  z.literal('str'),
  z.literal('dex'),
  z.literal('con'),
  z.literal('int'),
  z.literal('wis'),
  z.literal('cha')
], {
  errorMap: (issue) => {
    switch (issue.code) {
      case 'invalid_union':
        return { message: 'value must be either str, dex, con, int, wis, or cha' };
      default:
        return { message: 'value is not valid' };
    }
  }
});
