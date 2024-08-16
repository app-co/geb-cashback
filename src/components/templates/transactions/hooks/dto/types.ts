import { z } from 'zod';

import {
  ObjetoSaveCard,
  schemaObjectPaymet,
  schemaObjPayCard,
  schemaPayNoCardSaveCard,
  schemaSaveCardToken,
} from '../schemas';

export type TSchemaCard = z.infer<typeof schemaObjPayCard>;
export type TschemaPix = z.infer<typeof schemaObjectPaymet>;
export type TSaveCarToken = z.infer<typeof schemaSaveCardToken>;
export type TObjetoSaveCard = z.infer<typeof ObjetoSaveCard>;
export type TPayNotSaveCard = z.infer<typeof schemaPayNoCardSaveCard>;
