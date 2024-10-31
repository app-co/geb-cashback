/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';

import * as Clipboard from 'expo-clipboard';
import * as Sharing from 'expo-sharing';

import { Box, Center, Circle, HStack } from 'native-base';
import {
  CaretRight,
  Folders,
  LockKey,
  RocketLaunch,
} from 'phosphor-react-native';

import { Button } from '@/components/forms/Button';
import { Line } from '@/components/Line';
import { useInvit } from '@/hooks/querys';
import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _text, hightPercent, widtPercent } from '@/styles/sizes';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';

export function Invit() {
  const nav = useNavigation();

  const { data: invit } = useInvit();

  async function copTextInvit() {
    await Clipboard.setStringAsync(invit?.codigo);
    Alert.alert('Texto copiado');
  }

  async function shareTextInvit() {
    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert(
        'Erro',
        'Compartilhamento não está disponível no seu dispositivo',
      );
      return;
    }

    await Sharing.shareAsync(invit?.codigo);
  }

  return (
    <S.Container>
      <S.content>
        <S.body style={{ marginBottom: hightPercent('5') }}>
          <HStack
            mb={hightPercent('3')}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box w={widtPercent('15')}>
              <S.title>Convide amigos para ganhar cashback</S.title>
            </Box>

            <RocketLaunch size={80} />
          </HStack>
          <Button
            title="CONVIDAR"
            bg_color={cor.bgcolor}
            txt_color={cor.text.light}
          />

          <TouchableOpacity onPress={copTextInvit}>
            <HStack alignSelf="center" space={3} alignItems="center">
              <S.text>
                Código do convite: <S.title>{invit?.codigo}</S.title>
              </S.text>
              <Folders weight="duotone" />
            </HStack>
          </TouchableOpacity>
        </S.body>

        <Line />

        <S.body style={{ marginTop: 30 }}>
          <S.title>Como ganhar cashback?</S.title>

          <HStack space={1} alignItems="flex-start" pr={3}>
            <S.title>1.</S.title>
            <S.text style={{ fontFamily: font.regular }}>
              Seu amigo se conecta ao GEB e se insere seu código de convite.
            </S.text>
          </HStack>
          <HStack space={1} alignItems="flex-start" pr={3}>
            <S.title>2.</S.title>
            <S.text style={{ fontFamily: font.regular }}>
              Ele(a) compra e você ganha cashback nas 3 primeiras compras
            </S.text>
          </HStack>

          <Box mt={8}>
            <Box
              left={widtPercent('4')}
              w={widtPercent('30')}
              position="absolute"
            >
              <Line />
            </Box>
            <HStack
              mt={-5}
              w={widtPercent('32')}
              alignSelf="center"
              justifyContent="space-between"
            >
              <Center style={{ gap: 8 }}>
                <Circle p={2} bg="gray.300">
                  <LockKey weight="duotone" />
                </Circle>
                <S.title style={{ fontSize: _text }}>+ R$ 1,00</S.title>
              </Center>
              <Center style={{ gap: 8 }}>
                <Circle p={2} bg="gray.300">
                  <LockKey weight="duotone" />
                </Circle>
                <S.title style={{ fontSize: _text }}>+ R$ 2,00</S.title>
              </Center>
              <Center style={{ gap: 8 }}>
                <Circle p={2} bg="gray.300">
                  <LockKey weight="duotone" />
                </Circle>
                <S.title style={{ fontSize: _text }}>+ R$ 4,00</S.title>
              </Center>
            </HStack>
          </Box>
        </S.body>

        <TouchableOpacity
          onPress={() => nav.navigate('rewards', { codigo: invit?.codigo })}
        >
          <HStack mt={26} alignSelf="center" alignItems="center" space={1}>
            <S.title style={{ fontSize: _text }}>ver detalhes</S.title>
            <CaretRight weight="duotone" />
          </HStack>
        </TouchableOpacity>
      </S.content>
    </S.Container>
  );
}
