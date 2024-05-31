import React from 'react';

import { Header } from '@/components/Header';
import { Providers } from '@/components/Providers';

import * as S from './styles';

export function Prestadores() {
  return (
    <>
      <Header />

      <S.Container>
        <Providers />
      </S.Container>
    </>
  );
}
