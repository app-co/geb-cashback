import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { _title } from '@/styles/sizes';

export const Container = styled.View`
  margin-top: 40%;
`;

export const box = styled.View`
  background-color: ${cor.focus.a};
  padding: 10px;
  border-radius: 10px;
`;

export const title = styled.Text`
  color: ${cor.text.black};
  font-family: Bold;
  font-size: ${_title}px;
  text-align: center;
  margin-bottom: 20px;
`;
