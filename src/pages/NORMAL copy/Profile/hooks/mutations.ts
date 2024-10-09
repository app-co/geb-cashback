import { useMutation } from 'react-query';

import { Fetch } from './fetchs';

const fetch = new Fetch();

export function useUpdates() {
  const upUser = useMutation(fetch.updateUser);
  const upLocality = useMutation(fetch.updateLocality);
  const upProfile = useMutation(fetch.updateProfile);
  const upCardToken = useMutation(fetch.updateCardToken);
  return { upUser, upLocality, upProfile, upCardToken };
}
