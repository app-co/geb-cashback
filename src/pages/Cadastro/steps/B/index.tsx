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
            label="CPF"
            mask="cpf"
            error={error.document}
            name="document"
            autoCapitalize="none"
            keyboardType="numeric"
            control={control}
            placeholder="Seu CPF"
            maxLength={14}
          />

          <FormInput
            label="WhattsApp"
            error={error.contato}
            name="contato"
            keyboardType="numeric"
            control={control}
            placeholder="Seu número de WhattsApp"
            mask="cell-phone"
            maxLength={15}
          />

          <FormInput
            label="Dt. de nascimento"
            error={error.born}
            name="born"
            keyboardType="numeric"
            autoCapitalize="none"
            control={control}
            icon="lock"
            placeholder="dd/mm/yyyy"
            mask="date"
            maxLength={10}
          />

          <FormInput
            label="Sua profissão"
            error={error.profission}
            name="profission"
            autoCapitalize="none"
            control={control}
            icon="lock"
            placeholder="Nome da sua profissão"
          />
        </VStack>
      </S.main>
    </S.Container>
  );
}
