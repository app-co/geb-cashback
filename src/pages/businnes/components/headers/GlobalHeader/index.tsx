import React from 'react';
import { TouchableOpacity } from 'react-native';

import { HStack, Text } from 'native-base';
import { ArrowCircleLeft } from 'phosphor-react-native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _subtitle } from '@/styles/sizes';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';

export function GlobalHeader(props: any) {
  const nav = useNavigation();
  return (
    <S.Container>
      <HStack alignItems="center" space={4}>
        <TouchableOpacity style={{ padding: 2 }} onPress={() => nav.goBack()}>
          <ArrowCircleLeft weight="duotone" color={cor.focus.a} size={35} />
        </TouchableOpacity>
        <Text
          fontFamily={font.regular}
          fontSize={_subtitle + 3}
          color={cor.text.light}
        >
          {props.options.title}
        </Text>
      </HStack>
    </S.Container>
  );
}
