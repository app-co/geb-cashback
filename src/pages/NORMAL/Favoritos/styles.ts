import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _subtitle, _text, hightPercent } from '@/styles/sizes';

export const Container = styled.View`
  flex: 1;
  background-color: ${cor.bgcolor};
  padding-top: 20px;
`;

export const boxProvider = styled.TouchableOpacity`
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

export const actions = styled.View`
  padding: 5px;
  width: 100px;
  /* position: absolute; */
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  right: 5;
  z-index: 100;
  background-color: rgba(58, 57, 57, 0.7);
  border-radius: 10px;
`;
