import { useMutation, useQueryClient } from 'react-query';

import Toast from '@/components/modals/toast/handler';

import { Fetch } from '../fetchs';
import { transactionRegisterCardToken } from '../fetchs/fetch-transactions';
import { saveDataLocal } from '../storage';

interface I {
  key: string;
  fetch: () => any;
}

const fetch = new Fetch();
export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation(fetch.signIn, {
    onSuccess: () => {
      Toast.show({
        tipo: 'success',
        title: 'Bem Vindo!',
        description: 'Você foi logado com sucesso!',
      });
    },
    onError: (error: any) => {
      Toast.show({
        tipo: 'error',
        title: 'Erro ao logar',
        description: error?.message ?? 'Erro ao efetuar o login',
      });
    },
  });
}

export function useSignUp() {
  return useMutation(fetch.signUp);
}

export function useCashInPix() {
  return useMutation(fetch.casheInPix);
}

export function useGetAllCompany() {
  return useMutation(fetch.getAllCompany);
}

export function useSaveLocal() {
  const client = useQueryClient();
  return useMutation(saveDataLocal, {
    onSuccess: () => client.invalidateQueries('segmentos'),
  });
}

export function useSaveCardToken() {
  return useMutation(transactionRegisterCardToken);
}
export function usePayCard() {
  return useMutation(fetch.payWithCard);
}
export function usePayMoney() {
  return useMutation(fetch.payWitMoney);
}

export function useRegisterFavorites() {
  const client = useQueryClient();
  return useMutation(fetch.registerFavorites, {
    onSuccess: () => client.invalidateQueries('favorites'),
  });
}

export function useRemoveFavorites() {
  const client = useQueryClient();
  return useMutation(fetch.removeFavorites, {
    onSuccess: () => client.invalidateQueries('favorites'),
  });
}
