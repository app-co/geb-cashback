/* eslint-disable no-async-promise-executor */
import axios, { AxiosError, AxiosInstance } from 'axios';

import UnauthorizedModalHandler from '@/components/modals/unauthorizedModal/handler';


type SignOut = () => void;

type APIInstaceProps = AxiosInstance & {
  registerIntercepTokenManager: (signOut: SignOut) => () => void;
};

const dev = 'http://192.168.0.106:3333';
// const dev = 'http://192.168.0.109:3333';
// const dev = 'http://192.168.15.47:3333';
// const production = 'https://geb-server.appcom.dev';

type PromiseType = {
  onSucess: (token: string) => void;
  onFail: (error: AxiosError) => void;
};

function handleServerError(error: any) {
  switch (error.response.status) {
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

// api.registerIntercepTokenManager = signOut => {
//   const registerIntercepToken = api.interceptors.response.use(
//     config => config,
//     async requesRrror => {
//       const originalRequest = requesRrror.config;
//       const erro = requesRrror?.response?.data as TStatusError;

//       const status = requesRrror?.response?.status;
//       if (status === 409) {
//         return Promise.reject(new AppError(erro.error));
//       }

//       if (status === 401) {
//         if (isRefreshing) {
//           return new Promise((resolve, reject) => {
//             failedQuery.push({
//               onSucess: (token: string) => {
//                 originalRequest.headers = {
//                   Authorization: `Bearer ${token}`,
//                 };
//                 resolve(api(originalRequest));
//               },
//               onFail: (axioxError: AxiosError) => {
//                 reject(axioxError);
//               },
//             });
//           });
//         }

//         isRefreshing = true;

//         return new Promise(async (resolve, reject) => {
//           try {
//             const { data } = await api.patch(pathsRoutes.session.refresh);
//             console.log({ data });
//             storageToken.setToken(data.token);

//             if (originalRequest.data) {
//               originalRequest.data = JSON.parse(originalRequest.data);
//             }

//             originalRequest.headers = {
//               Authorization: `Bearer ${data.token}`,
//             };

//             api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

//             failedQuery.forEach(request => {
//               request.onSucess(data.token);
//             });

//             console.log('TOKEN ATUALIZADO');
//           } catch (error: any) {
//             failedQuery.forEach(h => {
//               h.onFail(error);
//             });
//             signOut();
//             console.log(error, 'promise');
//             reject(error);
//           } finally {
//             isRefreshing = false;
//             failedQuery = [];
//           }
//         });

//         // return Promise.reject(requesRrror);

//         // if (error === 'Sua sessão expirou') {
//         //   console.log(error);
//         //   signOut();
//         //   return Promise.reject(requesRrror);
//         // }

//         // return Promise.reject(new AppError(erro));
//       }

//       return Promise.reject(erro);
//     },
//   );

//   return () => {
//     api.interceptors.response.eject(registerIntercepToken);
//   };
// };

// export const socket = soketio(production);

api.interceptors.response.use(
  res => {
    return res;
  },
  (error: AxiosError) => {
    const err = error?.response?.data?.error;
    const status = error?.response?.status;

    console.log({ err });

    if (!err.response) {
      UnauthorizedModalHandler.showModal();
    }

    return Promise.reject(err);
  },
);

export { api };
