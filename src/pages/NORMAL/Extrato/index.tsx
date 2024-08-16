import React, { useRef } from 'react';
import { ActivityIndicator, FlatList, Modal } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { getMonth, getYear } from 'date-fns';
import { Box, Center } from 'native-base';

import { cor } from '@/styles/cor';
import { _title } from '@/styles/sizes';

import { months } from '../Rewards/utils';
import { RenderItem } from './components/render-item';
import { useTransactions } from './hooks/querys';
import * as S from './styles';

export function Extrato() {
  const refMonth = useRef<FlatList>(null);
  const currentMonth = getMonth(new Date());
  const [month, setMonth] = React.useState(currentMonth);

  const { data, isLoading, fetchNextPage } = useTransactions(month);

  const transactions = data?.pages.flatMap(h => h.records);

  // React.useEffect(() => {
  //   refMonth.current?.scrollToIndex({
  //     animated: true,
  //     index: month,
  //     viewPosition: 0.5,
  //   });
  // }, [month]);

  return (
    <S.Container>
      <S.headerCongidados>
        <Center>
          <S.text style={{ color: cor.text.black }}>Seus convidados</S.text>
          <S.title style={{ color: cor.text.black }}>04</S.title>
        </Center>
        <Center>
          <S.text style={{ color: cor.text.black }}>Cashback Rewards</S.text>
          <S.title style={{ color: cor.text.black }}>R$ 8,00</S.title>
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
          keyExtractor={(h, i) => i.toString()}
          renderItem={({ item: h, index }) => (
            <S.mothBox
              onPress={() => setMonth(h.value)}
              selected={month === h.value}
            >
              <S.textMonths style={{ color: '#fff' }}>{h.label}</S.textMonths>
            </S.mothBox>
          )}
        // initialScrollIndex={month}
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

      {isLoading ? (
        <Modal transparent visible={isLoading}>
          <Center>
            <ActivityIndicator />
          </Center>
        </Modal>
      ) : (
        <FlatList
          data={transactions}
          onEndReached={() => {
            fetchNextPage();
          }}
          keyExtractor={(h, i) => String(i)}
          renderItem={({ item: h }) => <RenderItem item={h} />}
        />
      )}
    </S.Container>
  );
}
