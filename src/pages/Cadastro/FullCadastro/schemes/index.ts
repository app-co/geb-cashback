import * as y from 'yup';
import { z } from 'zod';

const confirmationPasswordSchema = y
  .string()
  .oneOf([y.ref('password'), ''], 'A senha não confere')
  .required('Confirme sua senha');

export const schemeA = y.object({
  name: y.string().required('insira seu nome'),
  email: y.string().email('Email inválido').required('insira seu email'),
  password: y
    .string()
    .required('insira sua senha')
    .min(6, 'Senha no mínimo 6 dígitos'),
  confirmation_pass: confirmationPasswordSchema,
});

export const shcmeB = y.object({
  document: y.string().required(),
  contato: y.string().required(),
  born: y.string().required(),
  profission: y.string().required(),
});

export const shcmeC = y.object({
  key_pix: y.string().required(),
  ag: y.string().required(),
  conta: y.string().required(),
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
