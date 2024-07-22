/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';

import { cor } from '@/styles/cor';

import * as S from './styles';

interface IProps extends TouchableOpacityProps {
  title?: string;
  load?: boolean;
  styleType?: 'solid' | 'transpale' | 'border';
  bg_color?: string;
  txt_color?: string;
}

export function Button({
  title = 'SALVAR',
  load,
  styleType = 'solid',
  bg_color = cor.button_bg_color.a,
  txt_color = cor.text.black,
  ...rest
}: IProps) {
  return (
    <S.Container
      styleType={styleType}
      color={bg_color}
      disabled={load}
      {...rest}
    >
      {load ? (
        <ActivityIndicator color={cor.text.light} size={36} />
      ) : (
        <S.title styleType={styleType} color={txt_color}>
          {title}
        </S.title>
      )}
    </S.Container>
  );
}
