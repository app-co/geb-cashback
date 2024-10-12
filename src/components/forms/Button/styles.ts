import { TouchableOpacity } from 'react-native';

import styled, { css } from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _text, hightPercent } from '@/styles/sizes';

interface IStyle {
  color: string;
  styleType: 'solid' | 'transpale' | 'border';
}
export const Container = styled(TouchableOpacity) <IStyle>`
  width: 100%;
  height: ${hightPercent('5.4')}px;

  ${h =>
    h.styleType === 'solid' &&
    css<IStyle>`
      background-color: ${h => h.color};
    `}

  ${h =>
    h.styleType === 'transpale' &&
    css<IStyle>`
      background-color: transparent;
    `}

    ${h =>
    h.styleType === 'border' &&
    css<IStyle>`
      border-width: 1px;
      border-color: ${h => h.color};
    `}


  align-items: center;
  justify-content: center;
  border-radius: 15px;
  flex-direction: row;
  gap: 15px;

  margin-top: 10px;
`;

export const title = styled.Text<IStyle>`
  font-size: ${_text + 3}px;
  font-family: ${font.bold};

  ${h =>
    h.styleType === 'solid' &&
    css<IStyle>`
      color: ${h => h.color};
    `}

  ${h =>
    h.styleType === 'transpale' &&
    css<IStyle>`
      color: ${h => h.color};
    `}

    ${h =>
    h.styleType === 'border' &&
    css<IStyle>`
      color: ${cor.text.light};
    `}
`;
