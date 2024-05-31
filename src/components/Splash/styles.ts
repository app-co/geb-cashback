import Animeted from 'react-native-reanimated';

import Lot from 'lottie-react-native';
import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _canva, _title } from '@/styles/sizes';

export const Container = styled.View`
  background-color: ${cor.bgcolor};
  flex: 1;

  align-items: center;
  justify-content: center;
`;

export const title = styled.Text`
  font-family: ${font.bold};
  color: ${cor.text.light};

  font-size: ${_title}px;
`;

export const box = styled(Animeted.View)``;

export const img = styled(Animeted.Image)`
  width: ${_canva + 100}px;
  height: ${_canva + 200}px;
`;

export const loti = styled(Lot)`
  height: ${_canva + 180}px;
  width: ${_canva + 180}px;
`;
