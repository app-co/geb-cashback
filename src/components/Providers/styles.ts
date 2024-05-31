import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _subtitle, _text, hightPercent } from '@/styles/sizes';

export const Container = styled.View`
  flex: 1;
  background-color: ${cor.bgcolor};
  padding-top: 20px;
`;

export const boxProvider = styled.View`
  width: 100%;
  border-radius: 10px;

  background-color: ${cor.bgSoft};
  margin-top: 20px;
`;

export const bx = styled.View`
  padding: 10px 15px;
`;

export const logo = styled.View`
  width: 100%;
  height: ${hightPercent('20') + 10}px;
  background-color: ${cor.focus.b};
`;

export const title = styled.Text`
  font-size: ${_subtitle}px;
  color: ${cor.text.light};
  font-family: ${font.bold};
`;

export const texts = styled.Text`
  font-size: ${_text}px;
  color: ${cor.text.lightSoft};
  font-family: ${font.bold};
`;
