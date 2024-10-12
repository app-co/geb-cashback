import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { _title, hightPercent } from '@/styles/sizes';

export const Container = styled.View`
  flex: 1;
  background-color: ${cor.bgcolor};
`;

export const title = styled.Text`
  font-size: ${_title}px;
  font-family: Bold;
`;

export const box = styled.View<{ bg: string }>`
  height: ${hightPercent('20')}px;
  background-color: ${h => h.bg};
  padding: 20px;
  border-radius: 20px;
`;
