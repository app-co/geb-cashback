import { z } from 'zod';

import { schemaCasheOut } from './schema';

export type TFormCasheOut = z.infer<typeof schemaCasheOut>;

