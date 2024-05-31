import React from 'react';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { RocketLaunch } from 'phosphor-react-native';

import loti from '@/assets/busines.json';
import { cor } from '@/styles/cor';
import { _canva } from '@/styles/sizes';

import * as S from './styles';

export function Splash() {
  const [play, setPlay] = React.useState(false);
  const animation = useSharedValue(0);

  const animetedLogoStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            animation.value,
            [0, 20],
            [-5, -_canva],
            Extrapolate.CLAMP,
          ),
        },
        {
          scale: interpolate(
            animation.value,
            [0, 20],
            [0.42, 0.7],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const animetedRocketStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            animation.value,
            [0, 20, 60],
            [200, 200, _canva - 30],
            Extrapolate.CLAMP,
          ),
        },

        {
          translateX: interpolate(
            animation.value,
            [0, 20, 60],
            [-200, -200, 0],
            Extrapolate.CLAMP,
          ),
        },

        {
          scale: interpolate(
            animation.value,
            [0, 20, 60],
            [0, 0, 1],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const animetedLotiStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animation.value,
        [0, 8, 15, 17, 20],
        [0, 0, 0.1, 0.5, 1],
      ),
    };
  });

  React.useEffect(() => {
    animation.value = withTiming(60, { duration: 2500 });
  }, [animation]);

  return (
    <S.Container>
      <S.box style={animetedLotiStyle}>
        <S.loti speed={0.6} autoPlay source={loti} />
      </S.box>

      <S.box style={animetedRocketStyle}>
        <RocketLaunch size={150} color={cor.focus.a} />
      </S.box>

      <S.box style={animetedLogoStyle}>
        <S.title>Faça agora</S.title>
        <S.title style={{ color: cor.focus.a }}>negócios</S.title>
        <S.title>de forma</S.title>
        <S.title style={{ color: cor.focus.a }}>inteligente</S.title>
      </S.box>
    </S.Container>
  );
}
