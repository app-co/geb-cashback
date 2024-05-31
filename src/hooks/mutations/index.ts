import { useMutation, useQueryClient } from 'react-query';

import { Fetch } from '../fetchs';

const fetch = new Fetch();
export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation(fetch.signIn);
}
