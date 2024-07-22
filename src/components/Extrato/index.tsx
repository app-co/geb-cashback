import React from 'react';

import { Box, Circle, HStack } from 'native-base';
import { Calendar, Clock, Users } from 'phosphor-react-native';

import { font } from '@/styles/fonts';

import * as S from './styles';

export function Extrato() {
  return (
    <S.Container>
      <HStack mb={4} alignItems="center" space={2}>
        <Calendar size={25} color="#838383" weight="duotone" />
        <Circle size="40px" bg="gray.700">
          <S.title>1</S.title>
        </Circle>
      </HStack>

      <S.body>
        <S.content>
          <Box>
            <HStack alignItems="center" space={1}>
              <Clock color="#838383" size={20} />
              <S.text>10:00 hs</S.text>
            </HStack>
            <HStack space={1}>
              <Users size={20} color="#838383" />
              <S.title style={{ fontFamily: font.regular }}>
                ****** Barbosa
              </S.title>
            </HStack>
          </Box>
          <S.title>R$ 0,50</S.title>
        </S.content>

        <S.line />

        <S.content>
          <Box>
            <HStack alignItems="center" space={1}>
              <Clock color="#838383" size={20} />
              <S.text>10:00</S.text>
            </HStack>
            <HStack space={1}>
              <Users size={20} color="#838383" />
              <S.title style={{ fontFamily: font.regular }}>
                ******** Barbosa
              </S.title>
            </HStack>
          </Box>
          <S.title>R$ 0,50</S.title>
        </S.content>
      </S.body>
    </S.Container>
  );
}
