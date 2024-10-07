import { useInfiniteQuery, useQuery } from 'react-query';

import { Fetch } from '../fetchs';
import { TGetAllCompany } from '../fetchs/types';
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

      return lastPage.pageNumber + 1 ?? 1;
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
