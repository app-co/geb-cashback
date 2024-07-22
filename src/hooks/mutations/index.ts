import { useMutation, useQueryClient } from 'react-query';

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

  return useMutation(fetch.signIn);
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
