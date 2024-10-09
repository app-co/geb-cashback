import { useMutation, useQueryClient } from 'react-query';

import { postPayWithCard, postPayWithPix, postSaveCard } from './fetch';

export function usePagamento() {
  const client = useQueryClient();
  const payCard = useMutation(postPayWithCard, {
    onSuccess: () => client.invalidateQueries('wallet'),
  });
  const payPix = useMutation(postPayWithPix, {
    onSuccess: () => client.invalidateQueries('wallet'),
  });
  const saveCard = useMutation(postSaveCard, {
    onSuccess: () => client.invalidateQueries('wallet'),
  });

  return { payCard, payPix, saveCard };
}
