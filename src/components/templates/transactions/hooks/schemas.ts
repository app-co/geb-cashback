import { z } from 'zod';

import { _currencyToNumber } from '@/utils/unidades';

export const schemaObjectPaymet = z.object({
  userId: z.string(),
  value: z.string().transform(h => _currencyToNumber(h)),
  cachebakCliente: z.string().transform(h => _currencyToNumber(h)),
  companyId: z.string(),
  paymentType: z.enum(['pix', 'card', 'money']).default('card'),
});

export const schemaObjPayCard = z
  .object({
    holder: z.string(),
    encrypted: z.string(),
    store: z.boolean().default(false),
    installments: z.string().transform(h => Number(h)),
    cvv: z.string(),
  })
  .merge(schemaObjectPaymet);

export const schemaSaveCardToken = z.object({
  holder: z.string(),
  number: z.string(),
  expiry: z.string(),
  ccv: z.string(),
});

export const ObjetoSaveCard = z.object({
  userId: z.string(),
  token: z.string(),
  number: z.string(),
});

export const schemaPayNoCardSaveCard = z.object({
  encrypted: z.string(),
  installments: z.string().transform(h => Number(h)),
  holder: z.string(),
  number: z.string(),
  expiry: z.string(),
  ccv: z.string(),
  userId: z.string(),
  companyId: z.string(),
  value: z.string().transform(h => _currencyToNumber(h)),
  cachebakCliente: z.string().transform(h => _currencyToNumber(h)),
  paymentType: z.enum(['pix', 'card', 'money']).default('card'),
});
