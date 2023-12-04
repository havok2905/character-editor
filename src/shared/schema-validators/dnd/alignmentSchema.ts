import { z } from 'zod';

export const alignmentSchema = z.union([
  z.literal('chaotic evil'),
  z.literal('chaotic good'),
  z.literal('chaotic neutral'),
  z.literal('lawful evil'),
  z.literal('lawful good'),
  z.literal('lawful neutral'),
  z.literal('neutral'),
  z.literal('neutral evil'),
  z.literal('neutral good'),
], {
  errorMap: (issue) => {
    switch (issue.code) {
      case 'invalid_union':
        return { message: 'value must be either chaotic evil, chaotic good, chaotic neutral, lawful evil, lawful good, lawful neutral, neutral, neutral evil, or neutral good' };
      default:
        return { message: 'value is not valid' };
    }
  }
});
