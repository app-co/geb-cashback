import React from 'react';
import { FlatList } from 'react-native';

import { Box, Circle, HStack } from 'native-base';
import { Calendar, Clock, Users } from 'phosphor-react-native';

import { font } from '@/styles/fonts';
import { _toCurrency } from '@/utils/unidades';

import { IRecordsTransactions } from '../../hooks/dto/interfaces';
import * as S from './styles';

interface I {
  item: IRecordsTransactions;
}

export function RenderItem({ item }: I) {
  return (
    <S.Container>
      <HStack mb={4} alignItems="center" space={2}>
        <Calendar size={25} color="#838383" weight="duotone" />
        <Circle size="40px" bg="gray.700">
          <S.title>{item.dia}</S.title>
        </Circle>
      </HStack>

      <FlatList
        data={item.transaction}
        keyExtractor={(h, i) => String(i)}
        renderItem={({ item: h }) => (
          <S.body>
            <S.content>
              <Box>
                <HStack alignItems="center" space={1}>
                  <Clock color="#838383" size={20} />
                  <S.text>{h.hora} hs</S.text>
                </HStack>
                <HStack space={1}>
                  <Users size={20} color="#838383" />
                  <S.title style={{ fontFamily: font.regular }}>
                    {h.company}
                  </S.title>
                </HStack>
              </Box>
              <S.title>{_toCurrency(h.valor)}</S.title>
            </S.content>

            <S.line />
          </S.body>
        )}
      />
    </S.Container>
  );
}
