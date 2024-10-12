import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _subtitle } from '@/styles/sizes';

export const Container = styled.View`
  flex: 1;
`;

export const title = styled.Text`
  font-family: ${font.regular};
  color: ${cor.text.light};
  font-size: ${_subtitle}px;
`;
