/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { VStack } from 'native-base';

import { FormInput } from '@/components/forms/FormInput';

import * as S from './styles';

interface I {
  error: any;
  control: any;
}

export function A({ error, control }: I) {
  return (
    <S.Container>
      <S.main>
        <S.subtitle>
          Finalize seu cadastro e faça parte do maior grupo de empresas do
          Brasil
        </S.subtitle>

        <VStack mt="8" space={4}>
          <FormInput
            label="Nome"
            error={error?.name}
            name="name"
            keyboardType="email-address"
            autoCapitalize="none"
            control={control}
            icon="user"
            placeholder="Nome completo"
          />

          <FormInput
            label="E-mail"
            error={error?.email}
            name="email"
            keyboardType="email-address"
            autoCapitalize="none"
            control={control}
            icon="mail"
            placeholder="Seu email"
          />

          <FormInput
            label="Senha"
            error={error?.password}
            name="password"
            autoCapitalize="none"
            control={control}
            icon="lock"
            placeholder="Sua senha"
          />

          <FormInput
            label="Confirme sua senha"
            error={error?.confirmation_pass}
            name="confirmation_pass"
            autoCapitalize="none"
            control={control}
            icon="lock"
            placeholder=""
          />
        </VStack>
      </S.main>
    </S.Container>
  );
}
