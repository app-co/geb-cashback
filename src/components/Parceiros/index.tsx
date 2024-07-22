import React from 'react';
import { Dimensions, FlatList } from 'react-native';

import { Box, Circle, Image } from 'native-base';

import parceiro from '@/assets/parceiros.jpeg';
import vox from '@/assets/vox.png';

import * as S from './styles';

const parceiros = [
  {
    name: 'pedro',
    image: parceiro,
  },
  {
    name: 'vox',
    image: vox,
  },
];

export function Parceiros() {
  const ref = React.useRef<FlatList>(null);
  const { width } = Dimensions.get('screen');

  const [index, setIndex] = React.useState<number>(0);

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / (width * 1));
    setIndex(newIndex);
  };

  React.useEffect(() => {
    ref.current?.scrollToIndex({
      animated: true,
      index,
    });
  }, [index]);

  function currecel() {
    setTimeout(() => {
      if (index === parceiros.length - 1) {
        setIndex(0);
        return;
      }
      setIndex(index + 1);
    }, 4000);
  }

  React.useEffect(() => {
    // currecel();
  }, [index]);

  return (
    <S.content>
      <FlatList
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
          paddingHorizontal: 10,
        }}
        data={parceiros}
        onScroll={handleScroll}
        initialScrollIndex={0}
        keyExtractor={h => h.name}
        renderItem={({ item: h, index: i }) => (
          <S.Container>
            <Image
              alt="img"
              resizeMode="contain"
              style={{ width: '100%', height: '100%' }}
              source={h.image}
            />
          </S.Container>
        )}
      />

      <Box justifyContent="center" alignItems="center" mt={4}>
        <FlatList
          contentContainerStyle={{
            gap: 10,
            alignSelf: 'center',
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={parceiros}
          initialScrollIndex={0}
          keyExtractor={h => h.name}
          renderItem={({ item: h, index: i }) => (
            <Circle size="10px" bg={i === index ? 'gray.100' : '#4646466e'} />
          )}
        />
      </Box>
    </S.content>
  );
}
