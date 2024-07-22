import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Box } from 'native-base';
import { ArrowCircleLeft } from 'phosphor-react-native';

import { cor } from '@/styles/cor';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';

export function HeadeInvit(props: any) {
  const nav = useNavigation();
  return (
    <S.Container>
      <TouchableOpacity onPress={() => nav.goBack()}>
        <ArrowCircleLeft weight="duotone" size={35} color={cor.focus.a} />
      </TouchableOpacity>

      <Box style={{ gap: 5 }}>
        <S.text>Saldo Cashback</S.text>
        <S.boxCache>
          <S.title>R$ 10,00</S.title>
        </S.boxCache>
      </Box>
    </S.Container>
  );
}
