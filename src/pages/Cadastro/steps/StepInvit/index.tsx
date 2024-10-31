import React from 'react';

import { FormInput } from '@/components/forms/FormInput';

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
        <FormInput name="codigoInvit" control={control} label="Código" />
      </S.box>
    </S.Container>
  );
}
