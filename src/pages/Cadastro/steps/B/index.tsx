import React from 'react';
import Dropdown from 'react-native-input-select';

import { VStack } from 'native-base';

import { FormInput } from '@/components/forms/FormInput';
import { InputForm } from '@/components/forms/InputForm';
import { cor } from '@/styles/cor';

import * as S from './styles';
import { bussines } from './utils';

interface I {
  error: any;
  control: any;
  setValue: any;
}

export function B({ error, setValue, control }: I) {
  const [profission, setProfission] = React.useState('');

  React.useEffect(() => {
    setValue('profission', profission);
  }, [profission, setValue]);

  return (
    <S.Container>
      <S.main>
        <S.subtitle>
          Finalize seu cadastro e faça parte do maior grupo de empresas do
          Brasil
        </S.subtitle>

        <VStack mt="8" space={4}>
          <FormInput
            label="CPF"
            mask="cpf"
            error={error.document}
            name="document"
            autoCapitalize="none"
            keyboardType="numeric"
            control={control}
            placeholder="Seu CPF"
            maxLength={14}
          />

          <FormInput
            label="WhattsApp"
            error={error.contato}
            name="contato"
            keyboardType="numeric"
            control={control}
            placeholder="Seu número de WhattsApp"
            mask="cell-phone"
            maxLength={16}
          />

          <FormInput
            label="Dt. de nascimento"
            error={error.born}
            name="born"
            keyboardType="numeric"
            autoCapitalize="none"
            control={control}
            placeholder="dia/mês/ano"
            mask="date"
            maxLength={10}
          />

          <InputForm
            control={control}
            name="profission"
            error={error.profission}
            render={({ onChange, value }) => (
              <Dropdown
                labelStyle={{
                  margin: 1,
                  marginBottom: 3,
                }}
                placeholderStyle={{
                  color: cor.text.light,
                }}
                dropdownStyle={{
                  backgroundColor: cor.bgSoft,
                  borderColor: error.profission ? '#aa0c0c' : cor.focus.a,
                }}
                label="Profissão"
                placeholder="Selecione uma"
                listComponentStyles={{
                  itemSeparatorStyle: {
                    backgroundColor: cor.focus.a,
                  },
                }}
                options={bussines}
                isSearchable
                selectedValue={value}
                onValueChange={value => onChange(value)}
                primaryColor={cor.focus.a}
                selectedItemStyle={{
                  color: cor.text.light,
                  fontFamily: 'Regular',
                }}
                modalControls={{
                  modalOptionsContainerStyle: {
                    backgroundColor: cor.focus.a,
                  },
                }}
              />
            )}
          />
        </VStack>
      </S.main>
    </S.Container>
  );
}
