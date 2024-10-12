import { api } from '@/services/api';

import { ICompanyById } from './dto/interfaces';
import { TFormRegisterCompany, TFormRegisterSocialMidate } from './dto/types';

export const fetchs = {
  getCompanyById: async () => {
    const { data } = await api.get<ICompanyById>(`/company`);
    return data;
  },

  registerCompay: async (obj: TFormRegisterCompany) => {
    const { data } = await api.post(`/businnes-create`, obj);
    return data;
  },

  getSocialMida: async (params: { companyId: string }) => {
    const { data } = await api.get('/socialMidia', { params });

    return data;
  },
  registerSocialMida: async (params: TFormRegisterSocialMidate) => {
    const { data } = await api.post('/socialMidia', params);

    return data;
  },
};
