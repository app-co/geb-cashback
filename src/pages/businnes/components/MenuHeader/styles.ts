import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _text, canvaPercent } from '@/styles/sizes';

export const Container = styled.View`
  background-color: ${cor.focus.a};
  margin-top: ${canvaPercent('5')}px;
  padding: 20px 20px 15px 20px;
  border-radius: 25px;
  height: 130px;
  justify-content: center;
`;

export const main = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const content = styled.View``;

export const title = styled.Text`
  font-size: 18;
`;

export const titleName = styled.Text`
  font-family: ${font.bold};
  font-size: ${_text + 2}px;
  margin-top: 1px;
`;
