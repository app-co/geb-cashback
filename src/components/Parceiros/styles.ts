import { MotiView } from 'moti';
import styled from 'styled-components/native';

import { hightPercent, widtPercent } from '@/styles/sizes';

export const Container = styled(MotiView)`
  border-radius: 10px;

  height: ${hightPercent('25')}px;
  border-radius: 10px;
  width: ${widtPercent('40')}px;
`;

export const title = styled.Text``;

export const content = styled.View``;
