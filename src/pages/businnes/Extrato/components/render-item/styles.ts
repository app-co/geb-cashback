import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _subtitle, _text } from '@/styles/sizes';

export const Container = styled.View``;

export const title = styled.Text`
  font-family: ${font.black};
  font-size: ${_subtitle}px;
  color: ${cor.text.light};
`;
export const text = styled.Text`
  font-family: ${font.light};
  font-size: ${_text}px;
  color: ${cor.text.light};
  font-weight: 300;
`;

export const content = styled.View`
  padding: 0 25px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

export const body = styled.View`
  gap: 12px;
`;

export const line = styled.View`
  height: 1px;
  width: 100%;
  background-color: #303030;
`;
