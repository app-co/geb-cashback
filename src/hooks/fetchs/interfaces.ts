export interface ICardToken {
  id: string;
  number: string;
  token: string;
  brand: string;
}

export interface ICashback {
  cashback: string;
  id: string;
  status: string;
  userId: string;
  walletId: string;
  crated_at: string | Date;
  updated_at: string | Date;
}

export interface ILocality {
  id: string;
  city: string;
  postal_code: string;
  region_code: string;
  street: string;
  complement?: string;
  number: string;
  crated_at: string;
  updated_at: string;
  companyId: string;
  userId: string;
}

interface IWallet {
  amount: number;
  amount_cashback: string;
  id: string;
  userId: string;
  crated_at: string | Date;
  updated_at: string | Date;
}

export interface IUser {
  id: string;
  name: string;
  email: string;

  avatar?: string;
  born?: string;
  afilliated_id: string;
  contato: string;
  hubId: string;
  profission: string;
  crated_at: string | Date;
  wallet: IWallet;
  cashback: ICashback[];
  updated_at: string | Date;
  locality: ILocality;
}

export interface ICompany {
  totalPages: number;
  currentPage: number;
  totalRecords: number;
  pageSize: number;
  pageNumber: number;
  totalRecordsPerPage: number;
  records: {
    id: string;
    name: string;
    location: ILocality;
    logo?: string;
    segmento: string;
    casheback: number;
    telefone: string;
    social_midia: {
      id: number;
      whatsapp: string;
      linkedin: string;
      instagram: string;
      telegram: string;
      google_maps: string;
      facebook: string;
    };
  }[];
}
