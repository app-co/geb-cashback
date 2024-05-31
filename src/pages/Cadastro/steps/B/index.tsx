import React from 'react';

import { VStack } from 'native-base';

import { FormInput } from '@/components/forms/FormInput';

import * as S from './styles';

interface I {
  error: any;
  control: any;
}

export function B({ error, control }: I) {
  return (
    <S.Container>
      <S.main>
        <S.subtitle>
          Finalize seu cadastro e faça parte do maior grupo de empresas do
          Brasil
        </S.subtitle>

        <VStack mt="8" space={4}>
          <FormInput
            label="CPF/RG"
            error={error.document}
            name="document"
            autoCapitalize="none"
            keyboardType="numeric"
            control={control}
            placeholder="Seu CPF/RG"
          />

          <FormInput
            label="WhattsApp"
            error={error.contato}
            name="contato"
            keyboardType="numeric"
            control={control}
            placeholder="Seu número de WhattsApp"
          />

          <FormInput
            label="Dt. de nascimento"
            error={error.born}
            name="born"
            autoCapitalize="none"
            control={control}
            icon="lock"
            placeholder="dd/MM/ano"
          />

          <FormInput
            label="Sua profissão"
            error={error.profission}
            name="profission"
            autoCapitalize="none"
            control={control}
            icon="lock"
            placeholder="Nome da sua profição"
          />
        </VStack>
      </S.main>
    </S.Container>
  );
}
