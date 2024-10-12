import { useMutation, useQueryClient } from 'react-query';

import { postCacheOut } from './fetchs';

export function useCasheOut() {
  const client = useQueryClient();
  return useMutation(postCacheOut, {
    onSuccess: () => {
      client.invalidateQueries('wallet');
      client.invalidateQueries('company');
    },
  });
}
