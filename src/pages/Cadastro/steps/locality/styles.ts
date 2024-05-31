import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _subtitle, _text } from '@/styles/sizes';

export const Container = styled.View``;

export const title = styled.Text`
  text-align: center;

  font-family: ${font.bold};
  font-size: ${_subtitle}px;
  color: ${cor.focus.a};
`;

export const subtitle = styled.Text`
  font-family: ${font.bold};
  font-size: ${_text + 2}px;
  color: ${cor.text.lightSoft};
`;

export const text = styled.Text`
  font-family: ${font.light};
  font-size: ${_text - 2}px;
  color: ${cor.text.lightSoft};

  text-align: center;
`;

export const main = styled.View``;
