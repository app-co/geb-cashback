import { useQuery } from 'react-query';

import { getBusinesById } from './fetch';

export function useBusinnessById(id: string) {
  return useQuery('bussins', () => getBusinesById(id));
}
