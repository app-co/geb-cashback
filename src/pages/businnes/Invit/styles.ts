import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _subtitle, _text } from '@/styles/sizes';

export const Container = styled.View`
  flex: 1;
  padding: 10px 15px;
  /* padding-bottom: 50px; */
  background-color: ${cor.bgcolor};
`;

export const content = styled.View`
  /* flex: 1; */
  background-color: ${cor.focus.a};
  border-radius: 10px;
  padding-bottom: 30px;
`;

export const body = styled.View`
  padding: 20px;
  gap: 10px;
`;

export const title = styled.Text`
  font-family: ${font.bold};
  font-size: ${_subtitle}px;
  color: ${cor.text.black};
`;
export const text = styled.Text`
  font-family: ${font.light};
  font-size: ${_text}px;
  color: ${cor.text.blackSoft};
`;
