/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { useForm } from 'react-hook-form';
import { Image, TouchableOpacity } from 'react-native';

import * as Clipboard from 'expo-clipboard';

import { Box, Center, HStack, ScrollView, useToast } from 'native-base';

import { Button } from '@/components/forms/Button';
import { FormInput } from '@/components/forms/FormInput';
import Toast from '@/components/modals/toast/handler';
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

export function Pix({ providerId, setPaymentType, paymentType }: I) {
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
        // Toast.show({
        //   title: 'Erro!',
        //   description: 'Texto copiado com sucesso.',
        //   tipo: 'error',
        // });
      }
    }
  }

  async function qrCodeCopy() {
    await Clipboard.setStringAsync(imageQrcode!.text);
    Toast.show({
      description: 'Texto copiado com sucesso.',
      title: 'Sucesso!',
      tipo: 'success',
    });
  }

  return (
    <Box>
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

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <S.content>
          <Center style={{ gap: 10 }}>
            <Image
              source={{ uri: imageQrcode?.img }}
              resizeMode="cover"
              width={150}
              height={150}
            />

            {imageQrcode?.img ? (
              <TouchableOpacity onPress={qrCodeCopy}>
                <S.title>Qrcode copia e cola</S.title>
              </TouchableOpacity>
            ) : (
              <Button
                onPress={handleSubmit(cashInPix)}
                title="Gerar Qrcode"
                load={payPix.isLoading}
              />
            )}
          </Center>
        </S.content>
      </ScrollView>
    </Box>
  );
}
