import { TUpdateUser } from '@/hooks/fetchs/types';
import { api } from '@/services/api';

import { TFormUpdaProfile, TFormUpdateLocality } from '../dto/forms/types';

/* eslint-disable class-methods-use-this */
export class Fetch {
  async updateUser(obj: TUpdateUser) {
    const { data } = await api.put('/user/update', obj);
    return data;
  }

  async updateLocality(obj: TFormUpdateLocality) {
    const { data } = await api.put('/user/locality', obj);

    return data;
  }

  async updateProfile(obj: TFormUpdaProfile) {
    const { data } = await api.put('/user/profile', obj);

    return data;
  }

  async updateCardToken(obj: { userId: string; token: string }) {
    const { data } = await api.post('/order/saveCard', obj);

    return data;
  }
}
