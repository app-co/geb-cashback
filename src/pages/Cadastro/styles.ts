import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _text } from '@/styles/sizes';

export const Container = styled.View`
  flex: 1;
  background-color: ${cor.bgcolor};
`;

export const main = styled.View`
  flex: 1;
  padding: 20px;
  gap: 10px;
`;

export const title = styled.Text`
  color: ${cor.text.lightSoft};
  font-family: ${font.bold};
  text-align: center;

  font-size: ${_text + 3}px;
  width: 250px;
  align-self: center;
`;

export const subTitle = styled.Text`
  color: ${cor.text.lightSoft};
  font-family: ${font.bold};
  font-size: ${_text + 5}px;
  text-align: center;
`;

export const text = styled.Text`
  color: ${cor.text.lightSoft};
  font-family: ${font.regular};
  font-size: ${_text}px;

  width: 270px;
`;

export const boxCard = styled.TouchableOpacity`
  background-color: ${cor.bgSoft};
  border-radius: 10px;

  padding: 10px;

  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
