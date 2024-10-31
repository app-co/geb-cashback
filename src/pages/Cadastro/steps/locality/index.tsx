import React from 'react';

import axios from 'axios';
import { Box, HStack, VStack } from 'native-base';

import { FormInput } from '@/components/forms/FormInput';

import * as S from './styles';

export interface ICep {
  cep: string;
  city: string;
  neighborhood: string;
  service: string;
  state: string;
  street: string;
}

interface I {
  error: any;
  control: any;
  cep: string;
  getCep: (h: ICep) => void;
}

export function Locality({ error, cep, control, getCep }: I) {
  // const [cep, setCep] = React.useState('');

  async function get() {
    const { data } = await axios.get(
      `https://brasilapi.com.br/api/cep/v1/${cep}`,
    );
    getCep(data);
  }

  React.useEffect(() => {
    if (cep && cep.length === 8) {
      get();
    }
  }, [cep]);

  return (
    <S.Container>
      <S.main>
        <S.subtitle>
          Finalize seu cadastro e faça parte do maior grupo de empresas do
          Brasil
        </S.subtitle>

        <VStack mt="8" space={4}>
          <FormInput
            label="CEP"
            error={error.postal_code}
            name="postal_code"
            keyboardType="numeric"
            control={control}
            placeholder="CEP"
            maxLength={8}
          />

          <HStack space={2} alignItems="center">
            <Box flex="1">
              <FormInput
                label="Cidade"
                error={error.city}
                name="city"
                autoCapitalize="none"
                control={control}
                placeholder="Cidade"
              />
            </Box>

            <Box w="80px">
              <FormInput
                label="UF"
                error={error.region_code}
                name="region_code"
                autoCapitalize="characters"
                control={control}
                placeholder="UF"
              />
            </Box>
          </HStack>

          <FormInput
            label="Complemento"
            error={error.complement}
            name="complement"
            autoCapitalize="none"
            control={control}
            icon="lock"
            placeholder="complemento"
          />

          <HStack space={2} alignItems="center">
            <Box flex="1">
              <FormInput
                label="Rua"
                error={error.street}
                name="street"
                autoCapitalize="none"
                control={control}
                placeholder="Rua"
              />
            </Box>

            <Box w="80px">
              <FormInput
                label="Nº"
                error={error.number}
                name="number"
                keyboardType="numeric"
                control={control}
                placeholder="número"
              />
            </Box>
          </HStack>
        </VStack>
      </S.main>
    </S.Container>
  );
}
