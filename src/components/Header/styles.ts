import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _subtitle, _text } from '@/styles/sizes';

export const Container = styled.View`
  background-color: ${cor.bgSoft};
  padding: 15px 20px;
  padding-top: 35px;

  flex-direction: row;

  align-items: center;
  justify-content: space-between;
`;

export const title = styled.Text`
  font-family: ${font.bold};
  font-size: ${_subtitle}px;
  color: ${cor.text.light};
`;

export const text = styled.Text`
  font-family: ${font.regular};
  font-size: ${_text}px;
  color: ${cor.focus.a};
`;
