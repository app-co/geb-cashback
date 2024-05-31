/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

import { Input, TypeInput } from '../Input';

type T = TypeInput & {
  name: string;
  control: Control<any>;
  error?: FieldError;
};

export function FormInput({ name, control, error, ...rest }: T) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Input
          error={error ? error.message : ''}
          value={value}
          onChangeText={onChange}
          {...rest}
        />
      )}
    />
  );
}
