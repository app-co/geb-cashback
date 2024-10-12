import { z } from 'zod';

export const schemaUser = z.object({
  id: z.string(),
  name: z.string({ required_error: 'nome obrigatório' }),
  email: z
    .string({ required_error: 'email obrigatório' })
    .email('E-mail inválido'),
  password: z.string().optional(),
  account_type: z.enum(['normal', 'simple', 'businnes']).default('normal'),
});

export const schemaProfile = z.object({
  document: z.string(),
  avatar: z.string().optional(),
  born: z.string(),
  profission: z.string(),
  contato: z.string(),
  userId: z.string(),
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

export const schemaBank = z.object({
  userId: z.string(),
  id: z.string().nullable(),
  key_type: z.enum(['key_rondon', 'cpf', 'email', 'cnpj', 'phone_number']),
  key_pix: z.string().optional(),
  conta: z.string().optional(),
  ag: z.string().optional(),
});

export const schemaCardToken = z.object({
  encrypted: z.string(),
  holder: z.string(),
  number: z.string(),
  expiry: z.string(),
  ccv: z.string(),
  userId: z.string(),
});
