import React, { useRef } from 'react';
import { FlatList } from 'react-native';

import { Box } from 'native-base';

import { IRecordsCompany } from '@/hooks/fetchs/interfaces';

import { RenderIdem } from './render-item';
import * as S from './styles';

interface I {
  destaque: IRecordsCompany[];
}

export function Destaque({ destaque = [] }: I) {
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
    if (index === destaque.length - 1) {
      const time = setTimeout(() => {
        ref.current?.scrollToIndex({
          animated: false,
          index: 0,
          viewPosition: 0.5,
        });
        setIndex(0);
      }, 4000);
      return () => clearTimeout(time);
    }

    const time = setTimeout(() => {
      ref.current?.scrollToIndex({
        animated: true,
        index: index + 1,
        viewPosition: 0.5,
      });

      setIndex(index + 1);
    }, 4000);

    return () => clearTimeout(time);
  }, [index]);

  return (
    <S.Container>
      {destaque.length > 0 ? (
        <FlatList
          ref={ref}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 20,
            paddingHorizontal: 10,
          }}
          data={destaque}
          initialScrollIndex={0}
          keyExtractor={h => h.id}
          renderItem={({ item: h, index: i }) => <RenderIdem item={h} />}
        />
      ) : (
        <Box />
      )}
    </S.Container>
  );
}
