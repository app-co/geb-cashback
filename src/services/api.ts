/* eslint-disable no-async-promise-executor */
import axios, { AxiosError, AxiosInstance } from 'axios';

import ConectionErrorModalHandler from '@/components/modals/conexao-error/handler';
import GlobalErrorModalHandler from '@/components/modals/global-error/handler';
import UnauthorizedModalHandler from '@/components/modals/unauthorizedModal/handler';

import { AppError } from './AppError';

type SignOut = () => void;

type APIInstaceProps = AxiosInstance & {
  registerIntercepTokenManager: (signOut: SignOut) => () => void;
};

//const dev = 'http://192.168.0.107:3333';
// const dev = 'http://192.168.0.86:3333';
const dev = 'http://192.168.88.153:3333';
// const dev = 'http://192.168.15.47:3333';
// const production = 'https://geb-server.appcom.dev';

const baseURL = process.env.EXPO_URL_DEV;

function handleServerError(error: AxiosError) {
  switch (error?.response?.status) {
    // case 400:
    //   UnauthorizedModalHandler.showModal();
    //   break;
    case 409:
      UnauthorizedModalHandler.showModal();
      break;
    default:
      console.log('modal');
  }
}

const api = axios.create({
  baseURL: dev,
}) as APIInstaceProps;

api.interceptors.response.use(
  res => {
    return res;
  },
  (error: AxiosError) => {
    console.log(error);
    const { status, data } = error?.response as any;
    if (error.message === 'Network Error') {
      ConectionErrorModalHandler.showModal();
    }

    if (status && status === 409) {
      GlobalErrorModalHandler.setTitle({
        title: 'Error',
        description: data.error,
      });
      return Promise.reject(new AppError(data.error));
    }

    return Promise.reject(error);
  },
);

export { api };
