/* eslint-disable prettier/prettier */
import Animated from 'react-native-reanimated';

import styled from 'styled-components/native';

import { font } from '@/styles/fonts';
import { _subtitle, _text, hightPercent } from '@/styles/sizes';

export const container = styled(Animated.View) <{ type: 'sucess' | 'error' }>`
  background-color: ${h => (h.type === 'sucess' ? '#04502a' : '#250707f3')};
  position: absolute;
  top: ${hightPercent('15')}px;
  right: 0px;
  padding: 20px;
  border-radius: 10px;
  border-width: 2px;
  border-color: ${h => (h.type === 'sucess' ? '#264334' : '#d82929f3')};
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
