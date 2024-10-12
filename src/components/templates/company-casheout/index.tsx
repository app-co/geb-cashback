import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';

import { Box, VStack } from 'native-base';

import { Button } from '@/components/forms/Button';
import { FormInput } from '@/components/forms/FormInput';
import SucessHandler from '@/components/modals/sucess/handler';
import { useAuth } from '@/context/auth';
import { cor } from '@/styles/cor';
import { _toCurrency } from '@/utils/unidades';
import { zodResolver } from '@hookform/resolvers/zod';

import { schemaCasheOut } from './hooks/dto/forms/schema';
import { TFormCasheOut } from './hooks/dto/forms/types';
import { useCasheOut } from './hooks/mutation';
import * as S from './styles';

export function ComapanyCasheout() {
  const { user, updateUser } = useAuth();
  const { mutateAsync, isLoading } = useCasheOut();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TFormCasheOut>({
    resolver: zodResolver(schemaCasheOut),
    defaultValues: {
      userId: user.id,
    },
  });

  const submit = React.useCallback(async (obj: TFormCasheOut) => {
    await mutateAsync(obj);

    SucessHandler.message({
      title: 'Solicitação realizada',
      description: 'Sua solicitação de saque foi realizada com sucesso.',
      tipo: 'success',
    });
  }, []);

  return (
    <S.Container>
      <ScrollView>
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
              Saque mínimo de R$ 500,00
            </S.text>
            <S.text style={{ fontFamily: 'trin' }}>
              A transferencia será realizada via pix. A chave informada é de sua
              total responsabilidade.
            </S.text>
          </Box>
          <Box mt={8}>
            <S.text>Saldo para saque</S.text>
            <S.title>{_toCurrency(user!.wallet.amount_cashback)}</S.title>
          </Box>

          <FormInput
            control={control}
            mask="money"
            keyboardType="numeric"
            error={errors.value}
            name="value"
            label="Valor de saque"
            placeholder="Digite quanto você deseja sacar"
            disabled={Number(user?.wallet?.amount_cashback) < 100}
          />

          <FormInput
            control={control}
            error={errors.keyPix}
            name="keyPix"
            label="Chave Pix"
            placeholder="Digite sua cheve pix"
          />

          <Button
            load={isLoading}
            onPress={handleSubmit(submit)}
            title="Sacar"
          />
        </VStack>
      </ScrollView>
    </S.Container>
  );
}
