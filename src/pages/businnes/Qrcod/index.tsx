import React from 'react';
import QRCode from 'react-native-qrcode-svg';

import { Loading } from '@/components/Loading';
import { useAuth } from '@/context/auth';

import { useCompanyById } from '../BusinnesConfig/hooks/querys';
import * as S from './styles';

export function Qrcod() {
  const { user } = useAuth();
  const { data, isLoading } = useCompanyById();

  if (isLoading) return <Loading />;
  return (
    <S.Container>
      <S.title>Meu QRcode</S.title>
      <QRCode value={data?.id} size={200} />
    </S.Container>
  );
}
