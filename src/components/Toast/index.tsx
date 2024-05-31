import React from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Modal } from 'native-base';

import { cor } from '@/styles/cor';

import * as S from './styles';

interface I {
  isVisible: boolean;
  onClose: () => void;
  type: 'sucess' | 'alert' | 'error';
  message: string;
}

const colorType = {
  sucess: '#207B11',
  alert: '#FB9A40',
  error: '#9e1e1e',
};

export function Toast({ isVisible, type = 'sucess', message, onClose }: I) {
  const translateY = useSharedValue(100);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(translateY.value) }],
    };
  });

  React.useEffect(() => {
    if (isVisible) {
      translateY.value = 0;

      // Fechar o toast após 3 segundos
      const timerId = setTimeout(onClose, 4000);

      return () => {
        clearTimeout(timerId);
      };
    }
    translateY.value = 100;
  }, [isVisible, onClose, translateY]);

  return (
    <Modal isOpen={isVisible} onClose={onClose}>
      <Modal.Content bg={cor.bgcolor} w="340px">
        <Modal.CloseButton />
        {/* <Modal.Header borderBottomColor="red.600" bg="red.600">
          Recuperação de senha
        </Modal.Header> */}
        <S.Container style={animatedStyle}>
          <Modal.Body bg={colorType[type]}>
            <S.title>{message}</S.title>
          </Modal.Body>
        </S.Container>
      </Modal.Content>
    </Modal>
  );
}
