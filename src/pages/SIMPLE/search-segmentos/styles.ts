import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _canva, _subtitle, _text, _title } from '@/styles/sizes';

export const Container = styled.View`
  padding: 20px;
  padding-top: ${_canva}px;
  flex: 1;
  background-color: ${cor.bgcolor};
`;

export const title = styled.Text`
  font-size: ${_title}px;
  font-family: ${font.bold};

  color: ${cor.text.light};
`;

export const subtitle = styled.Text`
  font-size: ${_subtitle}px;
  font-family: ${font.regular};

  color: ${cor.text.light};
`;

export const text = styled.Text`
  font-size: ${_text + 4}px;
  font-family: ${font.regular};

  color: ${cor.text.light};
`;
