import { z } from 'zod';

import * as s from './schemas';

export type TSigIn = z.infer<typeof s.schemaUserSession>;
export type TCreateUser = z.infer<typeof s.schemaCreateUser>;
export type TUser = z.infer<typeof s.schemaUser>;
export type TLocality = z.infer<typeof s.schemaLocality>;
export type TCreateProfile = z.infer<typeof s.schemaProfile>;
export type TUpdateUser = z.infer<typeof s.schemaUserUpdate>;
export type TCardToken = z.infer<typeof s.schemaSaveCardToken>;
export type TCompany = z.infer<typeof s.schemeCompany>;
export type TTransaction = z.infer<typeof s.schemaTransaction>;
export type TPaymentPix = z.infer<typeof s.schemaPaymentPix>;
export type TGetAllCompany = z.infer<typeof s.schemaGetAllcompany>;
export type TSaveSegmento = z.infer<typeof s.schemaSaveSegmento>;
// export type TCasheOut = z.infer<typeof s.shemaCasheOut>;
export type TPayWithCard = z.infer<typeof s.schemaPayWithCard>;
export type TPayMoney = z.infer<typeof s.schemaPayMoney>;
export type TRegisterFavorites = z.infer<typeof s.objRegisterFavorites>;
export type TGeCompanyExtrato = z.infer<typeof s.schemaGetComanyExtrato>;
export type TGetTransactionByInvite = z.infer<
  typeof s.schemaTransactionByInvit
>;
