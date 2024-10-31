import React, { useRef } from 'react';
import { FlatList } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { getMonth, getYear } from 'date-fns';
import { Box, Center } from 'native-base';

import { Extrato } from '@/components/Extrato';
import { useTransactionByInvit } from '@/hooks/querys';
import { cor } from '@/styles/cor';
import { _title } from '@/styles/sizes';
import { useRoute } from '@react-navigation/native';

import * as S from './styles';
import { months } from './utils';

export function Rewards() {
  const refMonth = useRef<FlatList>(null);
  const currentMonth = getMonth(new Date());
  const [month, setMonth] = React.useState(currentMonth);

  const { codigo } = useRoute().params as { codigo: string };

  const { data, fetchNextPage, isLoading } = useTransactionByInvit(codigo);

  const invits = data?.pages.flatMap(h => h.records);
  const total = data?.pages[0].totalRewards ?? 0;
  const totalInvit = data?.pages[0].totalPages ?? 0;

  return (
    <S.Container>
      <S.headerCongidados>
        <Center>
          <S.text style={{ color: cor.text.black }}>Seus convidados</S.text>
          <S.title style={{ color: cor.text.black }}>{totalInvit}</S.title>
        </Center>
        <Center>
          <S.text style={{ color: cor.text.black }}>Cashback Rewards</S.text>
          <S.title style={{ color: cor.text.black }}>
            {_toCurrency(total)}
          </S.title>
        </Center>
      </S.headerCongidados>

      <Box zIndex={0} mt={8}>
        <LinearGradient
          style={{
            position: 'absolute',
            zIndex: 1,
            height: 50,
            top: 0,
            left: 0,
            right: 0,
            width: 70,
          }}
          start={{
            x: 0.5,
            y: 0,
          }}
          end={{
            x: 1,
            y: 0,
          }}
          colors={[cor.bgcolor, '#1b1b1b00']}
        />

        <FlatList
          ref={refMonth}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 10,
            paddingHorizontal: 100,
          }}
          horizontal
          data={months}
          keyExtractor={h => h.value.toString()}
          renderItem={({ item: h, index }) => (
            <S.mothBox
              onPress={() => setMonth(h.value)}
              selected={month === h.value}
            >
              <S.textMonths style={{ color: '#fff' }}>{h.label}</S.textMonths>
            </S.mothBox>
          )}
          initialScrollIndex={7}
          getItemLayout={(data, index) => ({
            length: 50,
            offset: 50 * index,
            index,
          })}
        />

        <LinearGradient
          style={{
            position: 'absolute',
            zIndex: 1,
            height: 50,
            top: 0,
            // left: 0,
            right: 0,
            width: 70,
          }}
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 0.5,
            y: 0,
          }}
          colors={['#1b1b1b00', cor.bgcolor]}
        />
      </Box>
      <Center mt={4}>
        <S.title style={{ fontSize: _title }}>{getYear(new Date())}</S.title>
      </Center>

      <Box mt={8}>
        <FlatList
          data={invits}
          keyExtractor={h => h.name}
          contentContainerStyle={{ gap: 20 }}
          renderItem={({ item: h }) => <Extrato item={h} />}
          onEndReached={() => fetchNextPage()}
          ListEmptyComponent={
            <Center>
              <S.text>Nenhum convidado encontrado.</S.text>
            </Center>
          }
        />
      </Box>
    </S.Container>
  );
}
