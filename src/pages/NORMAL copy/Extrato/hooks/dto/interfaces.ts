export interface IRecordsTransactions {
  dia: number;
  transaction: {
    hora: string;
    company: string;
    valor: number;
  }[];
}

export interface IResponseTransactions {
  totalPages: number;
  currentPage: number;
  totalRecords: number;
  pageSize: number;
  pageNumber: number;
  totalRecordsPerPage: number;
  records: IRecordsTransactions[];
}
