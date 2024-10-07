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
  account_type: 'normal' | 'business' | 'simple';

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
  cardToken: {
    brand: string;
    number: string;
    token: string;
  }[];
}

export interface ICompany {
  totalPages: number;
  currentPage: number;
  totalRecords: number;
  recordsPerPage: number;
  totalRecordsPerPage: number;
  records: {
    casheback: number;
    cnpj: string;
    id: string;
    logo?: string;
    name: string;
    segmento: string;
    userId: string;
    user: IUser;
    location: ILocality;
  }[];
}
