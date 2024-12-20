/* eslint-disable consistent-return */
import { useInfiniteQuery, useQuery } from 'react-query';

import { Fetch } from '../fetchs';
import { TGeCompanyExtrato, TGetAllCompany } from '../fetchs/types';
import { getSegmento } from '../storage';

const fetch = new Fetch();

export function useGetAllCompany(
  params: Omit<TGetAllCompany, 'pageNumber' | 'pageSize'>,
) {
  const newParams = {
    ...params,
    pageNumber: 0,
    pageSize: 10,
  };

  return useInfiniteQuery({
    queryKey: ['get@company', newParams],
    queryFn: ({ pageParam }) =>
      fetch.getAllCompany({
        ...params,
        pageNumber: pageParam || 0,
        pageSize: 10,
      }),
    getNextPageParam: lastPage => {
      if (lastPage.pageNumber === lastPage.totalPages - 1) {
        return undefined;
      }

      return lastPage.pageNumber + 1;
    },
  });
}

export function useCompanyExtrato(
  params: Omit<TGeCompanyExtrato, 'pageNumber' | 'pageSize'>,
) {
  const newParams = {
    ...params,
    pageNumber: 0,
    pageSize: 17,
  };
  return useInfiniteQuery({
    queryKey: ['get@company', newParams],
    queryFn: ({ pageParam }) =>
      fetch.getCompanyExtrato({
        ...params,
        pageNumber: pageParam || 0,
        pageSize: 17,
      }),
    getNextPageParam: lastPage => {
      if (lastPage.pageNumber === lastPage.totalPages - 1) {
        return undefined;
      }

      return lastPage.pageNumber + 1;
    },
  });
}

export function useGetLocalSegemnto() {
  return useQuery({
    queryKey: ['segmento'],
    queryFn: () => getSegmento(),
  });
}

export function useFavorites() {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: () => fetch.getFavorites(),
  });
}

export function useUserWallet() {
  return useQuery({
    queryKey: ['wallet'],
    queryFn: () => fetch.getCasheback(),
  });
}

export function useCompanyMetrica(params: { userId: string }) {
  return useQuery({
    queryKey: ['wallet'],
    queryFn: () => fetch.getCompanyMetrica(params),
  });
}

export function useDestaque() {
  return useQuery({
    queryKey: ['destaque'],
    queryFn: () => fetch.getDestaque(),
  });
}

export function useTransactionByInvit(codigoInvit: string) {
  const newParams = {
    codigoInvit,
    pageNumber: 0,
    pageSize: 17,
  };

  return useInfiniteQuery({
    queryKey: ['get@transactionInvit', newParams],
    queryFn: ({ pageParam }) =>
      fetch.getTransactionsByInvit({
        ...newParams,
        pageNumber: pageParam || 0,
        pageSize: 17,
      }),
    getNextPageParam: lastPage => {
      if (lastPage.pageNumber === lastPage.totalPages - 1) {
        return undefined;
      }

      return lastPage.pageNumber + 1;
    },
  });
}

export function useInvit() {
  return useQuery({
    queryKey: ['invit'],
    queryFn: () => fetch.getInvit(),
  });
}
