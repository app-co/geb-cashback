import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _subtitle, _text } from '@/styles/sizes';

export const Container = styled.View`
  flex: 1;
  background-color: ${cor.bgcolor};

  padding: 16px;
`;

export const title = styled.Text`
  font-family: ${font.bold};
  color: ${cor.text.light};
  font-size: ${_subtitle}px;
`;
export const text = styled.Text`
  font-family: ${font.light};
  color: ${cor.text.light};
  font-size: ${_text}px;
`;

export const textMonths = styled.Text`
  font-family: ${font.bold};
  font-size: ${_subtitle}px;
  color: ${cor.text.light};
`;

export const headerCongidados = styled.View`
  background-color: ${cor.modal_bg_color.a};
  border-radius: 8px;
  padding: 8px 10px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const mothBox = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: #212121;
  padding: 2px 20px;
  border-radius: 10px;

  border-color: ${h => (h.selected ? cor.focus.a : '#383838')};
  border-width: 1px;
`;
