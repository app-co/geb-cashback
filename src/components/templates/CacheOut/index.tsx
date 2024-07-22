import React from 'react';
import { useForm } from 'react-hook-form';

import { Box, VStack } from 'native-base';

import { Button } from '@/components/forms/Button';
import { FormInput } from '@/components/forms/FormInput';
import { useAuth } from '@/context/auth';
import { cor } from '@/styles/cor';

import * as S from './styles';

export function CacheOut() {
  const { user } = useAuth();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <S.Container>
      <VStack p={4} space={4}>
        <Box
          p={2}
          borderWidth={1}
          borderColor={cor.focus.a}
          style={{ gap: 4 }}
          rounded={4}
        >
          <S.title>Atenção</S.title>
          <S.text style={{ fontFamily: 'trin' }}>
            Saque mínimo de R$ 100,00
          </S.text>
          <S.text style={{ fontFamily: 'trin' }}>
            A transferencia será realizada via pix. A chave informada é de sua
            total responsabilidade.
          </S.text>
        </Box>
        <Box mt={8}>
          <S.text>Saldo para saque</S.text>
          <S.title>R$ 10,00</S.title>
        </Box>

        <FormInput
          control={control}
          error={errors}
          name="value"
          label="Valor de saque"
          placeholder="Digite quanto você deseja sacar"
        />

        <Button title="Sacar" />
      </VStack>
    </S.Container>
  );
}
