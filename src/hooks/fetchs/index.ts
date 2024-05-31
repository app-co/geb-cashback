/* eslint-disable class-methods-use-this */
import { api } from '@/services/api';
import { pathsRoutes } from '@/services/schemeRoutes';

import { TCreateUser, TSigIn, schemaUserSession } from './schemas';

export class Fetch {
  async signUp(input: Omit<TCreateUser, 'id'>) {
    schemaUserSession.parse(input);
    const { data } = await api.post(pathsRoutes.register.user, input);
    return data;
  }

  async signIn(input: TSigIn) {
    schemaUserSession.parse(input);
    const { data } = await api.post(pathsRoutes.session.user, input);
    return data;
  }
}
