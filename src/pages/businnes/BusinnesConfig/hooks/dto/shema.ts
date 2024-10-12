import { z } from 'zod';

export const formRegisterCompnay = z.object({
  name: z.string(),
  cnpj: z
    .string()
    .min(13, 'CNPJ inválido')
    .transform(h => h.replace(/\D/g, '')),
  logo: z.string(),
  telefone: z
    .string()
    .min(10, 'telefone inválido')
    .transform(h => h.replace(/\D/g, '')),
  provider_id: z.string(),
  veriyfild: z.boolean(),
  segmento: z.number(),
  casheback: z.string().transform(h => Number(h)),
});

export const formRegisterSocialMida = z.object({
  userId: z.string(),
  link: z.string({ message: '* obrigatório' }).url('Url inválida'),
  type: z.enum(
    [
      'maps',
      'facebook',
      'twitter',
      'linkedin',
      'youtube',
      'instagram',
      'whatsapp',
      'email',
      'skype',
      'telegram',
      'discord',
      'tiktok',
      'pinterest',
      'reddit',
      'snapchat',
      'viber',
      'wechat',
      'paypal',
    ],
    { message: 'Selecione o tipo de link' },
  ),
});
