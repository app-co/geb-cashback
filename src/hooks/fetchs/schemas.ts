import { z } from 'zod';

const pagination = z.object({
  pageSize: z.number().default(0),
  pageNumber: z.number().default(50),
});

export const schemaUserSession = z.object({
  email: z.string().email('email inválido'),
  password: z.string().min(6, 'mínimo de 6 digitos'),
});

export const schemaUserUpdate = z.object({
  id: z.string(),
  name: z.string({ required_error: 'nome obrigatório' }),
  email: z.string().email('email inválido'),
  password: z.string().min(6).optional(),
});

export const schemaUser = z.object({
  id: z.string(),
  name: z.string({ required_error: 'nome obrigatório' }),
  email: z
    .string({ required_error: 'email obrigatório' })
    .email('E-mail inválido'),
  password: z.string().min(6, 'mínimo de 6 dígitos'),
  account_type: z.enum(['normal', 'simple', 'businnes']).default('normal'),
  hub_name: z.string().optional(),
  hubId: z.string().optional(),
});

export const schemaLocality = z.object({
  id: z.string(),
  city: z.string(),
  region_code: z.string(),
  postal_code: z.string(),
  complement: z.string().optional(),
  street: z.string(),
  number: z.string(),
  userId: z.string(),
});

export const schemaProfile = z.object({
  id: z.string(),
  document: z.string(),
  avatar: z.string().optional(),
  born: z.string().optional(),
  profission: z.string().optional(),
  contato: z.string().optional(),
  userId: z.string(),
});

export const schemaCreateUser = z.object({
  U: schemaUser.omit({ id: true }),
  L: schemaLocality.omit({ id: true, userId: true }),
  P: schemaProfile.omit({ id: true, userId: true }),
});

export const schemaSaveCardToken = z.object({
  userId: z.string(),
  holderName: z.string(),
  card_number: z.string(),
  expiryMonth: z.string(),
  expiry: z.string(),
  expiryYear: z.string(),
  ccv: z.string(),
  remoteIp: z.string(),
});

export const schemeCompany = z.object({
  id: z.string(),
  name: z.string(),
  casheback: z.number().default(0),
  segmento: z.string(),
  provider_id: z.string(),
  cnpj: z.string(),
  logo: z.string().optional(),
  created_at: z.date(),
  update_at: z.date(),
});

export const schemaGetAllcompany = z
  .object({
    segmento: z.string().optional(),
  })
  .merge(pagination);

export const schemaTransaction = z.object({
  value: z.string({ message: 'Informe o valor da compra' }),
  valueCache: z.string().default('0'),
});

export const schemaPaymentPix = z.object({
  userId: z.string(),
  companyId: z.string(),
  value: z.number(),
  clientCashback: z.number().default(0),
  codigoInvit: z.string().optional(),
  paymentType: z.enum(['pix', 'money', 'card']),
});

export const schemaSaveSegmento = z.object({
  value: z.number(),
  label: z.string(),
});

export const shcemaCasheOut = z.object({
  value: z.number(),
  pixAddressKey: z.string(),
  pixAddressKeyType: z.string(),
  scheduleDate: z.string().optional(),
  description: z.string(),
});

export const schemaPayWithCard = z.object({
  cardToken: z.string(),
  value: z.number(),
  casheClient: z.string().optional(),
  installment: z.number(),
  companyId: z.string(),
});

export const schemaPayMoney = z.object({
  value: z.number(),
  companyId: z.string(),
  casheClient: z.number(),
  userId: z.string(),
});
