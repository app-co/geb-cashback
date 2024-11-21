import React from 'react';

import { InputForm } from '@/components/forms/InputForm';
import { cor } from '@/styles/cor';

import * as S from './styles';

interface I {
  control: any;
}

export function StepInvit({ control }: I) {
  return (
    <S.Container>
      <S.box>
        <S.title>
          Digite o código de convite para participar das promoções
        </S.title>
        <InputForm
          name="codigoInvit"
          control={control}
          render={() => <S.input cursorColor={cor.text.lightSoft} />}
        />
      </S.box>
    </S.Container>
  );
}
