import Animeted from 'react-native-reanimated';

import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _subtitle } from '@/styles/sizes';

export const Container = styled(Animeted.View)``;

export const title = styled.Text`
  font-family: ${font.regular};
  font-size: ${_subtitle}px;
  color: ${cor.text.light};
`;
