import React from 'react';

import { HStack } from 'native-base';

import * as S from './styles';

interface I {
  title: string;
  pres: () => void;
  selected: boolean;
}

export function Select({ title, selected, pres }: I) {
  return (
    <S.Container onPress={pres}>
      <HStack alignItems="center" space={4}>
        <S.circle>
          <S.dote selectd={selected} />
        </S.circle>
        <S.title>{title}</S.title>
      </HStack>
    </S.Container>
  );
}
