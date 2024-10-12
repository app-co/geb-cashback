/* eslint-disable prettier/prettier */
export interface ICompanyById {
  id: string;
  name: string;
  cnpj: string;
  document: string;
  logo: string;
  telefone: string;
  crated_at: Date;
  updated_at: Date;
  userId: string;
  veriyfild: boolean;
  favorite: boolean;
  segmento: number;
  casheback: number;
  social_midia: ISocialMida[];
}

export interface ISocialMida {
  id: number;
  companyId: string;
  link: string;
  type:
  | 'maps'
  | 'facebook'
  | 'twitter'
  | 'linkedin'
  | 'youtube'
  | 'instagram'
  | 'whatsapp'
  | 'email'
  | 'skype'
  | 'telegram'
  | 'discord'
  | 'tiktok'
  | 'pinterest'
  | 'reddit'
  | 'snapchat'
  | 'viber'
  | 'wechat'
  | 'paypal';
}
