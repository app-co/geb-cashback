import { z } from 'zod';

export const schemaRegisterUser = z
  .object({
    name: z.string({ message: '* campo obrigátorio' }),
    email: z.string({ message: '* campo obrigátorio' }).email('email inválido'),
    password: z.string({ message: '* campo obrigátorio' }),
    confirmation_pass: z.string({ message: '* campo obrigátorio' }),
    document: z.string({ message: '* campo obrigátorio' }),
    contato: z.string({ message: '* campo obrigátorio' }),
    born: z.string({ message: '* campo obrigátorio' }),
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
