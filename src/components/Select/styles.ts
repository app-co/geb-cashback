import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { hightPercent, widtPercent } from '@/styles/sizes';

interface I {
  selectd: boolean;
}

export const Container = styled.TouchableOpacity``;

export const title = styled.Text`
  font-family: ${font.regular};
  color: ${cor.text.light};
`;

export const circle = styled.View`
  width: ${widtPercent('4')}px;
  height: ${hightPercent('4')}px;

  border-radius: 100px;
  border-width: 3px;

  align-items: center;
  justify-content: center;

  border-color: ${cor.focus.a};
`;

export const dote = styled.View<I>`
  width: ${widtPercent('2.4')}px;
  height: ${hightPercent('2.4')}px;

  border-radius: 100px;
  background-color: ${h => (h.selectd ? cor.focus.b : cor.bgcolor)};
`;
