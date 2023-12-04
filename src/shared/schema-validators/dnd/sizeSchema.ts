import { z } from 'zod';

export const sizeSchema = z.union([
  z.literal('tiny'),
  z.literal('small'),
  z.literal('medium'),
  z.literal('large'),
  z.literal('huge'),
  z.literal('gargantuan')
], {
  errorMap: (issue) => {
    switch (issue.code) {
      case 'invalid_union':
        return { message: 'value must be either tiny, small, medium, large, huge, or gargantuan' };
      default:
        return { message: 'value is not valid' };
    }
  }
});
