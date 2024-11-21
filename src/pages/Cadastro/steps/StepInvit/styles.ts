import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { _canva, _text, _title } from '@/styles/sizes';

export const Container = styled.View`
  margin-top: 40%;
`;

export const box = styled.View`
  background-color: ${cor.focus.a};
  padding: 10px;
  border-radius: 10px;
`;

export const title = styled.Text`
  color: ${cor.text.black};
  font-family: Bold;
  font-size: ${_title}px;
  text-align: center;
  margin-bottom: 20px;
`;

export const text = styled.Text`
  color: ${cor.text.black};
  font-family: regular;
  font-size: ${_text}px;
  text-align: center;
  margin-bottom: 20px;
`;

export const input = styled.TextInput`
  background-color: ${cor.bgSoft};
  padding: 10px;
  height: ${_canva + 25}px;
  border-radius: 10;
  color: ${cor.text.light};
  font-size: ${_title}px;
  text-align: center;
`;
