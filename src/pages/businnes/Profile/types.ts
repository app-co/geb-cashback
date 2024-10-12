import { z } from 'zod';

import { schemaAccount, schemaLocality } from './schema';

export interface UserAcount {
  name: string;
  email: string;
  old_password: string;
}

export interface IUserProfile {
  born: string;
  profission: string;
  contato: string;
  document: string;
}

export type TAccount = z.infer<typeof schemaAccount>;
export type TLocality = z.infer<typeof schemaLocality>;
