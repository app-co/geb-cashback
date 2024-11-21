import { z } from 'zod';

export const schemaRegisterUser = z
  .object({
    name: z
      .string({ message: '* campo obrigátorio' })
      .min(3, 'Digite seu nome')
      .transform(h => h.trim()),
    email: z
      .string({ message: '* campo obrigátorio' })
      .email('email inválido')
      .transform(h => h.trim()),
    password: z
      .string({ message: '* campo obrigátorio' })
      .min(6, 'Senha deve conter 6 dígitos')
      .transform(h => h.trim()),
    confirmation_pass: z
      .string({ message: '* campo obrigátorio' })
      .min(6, 'Senha deve conter 6 dígitos')
      .transform(h => h.trim()),
    document: z
      .string({ message: '* campo obrigátorio' })
      .transform(h => h.trim()),
    contato: z
      .string({ message: '* campo obrigátorio' })
      .transform(h => h.trim()),
    born: z.string({ message: '* campo obrigátorio' }).transform(h => h.trim()),
    profission: z.string({ message: '* campo obrigátorio' }),
    city: z.string({ message: '* campo obrigátorio' }),
    region_code: z.string({ message: '* campo obrigátorio' }),
    postal_code: z.string({ message: '* campo obrigátorio' }),
    complement: z.string({ message: '* campo obrigátorio' }).optional(),
    street: z.string({ message: '* campo obrigátorio' }),
    number: z.string({ message: '* campo obrigátorio' }),
    codigoInvit: z.string().optional(),
  })
  .refine(h => h.password === h.confirmation_pass, {
    message: 'Senhas não conferem',
    path: ['confirmation_pass'],
  });
