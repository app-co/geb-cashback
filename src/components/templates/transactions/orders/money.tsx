/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { useForm } from 'react-hook-form';
import { Alert, TouchableOpacity } from 'react-native';

import * as Clipboard from 'expo-clipboard';

import { Box, Center, HStack, useToast } from 'native-base';

import { Button } from '@/components/forms/Button';
import { FormInput } from '@/components/forms/FormInput';
import { useAuth } from '@/context/auth';
import { AppError } from '@/services/AppError';
import { zodResolver } from '@hookform/resolvers/zod';

import { TschemaPix } from '../hooks/dto/types';
import { usePagamento } from '../hooks/mutations';
import { schemaObjectPaymet } from '../hooks/schemas';
import * as S from '../styles';

interface I {
  providerId: string;
  setPaymentType: (paymentType: string) => void;
  paymentType: 'card' | 'pix' | 'money';
}

export function Money({ providerId, setPaymentType, paymentType }: I) {
  const { user, updateUser } = useAuth();
  const { payPix } = usePagamento();

  const toast = useToast();
  const [imageQrcode, setImageQrcode] = React.useState<{
    img: string;
    text: string;
  }>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TschemaPix>({
    resolver: zodResolver(schemaObjectPaymet),
    defaultValues: {
      userId: user.id,
      companyId: providerId,
      cachebakCliente: '0',
    },
  });

  async function cashInPix(obj: TschemaPix) {
    const dt = {
      ...obj,
      companyId: providerId,
      paymentType: 'pix' as 'pix' | 'card' | 'money',
    };

    try {
      const pay = await payPix.mutateAsync(dt);
      setImageQrcode({
        img: pay.imgQrcode,
        text: pay.text,
      });
      updateUser();
    } catch (error) {
      if (error instanceof AppError) {
        toast.show({
          title: 'Erro ao salvar',
          description: error.message,
          placement: 'top',
          bg: 'red.500',
        });
      }
    }
  }

  async function qrCodeCopy() {
    await Clipboard.setStringAsync(imageQrcode!.text);
    Alert.alert('Texto copiado');
  }

  return (
    <Box>
      <S.content>
        <Center mt={2}>
          <S.title>Abater com</S.title>
        </Center>
        <HStack alignItems="center" justifyContent="space-evenly">
          <TouchableOpacity
            onPress={() => {
              setPaymentType('pix');
            }}
          >
            <S.boxTypePayment selected={paymentType === 'pix'}>
              <S.textTypePyament select={paymentType === 'pix'}>
                PIX
              </S.textTypePyament>
            </S.boxTypePayment>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPaymentType('card');
            }}
          >
            <S.boxTypePayment selected={paymentType === 'card'}>
              <S.textTypePyament select={paymentType === 'card'}>
                CARTÃO
              </S.textTypePyament>
            </S.boxTypePayment>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPaymentType('money')}>
            <S.boxTypePayment selected={paymentType === 'money'}>
              <S.textTypePyament select={paymentType === 'money'}>
                DINHEIRO
              </S.textTypePyament>
            </S.boxTypePayment>
          </TouchableOpacity>
        </HStack>
      </S.content>

      <S.content>
        <FormInput
          mask="money"
          label="Valor da compra"
          control={control}
          name="value"
          error={errors.value}
          keyboardType="numeric"
          placeholder="Digite o valor total da sua compra"
        />

        <FormInput
          mask="money"
          label="Pagar com Cashback"
          control={control}
          error={errors.cachebakCliente}
          keyboardType="numeric"
          name="cachebakCliente"
          placeholder="Digite quanto você irá utilizar do seu cachback"
        />
      </S.content>

      <S.content>
        <S.title>
          Após o pagamento do seu produto, clique em finalizar a compra para
          validar seu cacheback
        </S.title>

        <Button
          onPress={handleSubmit(cashInPix)}
          title="Gerar Qrcode"
          load={payPix.isLoading}
        />
      </S.content>
    </Box>
  );
}
