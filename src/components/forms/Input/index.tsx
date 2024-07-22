/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TextInputProps } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { Box } from 'native-base';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';

import * as S from './styles';

export interface TypeInput extends TextInputProps {
  icon?: React.ComponentProps<typeof Feather>['name'];
  label: string;
  error?: string;
}

export function Input({ value, error, label, icon, ...rest }: TypeInput) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isFiled, setIsFiled] = React.useState(false);

  const handleFocus = React.useCallback(async () => {
    setIsFocused(true);
  }, []);

  // 462.773.130-29

  const handleBlur = React.useCallback(async () => {
    setIsFocused(false);
    setIsFiled(!!value);
  }, [value]);

  return (
    <Box w="full">
      {error ? (
        <S.title style={{ color: '#ff0000', fontFamily: font.regular }}>
          {error}
        </S.title>
      ) : (
        <S.title>{label}</S.title>
      )}
      <S.Container focus={isFocused} filed={isFiled} error={!!error}>
        <S.input
          value={value}
          onBlur={handleBlur}
          onFocus={handleFocus}
          cursorColor={cor.text.lightSoft}
          placeholderTextColor={cor.text.lightSoft}
          {...rest}
        />

        {icon && (
          <S.boxIcon>
            <Feather
              name={icon}
              size={25}
              color={isFiled || isFocused ? cor.focus.a : cor.bgcolor}
            />
          </S.boxIcon>
        )}
      </S.Container>
    </Box>
  );
}
