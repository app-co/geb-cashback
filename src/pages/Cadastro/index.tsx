import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Box, Center, HStack, useToast } from 'native-base';
import { ArrowCircleLeft, Info } from 'phosphor-react-native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';

export function Cadastro() {
  const { show } = useToast();
  const { navigate, goBack } = useNavigation();

  return (
    <S.Container>
      <Box w="full" bg={cor.bgcolor} p="4">
        <TouchableOpacity
          onPress={() => goBack()}
          style={{ padding: 5, marginTop: 26 }}
        >
          <ArrowCircleLeft color={cor.focus.a} size={40} />
        </TouchableOpacity>
      </Box>

      <S.main>
        <S.title>Escolha a opção que mais lhe agrada</S.title>

        <S.boxCard
          style={{ backgroundColor: cor.focus.a }}
          onPress={() => navigate('simpleCadastro', { type: 'search' })}
        >
          <Box w="60px">
            <Info size={50} weight="duotone" color={cor.bgcolor} />
          </Box>

          <Center flex="1">
            <S.text
              style={{
                width: '344px',
                color: cor.text.black,
                fontFamily: font.bold,
              }}
            >
              Pessoa física | Pessoa juŕidica
            </S.text>
            <Box flex="1">
              <S.subTitle style={{ color: cor.text.black }}>
                ENCONTRE ACORA
              </S.subTitle>
              <S.subTitle style={{ color: cor.text.black }}>
                PROFISSIONAIS E EMPRESAS
              </S.subTitle>
            </Box>
            <S.text
              style={{
                width: '100%',
                textAlign: 'center',
                color: cor.text.black,
                fontFamily: font.regular,
              }}
            >
              Tenha acesso exclusivo a todas as empresas e profissionais
              cadastrados na plataforma
            </S.text>
          </Center>
        </S.boxCard>

        <S.boxCard
          style={{ backgroundColor: cor.focus.a }}
          onPress={() => navigate('fullCadastro', { type: 'normal' })}
        >
          <Box>
            <Info size={50} weight="duotone" color={cor.bgcolor} />
          </Box>

          <Center flex="1">
            <S.text
              style={{
                width: '344px',
                color: cor.text.black,
                fontFamily: font.black,
              }}
            >
              Pessoa física | Pessoa juŕidica
            </S.text>
            <Box flex="1">
              <S.subTitle style={{ color: cor.text.black }}>
                COMPRE E FAÇA RENDA EXTRA
              </S.subTitle>
              <S.subTitle style={{ color: cor.text.black }}>
                CASHBACK EM DINHEIRO
              </S.subTitle>
            </Box>
            <S.text
              style={{
                width: '100%',
                textAlign: 'center',
                color: cor.text.black,
                fontFamily: font.regular,
              }}
            >
              Compre das empresas e profissionais cadastrados na plataforma e
              receba casback via PIX cadastrados na plataforma
            </S.text>
          </Center>
        </S.boxCard>

        <S.boxCard
          style={{ backgroundColor: cor.focus.b }}
          onPress={() => navigate('fullCadastro', { type: 'businnes' })}
        >
          <Box>
            <Info size={50} weight="duotone" color={cor.bgcolor} />
          </Box>

          <Center flex="1">
            <S.text
              style={{
                width: '344px',
                textAlign: 'center',
                color: cor.text.black,
                fontFamily: font.black,
              }}
            >
              Exclusivo para Pessoa Jurídica
            </S.text>
            <Box>
              <S.subTitle style={{ color: cor.text.black }}>
                VENDA E COMPRE, PAGANDO E
              </S.subTitle>
              <S.subTitle style={{ color: cor.text.black }}>
                RECEBENDO CASHBACK.
              </S.subTitle>
            </Box>
            <S.text
              style={{
                width: '100%',
                textAlign: 'center',
                color: cor.text.black,
                fontFamily: font.regular,
              }}
            >
              Aumente suas vendas alcançando mais pessoas pagando casback e
              receba cashback consumindo produtos e serviços
            </S.text>
          </Center>
        </S.boxCard>
      </S.main>

      <HStack py="12" px="8" alignItems="center" justifyContent="space-between">
        <Box />
      </HStack>
    </S.Container>
  );
}
