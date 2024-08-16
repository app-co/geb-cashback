import { z } from 'zod';

import * as S from './schema';

export type TFormUpdateUser = z.infer<typeof S.schemaUser>;
export type TFormUpdaProfile = z.infer<typeof S.schemaProfile>;
export type TFormUpdateLocality = z.infer<typeof S.schemaLocality>;
export type TFormUpdateBank = z.infer<typeof S.schemaBank>;
export type TFormSaveCardToken = z.infer<typeof S.schemaCardToken>;
