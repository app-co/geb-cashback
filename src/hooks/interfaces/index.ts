export interface IExtrato {
  totalPages: number;
  currentPage: number;
  totalRecords: number;
  pageSize: number;
  pageNumber: number;
  totalRecordsPerPage: number;
  records: Records[];
}

export interface Records {
  dia: number;
  transaction: Transaction[];
}

export interface Transaction {
  hora: string;
  valor: number;
  dia: number;
}

export interface IMetrica {
  wallet: Wallet;
  leads: number;
}

export interface Wallet {
  amount: number;
  id: string;
}
