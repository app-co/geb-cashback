import { TextInput } from 'react-native';

import { css } from 'styled-components';
import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _text, hightPercent } from '@/styles/sizes';

interface I {
  filed: boolean;
  focus: boolean;
  error: boolean;
}

export type TCondition = 'filed' | 'focus' | 'error';

export const Container = styled.View<I>`
  border-radius: 12px;
  flex-direction: row;
  width: 100%;
  height: ${hightPercent('5.4')}px;
  align-items: center;
  background-color: ${cor.bgSoft};

  border-width: 2px;
  border-color: ${cor.bgSoft};

  ${(h: I) =>
    h.filed &&
    css`
      border-color: ${cor.focus.a};
      border-width: 2px;
    `}

  ${(h: I) =>
    h.focus &&
    css`
      border-color: ${cor.focus.a};
      border-width: 2px;
    `};

  ${(h: I) =>
    h.error &&
    css`
      border-color: #770101;
      border-width: 2px;
    `};
`;

export const title = styled.Text`
  color: ${cor.text.light};
  font-family: ${font.light};
  margin-bottom: 5px;
  font-size: ${_text}px;
`;

export const input = styled(TextInput)`
  flex: 1;
  padding: 0 0 0 10px;
  font-family: ${font.bold};
  color: ${cor.text.light};
`;

export const boxIcon = styled.View`
  width: 40px;
  height: 100%;

  align-items: center;
  justify-content: center;
`;
