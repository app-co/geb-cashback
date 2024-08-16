import { useMutation } from 'react-query';

import { postCacheOut } from './fetchs';

export function useCasheOut() {
  return useMutation(postCacheOut);
}
