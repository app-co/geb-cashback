import { z } from 'zod';

import { _currencyToNumber } from '@/utils/unidades';

export const schemaCasheOut = z.object({
  userId: z.string(),
  value: z.string().transform(h => String(_currencyToNumber(h))),
  keyPix: z.string(),
});
