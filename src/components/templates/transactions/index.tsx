/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-bind */
import React, { useRef } from 'react';
import { ScrollView } from 'react-native';

import { Box, HStack } from 'native-base';

import { useAuth } from '@/context/auth';
import { useUserWallet } from '@/hooks/querys';
import { cor } from '@/styles/cor';
import { _toCurrency } from '@/utils/unidades';
import { useRoute } from '@react-navigation/native';

import { Card } from './orders/cartao';
import { Money } from './orders/money';
import { Pix } from './orders/pix';
import * as S from './styles';

type TPaymentType = 'pix' | 'card' | 'money';

export function Transactions() {
  const { user, updateUser } = useAuth();
  const scrollRef = useRef<ScrollView>(null);
  const { data: wallet } = useUserWallet();

  const { providerId } = useRoute().params as { providerId: string };

  const [selectedTypePayment, setSelectTypePayment] =
    React.useState<TPaymentType>('pix');

  const casheback = _toCurrency(wallet?.amount_cashback ?? 0);

  const components = {
    pix: (
      <Pix
        setPaymentType={h => setSelectTypePayment(h)}
        paymentType={selectedTypePayment}
        providerId={providerId}
      />
    ),
    card: (
      <Card
        setPaymentType={h => setSelectTypePayment(h)}
        paymentType={selectedTypePayment}
        providerId={providerId}
        ref={() => {
          scrollRef.current?.scrollTo({
            animated: true,
            x: 0,
          });
        }}
      />
    ),
    money: (
      <Money
        setPaymentType={h => setSelectTypePayment(h)}
        paymentType={selectedTypePayment}
        providerId={providerId}
      />
    ),
  };

  return (
    <S.container>
      <HStack justifyContent="space-between">
        <Box style={{ gap: 8 }}>
          <S.text>Empresa</S.text>
          <S.title>{/* {data?.name} - {data?.segmento} */}</S.title>
        </Box>
        <Box style={{ gap: 8 }}>
          <S.text>Meu Cachback</S.text>
          <S.boxCache>
            <S.title style={{ color: cor.text.black }}>{casheback}</S.title>
          </S.boxCache>
        </Box>
      </HStack>

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {components[selectedTypePayment]}
      </ScrollView>
    </S.container>
  );
}
