import { useMutation } from 'react-query';

import { postPayWithCard, postPayWithPix, postSaveCard } from './fetch';

export function usePagamento() {
  const payCard = useMutation(postPayWithCard);
  const payPix = useMutation(postPayWithPix);
  const saveCard = useMutation(postSaveCard);

  return { payCard, payPix, saveCard };
}
