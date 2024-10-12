import Lot from 'lottie-react-native';
import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { _canva, _title } from '@/styles/sizes';

export const Container = styled.View`
  flex: 1;
  background-color: ${cor.bgcolor};
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

export const title = styled.Text`
  font-size: ${_title}px;
  color: ${cor.focus.a};
  font-family: Bold;
  text-align: center;
  margin-top: 20px;
`;

export const loti = styled(Lot)`
  height: ${_canva + 180}px;
  width: ${_canva + 180}px;
`;
