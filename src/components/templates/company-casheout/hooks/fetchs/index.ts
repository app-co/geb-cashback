import { api } from '@/services/api';

import { TFormCasheOut } from '../dto/forms/types';

export async function postCacheOut(obj: TFormCasheOut) {
  const { data } = await api.post('/order/cashe-out', obj);

  return data;
}

export async function companyCasheout(obj: TFormCasheOut) {
  const { data } = await api.post('/order/company/cashe-out', obj);

  return data;
}
