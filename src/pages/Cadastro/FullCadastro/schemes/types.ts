import { z } from 'zod';

import { schemaRegisterUser } from './schemas';

export type TRegisterUser = z.infer<typeof schemaRegisterUser>;
