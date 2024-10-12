import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _text, widtPercent } from '@/styles/sizes';

export const Container = styled.View``;

export const title = styled.Text`
  font-size: ${_text}px;
  font-family: ${font.bold};
  color: ${cor.text.light};
`;

export const box = styled.View`
  background-color: ${cor.focus.a};
  width: ${widtPercent('7.7')}px;
  height: ${widtPercent('7')}px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
`;
