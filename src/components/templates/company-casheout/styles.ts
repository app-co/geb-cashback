import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { _subtitle, _title } from '@/styles/sizes';

export const Container = styled.View`
  flex: 1;
  background-color: ${cor.bgcolor};
`;

export const title = styled.Text`
  font-family: Bold;
  font-size: ${_title}px;
  color: ${cor.text.light};
`;

export const text = styled.Text`
  font-family: Light;
  font-size: ${_subtitle}px;
  color: ${cor.text.light};
`;
