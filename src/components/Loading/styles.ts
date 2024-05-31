import Animated from 'react-native-reanimated';

import Lot from 'lottie-react-native';
import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _canva, _text } from '@/styles/sizes';

export const Container = styled.View`
  background-color: ${cor.bgcolor};
  flex: 1;
  width: 100%;

  align-items: center;
  justify-content: center;
`;

export const title = styled.Text`
  font-family: ${font.bold};
  font-size: ${_text + 4}px;
  color: ${cor.focus.a};
`;

export const box = styled(Animated.View)``;

export const loti = styled(Lot)`
  height: ${_canva + 280}px;
  width: ${_canva + 280}px;
`;
