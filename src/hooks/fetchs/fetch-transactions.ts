import { api } from '@/services/api';

import { TCardToken } from './types';

export async function transactionRegisterCardToken(
  objeto: Omit<TCardToken, 'expiry'>,
) {
  const response = await api.post('/payment/card-token', objeto);

  return response.data;
}
