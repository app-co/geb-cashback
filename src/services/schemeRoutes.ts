/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line no-underscore-dangle

interface I {
  params?: string;
}

export const pathsRoutes = {
  register: {
    user: '/register/user',
    document: '/register/document',
    profile: '/register/profile',
    hub: '/register/hub',
    company: '/register/company',
    locality: '/register/locality',
  },
  byId: {
    user: '/user',
  },

  session: {
    user: '/session/user',
    refresh: '/session/refresh',
  },

  hub: {
    create: '/',
  },

  transaction: {
    create: '/transaction/create',
    rescue: '/transaction/rescue',
  },

  company: {
    create: '/company/register',
  },
};

export function paramsRoutesScheme(params: string) {
  const routes = {};

  return routes;
}
