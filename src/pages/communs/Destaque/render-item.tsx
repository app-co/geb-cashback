import React from 'react';

import { Image, VStack } from 'native-base';

import { IRecordsCompany } from '@/hooks/fetchs/interfaces';
import { cor } from '@/styles/cor';
import { _subtitle, _width, hightPercent } from '@/styles/sizes';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';

interface I {
  item: IRecordsCompany;
}

export function RenderIdem({ item }: I) {
  const navigation = useNavigation();
  return (
    <S.box
      onPress={() =>
        navigation.navigate('transactions', { providerId: item.id })
      }
    >
      <Image
        alt="img"
        h={hightPercent('15')}
        w={_width * 0.5}
        source={{ uri: item?.logo }}
      />
      <VStack>
        <S.title>{item.name}</S.title>

        <S.title
          style={{
            color: cor.focus.a,
            fontFamily: 'Black',
            fontSize: _subtitle,
          }}
        >
          {item.casheback}% casheback
        </S.title>
      </VStack>
    </S.box>
  );
}
