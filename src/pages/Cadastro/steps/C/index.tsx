import React from 'react';

import { Box, VStack } from 'native-base';

import { FormInput } from '@/components/forms/FormInput';

import * as S from './styles';

interface I {
  error: any;
  control: any;
}

export function C({ error, control }: I) {
  return (
    <S.Container>
      <S.main>
        <S.subtitle>
          Finalize seu cadastro e faça parte do maior grupo de empresas do
          Brasil
        </S.subtitle>

        <VStack mt="8" space={4}>
          <Box>
            <FormInput
              label="Chave Pix"
              error={error.key_pix}
              name="key_pix"
              control={control}
              keyboardType="numeric"
              icon="user"
              placeholder="Digite sua chave pix"
            />
          </Box>
          <FormInput
            label="Agência"
            error={error.ag}
            name="ag"
            control={control}
            keyboardType="numeric"
            icon="user"
            placeholder="Numbero da Agência"
          />

          <FormInput
            label="Conta"
            keyboardType="numeric"
            error={error.conta}
            name="email"
            autoCapitalize="none"
            control={control}
            icon="user"
            placeholder="Número da sua conta"
          />
        </VStack>
      </S.main>
    </S.Container>
  );
}
