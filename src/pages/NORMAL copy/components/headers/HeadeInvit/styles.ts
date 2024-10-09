import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _text, hightPercent } from '@/styles/sizes';

export const Container = styled.View`
  background-color: ${cor.bgcolor};
  height: ${hightPercent('15')}px;
  padding: 15px;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: row;
`;

export const title = styled.Text`
  font-size: ${_text + 2}px;
  font-family: ${font.bold};
  color: ${cor.text.black};
`;

export const text = styled.Text`
  font-size: ${_text}px;
  font-family: ${font.regular};
  color: ${cor.text.light};
`;

export const boxCache = styled.View`
  background-color: ${cor.focus.a};
  padding: 5px 10px;
  border-radius: 8px;
`;
