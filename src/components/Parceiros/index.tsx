import React from 'react';

import { Image } from 'expo-image';

import parceiro from '@/assets/parceiros.jpeg';

import * as S from './styles';

export function Parceiros() {
  return (
    <S.Container>
      <Image style={{ width: '100%', height: '100%' }} source={parceiro} />
    </S.Container>
  );
}
