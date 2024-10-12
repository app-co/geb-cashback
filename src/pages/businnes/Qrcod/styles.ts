import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { _title } from '@/styles/sizes';

export const Container = styled.View`
  flex: 1;
  background-color: ${cor.bgcolor};
  padding: 20px;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const title = styled.Text`
  font-size: ${_title}px;
  font-family: Bold;
  color: ${cor.text.light};
`;
