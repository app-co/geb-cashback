import { useQuery } from 'react-query';

import { fetchs } from './fetchs';

export function useCompanyById() {
  return useQuery('company', fetchs.getCompanyById);
}

export function useSocialMida() {
  return useQuery('company', fetchs.getCompanyById);
}
