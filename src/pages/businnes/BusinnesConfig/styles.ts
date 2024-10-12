import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { _subtitle } from '@/styles/sizes';

export const Container = styled.View`
  flex: 1;
  background-color: ${cor.bgcolor};
`;

export const title = styled.Text`
  color: ${cor.text.light};
  font-family: 'Bold';
  font-size: ${_subtitle}px;
`;

export const text = styled.Text`
  color: ${cor.text.light};
  font-family: light;
`;

export const box = styled.View`
  padding: 25px 10px;
  border-width: 1px;
  border-color: ${cor.focus.a};
  border-radius: 10px;

  gap: 15px;
`;
