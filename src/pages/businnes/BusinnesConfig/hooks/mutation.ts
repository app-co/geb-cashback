import { useMutation, useQueryClient } from 'react-query';

import Toast from '@/components/modals/toast/handler';

import { fetchs } from './fetchs';

export function useRegisterCompany() {
  const client = useQueryClient();
  return useMutation(fetchs.registerCompay, {
    onSuccess: () => {
      client.invalidateQueries('company');
      Toast.show({
        title: 'Sucesso!',
        description: 'Sua empresa foi cadastrada com sucesso!',
        tipo: 'success',
      });
    },
  });
}

export function useRegisterSocialMida() {
  const client = useQueryClient();
  return useMutation(fetchs.registerSocialMida, {
    onSuccess: () => {
      client.invalidateQueries('company');
      Toast.show({
        title: 'Sucesso!',
        description: 'Sua rede social foi cadastrada com sucesso!',
        tipo: 'success',
      });
    },
  });
}
