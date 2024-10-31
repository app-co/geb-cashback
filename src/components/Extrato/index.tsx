import React from 'react';

import { Box, HStack } from 'native-base';
import { User } from 'phosphor-react-native';

import { ITRansactionByInvit } from '@/hooks/fetchs/interfaces';
import { font } from '@/styles/fonts';
import { _toCurrency } from '@/utils/unidades';

import * as S from './styles';

interface I {
  item: ITRansactionByInvit;
}

export function Extrato({ item }: I) {
  const transaction = item?.transacoes ?? [];

  const cp: { [key: number]: string } = {
    0: 'Primeira compra',
    1: 'Compra do segundo produto',
    2: 'Compra do terceiro produto',
  };

  return (
    <S.Container>
      <HStack mb={4} alignItems="center" space={2}>
        <User size={25} color="#838383" weight="duotone" />
        <S.title>{item?.name}</S.title>
      </HStack>

      {transaction.map((h, i) => (
        <S.body>
          <S.content>
            <Box>
              <HStack alignItems="center" space={1}>
                <S.title style={{ fontFamily: font.regular }}>{cp[i]}</S.title>
              </HStack>
            </Box>
            <S.title>{_toCurrency(h)}</S.title>
          </S.content>

          <S.line />
        </S.body>
      ))}
    </S.Container>
  );
}
