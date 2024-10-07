import React from 'react';
import Dropdown from 'react-native-input-select';

import { VStack } from 'native-base';

import { FormInput } from '@/components/forms/FormInput';
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
            maxLength={15}
          />

          <FormInput
            label="Dt. de nascimento"
            error={error.born}
            name="born"
            keyboardType="numeric"
            autoCapitalize="none"
            control={control}
            icon="lock"
            placeholder="dd/mm/yyyy"
            mask="date"
            maxLength={10}
          />

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
              borderColor: cor.bgSoft,
            }}
            label="Profissão"
            placeholder="Select an option..."
            listComponentStyles={{
              itemSeparatorStyle: {
                backgroundColor: cor.focus.a,
              },
            }}
            options={bussines}
            isSearchable
            selectedValue={profission}
            onValueChange={value => setProfission(value)}
            primaryColor={cor.focus.a}
            selectedItemStyle={{
              color: cor.text.light,
              fontFamily: 'Regular',
            }}
            modalControls={{
              modalOptionsContainerStyle: {
                backgroundColor: cor.bgSoft,
              },
            }}
          />
        </VStack>
      </S.main>
    </S.Container>
  );
}
