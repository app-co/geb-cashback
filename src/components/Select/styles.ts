import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _subtitle, hightPercent, widtPercent } from '@/styles/sizes';

interface I {
  selectd: boolean;
}

export const Container = styled.TouchableOpacity``;

export const title = styled.Text`
  font-family: ${font.regular};
  color: ${cor.text.light};
  font-size: ${_subtitle}px;
`;

export const circle = styled.View`
  width: ${widtPercent('3')}px;
  height: ${hightPercent('3')}px;

  border-radius: 100px;
  border-width: 3px;

  align-items: center;
  justify-content: center;

  border-color: ${cor.focus.a};
`;

export const dote = styled.View<I>`
  width: ${widtPercent('1.5')}px;
  height: ${hightPercent('1.5')}px;

  border-radius: 100px;
  background-color: ${h => (h.selectd ? cor.focus.b : cor.bgcolor)};
`;
