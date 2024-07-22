/* eslint-disable class-methods-use-this */
import { api } from '@/services/api';
import { pathsRoutes } from '@/services/schemeRoutes';

import { ICompany } from './interfaces';
import {
  schemaCreateUser,
  schemaPaymentPix,
  schemaPayWithCard,
  schemaUserSession,
} from './schemas';
import * as t from './types';

export class Fetch {
  async signUp(input: Omit<t.TCreateUser, 'id'>) {
    schemaCreateUser.parse(input);
    const { data } = await api.post(pathsRoutes.register.user, input);
    return data;
  }

  async signIn(input: t.TSigIn) {
    schemaUserSession.parse(input);
    const { data } = await api.post(pathsRoutes.session.user, input);
    return data;
  }

  async updateUser(input: t.TUpdateUser) {
    schemaCreateUser.parse(input);
    const { data } = await api.put('/user/update', input);
    return data;
  }

  async updateLocality(input: t.TCreateUser) {
    schemaCreateUser.parse(input);
    const { data } = await api.put('/user/update', input);
    return data;
  }

  async getCompanyById(id: string) {
    const { data } = await api.get(`/company/${id}`);
    return data as t.TCompany;
  }

  async casheInPix(input: t.TPaymentPix) {
    schemaPaymentPix.parse(input);
    const { data } = await api.post('/cash-in/pix', input);
    return data as { payload: string; image: string };
  }

  async getAllCompany(params: t.TGetAllCompany) {
    const { data } = await api.get('company/get-all', { params });

    return data as ICompany;
  }

  async payWithCard(input: t.TPayWithCard) {
    schemaPayWithCard.parse(input);
    const { data } = await api.post('/payment/card', input);
    return data;
  }

  async payWitMoney(input: t.TPayMoney) {
    schemaPayWithCard.parse(input);
    const { data } = await api.post('/cash-in/money', input);
    return data;
  }
}
