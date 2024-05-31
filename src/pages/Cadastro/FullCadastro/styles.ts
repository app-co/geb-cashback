import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _canva, _subtitle } from '@/styles/sizes';

export const Container = styled.View`
  flex: 1;
  background-color: ${cor.bgcolor};
`;

export const title = styled.Text`
  color: ${cor.focus.a};
  font-size: ${_subtitle}px;

  font-family: ${font.bold};
`;

export const main = styled.View`
  flex: 1;
  justify-content: space-between;

  padding: 20px;

  height: ${_canva + 650}px;
`;
