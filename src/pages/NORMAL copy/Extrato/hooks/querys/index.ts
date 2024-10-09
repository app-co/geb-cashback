import { useInfiniteQuery } from 'react-query';

import { useAuth } from '@/context/auth';

import { getTransactions } from '../fetchs';

export function useTransactions(month: number) {
  const { user } = useAuth();

  const newParams = {
    userId: user.id,
    month,
  };
  return useInfiniteQuery({
    queryKey: ['get@company', newParams],
    queryFn: ({ pageParam }) =>
      getTransactions({
        ...newParams,
        pageNumber: pageParam || 0,
        pageSize: String(17),
      }),
    getNextPageParam: lastPage => {
      if (lastPage.pageNumber === lastPage.totalPages - 1) {
        return undefined;
      }

      return lastPage.pageNumber + 1 ?? 1;
    },
  });
}
