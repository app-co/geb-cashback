/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-bind */
import React, {
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { TouchableOpacity } from 'react-native';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Box } from 'native-base';
import { XCircle } from 'phosphor-react-native';

import { T } from '../sucess/types';
import GlobalErrorModalHandler from './handler';
import * as S from './styles';
import { GlobalErrorModalRef } from './types';

export function ToastModal() {
  const [isOpen, setIsOpen] = useState(false);

  const [message, setMessage] = React.useState<T>();

  const animation = useSharedValue(0);
  const animationScale = useSharedValue(0);

  const animetedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            animation.value,
            [0, 0.2, 9.5, 10],
            [300, -340, -340, 300],
          ),
        },
      ],
      opacity: interpolate(animation.value, [0, 0.2, 9.5, 10], [0, 1, 1, 0]),
    };
  });

  function animated() {
    animation.value = 0;

    animation.value = withTiming(10, { duration: 10000 });
  }

  React.useEffect(() => {
    animationScale.value = 20;
    if (message?.description) {
      animated();
      return;
    }

    if (!message) {
      animation.value = 0;
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

  function obj(item: T) {
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

  if (!message) {
    return;
  }

  return (
    <S.container style={[animetedStyle]} type={message?.tipo ?? 'success'}>
      <Box alignItems="flex-end">
        <TouchableOpacity
          onPress={() => setMessage(null)}
          style={{ padding: 5 }}
        >
          <XCircle color="#fff" weight="bold" />
        </TouchableOpacity>
      </Box>
      <S.title>{message?.title}</S.title>
      <S.text>{message?.description}</S.text>
    </S.container>
  );
}
