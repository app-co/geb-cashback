import { api } from '@/services/api';

import { IResponseTransactions } from '../dto/interfaces';
import { TParmsGetTransactions } from '../dto/parms/types';

export async function getTransactions(params: TParmsGetTransactions) {
  const { data } = await api.get('/transactions', { params });

  return data as IResponseTransactions;
}
