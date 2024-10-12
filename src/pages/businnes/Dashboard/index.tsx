import React from 'react';
import { TouchableOpacity } from 'react-native';

import { HStack, VStack } from 'native-base';
import {
  ArrowsLeftRight,
  CurrencyCircleDollar,
  Eye,
  EyeClosed,
  Note,
  Notebook,
} from 'phosphor-react-native';

import { Button } from '@/components/forms/Button';
import { Loading } from '@/components/Loading';
import { useAuth } from '@/context/auth';
import { useCompanyMetrica } from '@/hooks/querys';
import { cor } from '@/styles/cor';
import { _title } from '@/styles/sizes';
import { _toCurrency } from '@/utils/unidades';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';

export function Dashboard() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);

  const { data: metrica, isLoading } = useCompanyMetrica({ userId: user.id });

  if (isLoading) return <Loading />;

  return (
    <S.Container>
      <VStack space={8} p={4}>
        <S.box bg={cor.focus.a}>
          <HStack justifyContent="space-between">
            <S.title>Total de vendas</S.title>
            <TouchableOpacity onPress={() => setVisible(!visible)}>
              {visible ? (
                <Eye size={35} color={cor.bgSoft} weight="duotone" />
              ) : (
                <EyeClosed size={35} color={cor.bgSoft} weight="duotone" />
              )}
            </TouchableOpacity>
          </HStack>
          <HStack alignItems="center" space={4}>
            <CurrencyCircleDollar weight="duotone" size={110} />

            <S.title style={{ color: cor.text.black, fontSize: _title + 5 }}>
              {visible ? _toCurrency(metrica?.wallet.amount ?? 0) : 'R$ - - -'}
            </S.title>
          </HStack>
        </S.box>

        <S.box bg={cor.modal_bg_color.a}>
          <S.title style={{ color: cor.text.light }}>Total de clientes</S.title>

          <HStack alignItems="center" space={8}>
            <Notebook weight="duotone" size={110} />
            <S.title style={{ color: cor.text.black, fontSize: _title + 10 }}>
              {metrica?.leads ?? 0}
            </S.title>
          </HStack>
        </S.box>

        <Button
          onPress={() => navigation.navigate('casheout')}
          ico={<ArrowsLeftRight size={35} />}
          title="Solicitar Saque"
        />
        <Button
          ico={<Note color={cor.text.light} size={30} />}
          title="Extrato"
          styleType="border"
          onPress={() => navigation.navigate('faturamento')}
        />
      </VStack>
    </S.Container>
  );
}
