import React, { useRef } from 'react';
import { FlatList } from 'react-native';

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

  const [index, setIndex] = React.useState<number>(0);

  function onViewableItemsChanged({ viewableItems }: any) {
    if (viewableItems.length > 0) {
      setIndex(viewableItems[0].index);
    }
  }

  const viewability = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 50,
      },
      onViewableItemsChanged,
    },
  ]);

  React.useEffect(() => {
    if (index === parceiros.length - 1) {
      const time = setTimeout(() => {
        ref.current?.scrollToIndex({
          animated: false,
          index: 0,
          viewPosition: 0.5,
        });
        setIndex(0);
      }, 3000);
      return () => clearTimeout(time);
    }

    const time = setTimeout(() => {
      ref.current?.scrollToIndex({
        animated: true,
        index: index + 1,
        viewPosition: 0.5,
      });

      setIndex(index + 1);
    }, 3000);

    return () => clearTimeout(time);
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
          viewabilityConfigCallbackPairs={viewability.current}
          pagingEnabled
          initialScrollIndex={index}
          keyExtractor={h => h.name}
          renderItem={({ item: h, index: i }) => (
            <Circle size="10px" bg={i === index ? 'gray.100' : '#4646466e'} />
          )}
        />
      </Box>
    </S.content>
  );
}
