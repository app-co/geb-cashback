import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _subtitle, widtPercent } from '@/styles/sizes';

export const Container = styled.View`
  flex: 1;
  padding: 10px;
  background-color: ${cor.bgcolor};
`;

export const cash = styled.TouchableOpacity`
  background-color: ${cor.focus.a};
  border-radius: 8px;
  align-items: center;
  padding: 5px;
  flex-direction: row;
  justify-content: space-between;

  width: ${widtPercent('15')}px;
`;

export const title = styled.Text`
  font-family: ${font.regular};
  font-size: ${_subtitle}px;
  color: ${cor.text.black};
`;

export const subtitle = styled.Text`
  font-family: ${font.regular};
  font-size: ${_subtitle - 4}px;
  color: ${cor.text.light};
`;
