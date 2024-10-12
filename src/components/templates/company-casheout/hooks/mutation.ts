import { useMutation, useQueryClient } from 'react-query';

import { companyCasheout, postCacheOut } from './fetchs';

export function useCasheOut() {
  return useMutation(postCacheOut);
}

export function useCompnayCasheOut() {
  const client = useQueryClient();
  return useMutation(companyCasheout, {
    onSuccess: () => {
      client.invalidateQueries('wallet');
      client.invalidateQueries('company');
    },
  });
}
