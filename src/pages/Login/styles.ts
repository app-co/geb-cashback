import { Image } from 'expo-image';

import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _canva, _text, _title, widtPercent } from '@/styles/sizes';

export const Container = styled.View`
  flex: 1;

  background-color: ${cor.bgcolor};

  align-items: center;
  justify-content: space-between;

  padding: 20px;
  padding-top: 40px;
`;

export const title = styled.Text`
  font-size: ${_title}px;
  color: ${cor.text.light};
`;

export const text = styled.Text`
  font-size: ${_text}px;

  font-family: ${font.regular};
  margin-top: ${_canva - 30}px;
  color: ${cor.text.light};
  text-align: center;
`;

export const img = styled(Image)`
  width: ${widtPercent('18')}px;
  height: ${widtPercent('10')}px;

  margin-top: ${widtPercent('1')}px;
`;

export const foot = styled.View`
  width: 100%;
`;

export const forgotPass = styled.TouchableOpacity`
  padding: 5px 10px;
`;

export const boxForm = styled.View`
  gap: 15px;
  width: 100%;
`;
