/* eslint-disable class-methods-use-this */
import { api } from '@/services/api';
import { pathsRoutes } from '@/services/schemeRoutes';

import { IExtrato, IMetrica } from '../interfaces';
import { ICompany, IRecordsCompany, IWallet } from './interfaces';
import {
  objRegisterFavorites,
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

  async getFavorites() {
    const { data } = await api.get('/favorites');
    return data as IRecordsCompany[];
  }

  async registerFavorites(obj: t.TRegisterFavorites) {
    objRegisterFavorites.parse(obj);

    const { data } = await api.post(`/favorites/register`, obj);
    return data as IRecordsCompany[];
  }

  async removeFavorites(id: number) {
    const { data } = await api.delete(`/favorites/${id}`);
    return data;
  }

  async getCasheback() {
    const { data } = await api.get<IWallet>('/casheback');
    return data;
  }

  async getCompanyMetrica(params: { userId: string }) {
    const { data } = await api.get<IMetrica>('/company/metricas', {
      params,
    });
    return data;
  }

  async getCompanyExtrato(params: t.TGeCompanyExtrato) {
    const { data } = await api.get<IExtrato>('/company/extrato', {
      params,
    });
    return data;
  }

  async getDestaque() {
    const { data } = await api.get<IRecordsCompany[]>('/company/destaque');
    return data;
  }
}
