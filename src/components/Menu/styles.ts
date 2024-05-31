import styled from 'styled-components/native';

import { cor } from '@/styles/cor';
import { _title } from '@/styles/sizes';

export type TVariant = 'gray' | 'rose';

interface IProps {
  variant: TVariant;
}

export const Container = styled.View<IProps>`
  flex-direction: row;
  align-items: center;
  /* padding: 0 25px 10px 0px; */

  background-color: ${cor.focus.b};
`;

export const title = styled.Text`
  font-size: ${_title + 5}px;
  margin-left: 20px;
  font-family: 'Regular';
  color: ${cor.text.light};
`;
