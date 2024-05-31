import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Avatar, Box, HStack } from 'native-base';
import { SignOut } from 'phosphor-react-native';

import { useAuth } from '@/context/auth';
import { cor } from '@/styles/cor';
import { widtPercent } from '@/styles/sizes';

import * as S from './styles';

export function Header() {
  const { user, logOut } = useAuth();
  return (
    <S.Container>
      <HStack space={4}>
        <Avatar size={`${widtPercent('7')}px`} />

        <Box>
          <S.title>Olá</S.title>
          <S.text>{user.name}</S.text>
        </Box>
      </HStack>

      <TouchableOpacity onPress={() => logOut()}>
        <SignOut
          size={`${widtPercent('4')}px`}
          color={cor.focus.a}
          weight="duotone"
        />
      </TouchableOpacity>
    </S.Container>
  );
}
