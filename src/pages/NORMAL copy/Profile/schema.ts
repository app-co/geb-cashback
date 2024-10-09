import * as y from 'yup';
import { z } from 'zod';

const confirmationPasswordSchema = y
  .string()
  .oneOf([y.ref('password'), ''], 'A senha não confere')
  .required('Confirme sua senha');

export const schemaAccount = z
  .object({
    name: z.string(),
    email: z.string(),
    old_password: z.string(),
    password: z.string(),
  })
  .refine(filde => filde.password === filde.old_password, {
    path: ['old_password'],
    message: 'As senhas precisam ser iguais',
  });

export const schemaBank = y.object({
  key_pix: y.string().required(),
  ag: y.string().required(),
  conta: y.string().required(),
});

export const schemaProfile = z.object({
  born: z.string(),
  profission: z.string(),
  contato: z.string(),
  document: z.string(),
});

export const schemaLocality = z.object({
  id: z.string().optional(),
  city: z.string(),
  region_code: z.string(),
  postal_code: z.string(),
  complement: z.string().optional(),
  street: z.string(),
  number: z.string(),
});
