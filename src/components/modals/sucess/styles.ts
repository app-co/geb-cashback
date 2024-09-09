/* eslint-disable prettier/prettier */
import Animated from 'react-native-reanimated';

import styled from 'styled-components/native';

import { font } from '@/styles/fonts';
import { _subtitle, _text, hightPercent } from '@/styles/sizes';

import { TType } from './types';

const colors: { [key: string]: string } = {
  success: '#04502a',
  error: '#ff0e0e',
  warning: '#e35300',
}

export const container = styled(Animated.View) <{ type: TType }>`
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
  color: #fff;
  font-size: ${_subtitle}px;
  font-weight: 800;
  font-family: ${font.bold};
`;

export const text = styled.Text`
  color: #fff;
  font-size: ${_text}px;
  font-weight: 300;
  font-family: 'trin';
`;
