import React, { useRef } from 'react';
import { FlatList } from 'react-native';

import { Loading } from '@/components/Loading';
import { useDestaque } from '@/hooks/querys';

import { RenderIdem } from './render-item';
import * as S from './styles';

export function Destaque() {
  const ref = React.useRef<FlatList>(null);

  const [index, setIndex] = React.useState<number>(0);

  const { data: destaque = [], isLoading } = useDestaque();

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

  if (isLoading) return <Loading />;

  return (
    <S.Container>
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
    </S.Container>
  );
}
