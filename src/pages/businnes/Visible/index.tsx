/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import loti from '@/assets/ideia.json';
import { Button } from '@/components/forms/Button';
import { cor } from '@/styles/cor';
import { _subtitle } from '@/styles/sizes';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';

export function Visible() {
  const navigation = useNavigation();
  return (
    <S.Container>
      <S.loti speed={0.6} autoPlay source={loti} />
      <S.title>"Quem não é visto, não é lembrado"</S.title>
      <S.title
        style={{
          fontSize: _subtitle + 2,
          fontFamily: 'trin',
          color: cor.text.light,
        }}
      >
        Configure sua empresa para que as pessoas possam fazer negócios com você
        .
      </S.title>

      <Button
        title="Configurar agora"
        onPress={() => navigation.navigate('businnesConfig')}
      />
    </S.Container>
  );
}
