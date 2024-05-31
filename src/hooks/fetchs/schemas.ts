import { z } from 'zod';

export const schemaUserSession = z.object({
  email: z.string().email('email inválido'),
  password: z.string().min(6, 'mínimo de 6 digitos'),
});

export const schemaCreateUser = z.object({
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

export type TSigIn = z.infer<typeof schemaUserSession>;
export type TCreateUser = z.infer<typeof schemaCreateUser>;
export type TLocality = z.infer<typeof schemaLocality>;
