import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _subtitle, _text } from '@/styles/sizes';

export const container = styled.View`
  flex: 1;
  background-color: ${cor.bgcolor};
  padding: 20px;
`;

export const title = styled.Text`
  color: ${cor.text.light};
  font-size: ${_subtitle}px;
  font-family: ${font.bold};
`;

export const text = styled.Text`
  color: ${cor.text.light};
  font-size: ${_text}px;
  font-family: ${font.light};
`;

export const boxCache = styled.View`
  border-radius: 10px;
  padding: 2px 8px;
  background-color: ${cor.focus.a};
  width: 120px;
`;

export const content = styled.View`
  margin-top: 30px;
  gap: 20px;
`;

export const boxTypePayment = styled.View<{ selected: boolean }>`
  width: 100px;
  padding: 5px 8px;
  border-radius: 10px;
  background-color: ${h => (h.selected ? cor.focus.a : '#2b2b2b')};
  align-items: center;
  justify-content: center;
`;

export const textTypePyament = styled.Text<{ select: boolean }>`
  color: ${h => (h.select ? cor.text.black : cor.text.lightSoft)};
  font-size: ${_text}px;
  font-family: ${h => (h.select ? font.bold : font.light)};
`;
