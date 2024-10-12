import { z } from 'zod';

import { schemaGetTransactions } from './schema';

export type TParmsGetTransactions = z.infer<typeof schemaGetTransactions>;
