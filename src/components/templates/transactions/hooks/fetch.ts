import { api } from '@/services/api';

import { IResposePaymentCard } from './dto/interfaces';
import { TObjetoSaveCard, TSchemaCard, TschemaPix } from './dto/types';

export async function postPayWithCard(obj: TSchemaCard) {
  const response = await api.post('/order/card', obj);

  return response.data as IResposePaymentCard;
}

export async function postPayWithPix(obj: TschemaPix) {
  const response = await api.post('/order/pix', obj);

  return response.data;
}

export async function postSaveCard(obj: TObjetoSaveCard) {
  const response = await api.post('/order/saveCard', obj);

  return response.data;
}
