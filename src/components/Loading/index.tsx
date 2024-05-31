import React from 'react';

import loti from '@/assets/config.json';

import * as S from './styles';

export function Loading() {
  return (
    <S.Container>
      <S.box>
        <S.loti speed={0.6} autoPlay source={loti} />
      </S.box>
      <S.title>SINCRONIZANDO SEUS DADOS ...</S.title>
    </S.Container>
  );
}
