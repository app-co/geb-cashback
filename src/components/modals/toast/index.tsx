/* eslint-disable react/jsx-no-bind */
import React, {
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import GlobalErrorModalHandler from './handler';
import * as S from './styles';
import { GlobalErrorModalRef } from './types';

export function ToastModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = React.useState<{
    title: string;
    description: string;
  }>();

  const animation = useSharedValue(0);
  const animationScale = useSharedValue(0);

  const animetedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(animation.value, [0, 20], [0, 0]),
        },
        {
          translateX: interpolate(animation.value, [0, 20], [250, -20]),
        },
      ],
    };
  });

  const styleScale = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(animationScale.value, [0, 20], [1, 0]),
        },
      ],
    };
  });

  function animated() {
    animation.value = 0;

    animation.value = withTiming(20, { duration: 400 });
  }

  function animatedScale() {
    animationScale.value = 0;
    animationScale.value = withTiming(20, { duration: 300 });
  }

  React.useEffect(() => {
    animationScale.value = 20;
    if (message) {
      animated();
      setTimeout(() => {
        animatedScale();
        animation.value = 0;
      }, 4000);
    }
  }, [message]);

  const ref = useRef<GlobalErrorModalRef>();

  function handleConfirm() {
    ref.current?.hide();
  }

  function showModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function obj(item: { title: string; description: string }) {
    setIsOpen(true);
    setMessage(item);
  }

  useLayoutEffect(() => {
    GlobalErrorModalHandler.setRef(ref);
  }, []);

  useImperativeHandle(ref, () => ({
    show: showModal,
    hide: closeModal,
    item: h => obj(h),
  }));

  return (
    <S.container style={[animetedStyle, styleScale]} type="sucess">
      <S.title>{message?.title}</S.title>
      <S.text>{message?.description}</S.text>
    </S.container>
  );
}
