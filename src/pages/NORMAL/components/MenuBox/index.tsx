import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Center, HStack, ScrollView } from 'native-base';
import {
  ClipboardText,
  Heart,
  QrCode,
  Storefront,
  User,
} from 'phosphor-react-native';

import { canvaPercent } from '@/styles/sizes';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';

interface I {
  presLoja: () => void;
  presProvider: () => void;
  presFavorito: () => void;
  presBuy: () => void;
  presExtrato: () => void;
}

export function MenuBox({
  presBuy,
  presExtrato,
  presFavorito,
  presLoja,
  presProvider,
}: I) {
  const navigation = useNavigation();
  return (
    <S.Container>
      <ScrollView horizontal>
        <HStack space={4}>
          <TouchableOpacity onPress={presLoja}>
            <Center>
              <S.box>
                <Storefront
                  weight="duotone"
                  size={`${canvaPercent('4.3')}px`}
                />
              </S.box>
              <S.title>Lojas</S.title>
            </Center>
          </TouchableOpacity>

          <TouchableOpacity onPress={presProvider}>
            <Center>
              <S.box>
                <User weight="duotone" size={`${canvaPercent('4.3')}px`} />
              </S.box>
              <S.title>Profissionais</S.title>
            </Center>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('favoritos')}>
            <Center>
              <S.box>
                <Heart weight="duotone" size={`${canvaPercent('4.3')}px`} />
              </S.box>
              <S.title>Favoritos</S.title>
            </Center>
          </TouchableOpacity>

          <TouchableOpacity onPress={presBuy}>
            <Center>
              <S.box>
                <QrCode weight="duotone" size={`${canvaPercent('4.3')}px`} />
              </S.box>
              <S.title>Comprar</S.title>
            </Center>
          </TouchableOpacity>

          <TouchableOpacity onPress={presExtrato}>
            <Center>
              <S.box>
                <ClipboardText
                  weight="duotone"
                  size={`${canvaPercent('4.3')}px`}
                />
              </S.box>
              <S.title>Extrato</S.title>
            </Center>
          </TouchableOpacity>
        </HStack>
      </ScrollView>
    </S.Container>
  );
}
