import React from 'react';

import { VStack } from 'native-base';

import { FormInput } from '@/components/forms/FormInput';

import * as S from './styles';

interface I {
  control: any;
  error: any;
}

export function ComponentFormProfile({ control, error }: I) {
  return (
    <S.Container>
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
    </S.Container>
  );
}
