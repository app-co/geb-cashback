/* eslint-disable prettier/prettier */
import Animated from 'react-native-reanimated';

import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _subtitle, _text, hightPercent } from '@/styles/sizes';

const colors = {
  success: '#004a25',
  error: '#7e0000',
  warning: '#b54200ff',
}

export const container = styled(Animated.View) <{ type: 'success' | 'error' | 'warning' }>`
  background-color: ${h => colors[h.type]};
  position: absolute;
  top: ${hightPercent('15')}px;
  right: -300px;
  padding: 10px;
  border-radius: 10px;
  border-width: 2px;
  border-color: ${h => colors[h.type]};
  width: 250px;
`;

export const title = styled.Text`
  color: ${cor.text.light};
  font-size: ${_subtitle}px;
  font-weight: 800;
  font-family: ${font.bold};
`;

export const text = styled.Text`
  color: ${cor.text.light};
  font-size: ${_text}px;
  font-weight: 300;
  font-family: 'regular';
`;
