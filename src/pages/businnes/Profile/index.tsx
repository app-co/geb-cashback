import React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { ComponentFormProfile } from '../components/component-form-profile';
import { schemaAccount } from './schema';
import * as S from './styles';

export function Profile() {
  const control = useForm({
    resolver: zodResolver(schemaAccount),
  });
  return (
    <S.Container>
      <ComponentFormProfile
        control={control.control}
        error={control.formState.errors}
      />
    </S.Container>
  );
}
