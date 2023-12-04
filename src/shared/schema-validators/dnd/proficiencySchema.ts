import { z } from 'zod';

export const proficiencySchema = z.union([
  z.literal('none'),
  z.literal('proficient'),
  z.literal('expertise')
], {
  errorMap: (issue) => {
    switch (issue.code) {
      case 'invalid_union':
        return { message: 'value must be either chaotic none, proficient, or expertise' };
      default:
        return { message: 'value is not valid' };
    }
  }
});
