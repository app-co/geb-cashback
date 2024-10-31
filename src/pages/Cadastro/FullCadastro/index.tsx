/* eslint-disable no-lone-blocks */
import React from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Modal, TouchableOpacity } from 'react-native';

import { Box, Center, HStack, ScrollView } from 'native-base';
import { ArrowCircleLeft, ArrowCircleRight } from 'phosphor-react-native';

import { Button } from '@/components/forms/Button';
import Toast from '@/components/modals/toast/handler';
import { Keyboard } from '@/components/templates/KeyboardAvoidingWrapper';
import { useAuth } from '@/context/auth';
import { useStepByStep } from '@/context/step-by-step';
import { useSignUp } from '@/hooks/mutations';
import { cor } from '@/styles/cor';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useRoute } from '@react-navigation/native';

import { A } from '../steps/A';
import { B } from '../steps/B';
import { Locality } from '../steps/locality';
import { StepInvit } from '../steps/StepInvit';
import { schemaRegisterUser } from './schemes/schemas';
import { TRegisterUser } from './schemes/types';
import * as S from './styles';

interface IA {
  name: string;
  email: string;
  password: string;
  confirmation_pass: string;
}

interface IB {
  born: string;
  profission: string;
  contato: string;
  document: string;
}

export function FullCadastro() {
  const { updateUser } = useAuth();
  const { isLoading, mutateAsync } = useSignUp();

  const { type } = useRoute().params as { type: 'businnes' | 'normal' };

  const [load, setLoad] = React.useState<boolean>(false);

  const { goBack, navigate } = useNavigation();

  const control = useForm<TRegisterUser>({
    resolver: zodResolver(schemaRegisterUser),
  });

  const components = [
    <StepInvit control={control.control} />,
    <A control={control.control} error={control.formState.errors} />,
    <B
      setValue={control.setValue}
      control={control.control}
      error={control.formState.errors}
    />,
    <Locality
      cep={control.watch('postal_code')}
      control={control.control}
      error={control.formState.errors}
      getCep={h => {
        control.setValue('postal_code', h.cep);
        control.setValue('city', h.city);
        control.setValue('street', h.street);
        control.setValue('region_code', h.state);
      }}
    />,
  ];

  const { changeStep, currentComponent, currentStep, lastStep } = useStepByStep(
    {
      step: components,
    },
  );

  function preview() {
    if (currentStep === 0) {
      goBack();
    }

    changeStep(currentStep - 1);
  }

  const handleSave = React.useCallback(
    async (obj: TRegisterUser) => {
      try {
        const U = {
          name: obj.name,
          email: obj.email,
          password: obj.password,
          account_type: type,
          codigoInvit: obj.codigoInvit,
        };

        const P = {
          document: obj.document,
          avatar: '',
          born: obj.born,
          profission: obj.profission,
          contato: obj.contato,
        };

        const L = {
          city: obj.city,
          region_code: obj.region_code,
          postal_code: obj.postal_code,
          complement: obj.complement,
          street: obj.street,
          number: obj.number,
        };

        await mutateAsync({ U, P, L });

        Toast.show({
          title: 'Parabéns!',
          description: 'Seu cadastro foi realizado com sucesso.',
          tipo: 'success',
        });
        navigate('login');
      } catch (error) {
        Toast.show({
          title: 'Ops!',
          description:
            'Ocorreu um erro ao realizar seu cadastro. Tente novamente.',
          tipo: 'error',
        });
      }
    },
    [type],
  );

  const handleNext = React.useCallback(async () => {
    let isValid = false;
    switch (currentStep) {
      case 0:
        {
          isValid = true;
          changeStep(currentStep + 1);
        }
        break;
      case 1:
        {
          isValid = await control.trigger([
            'name',
            'email',
            'password',
            'confirmation_pass',
          ]);
        }

        break;

      case 2:
        {
          isValid = await control.trigger([
            'document',
            'contato',
            'born',
            'profission',
          ]);
        }

        break;

      case 3:
        {
          isValid = await control.trigger([
            'city',
            'region_code',
            'postal_code',
            'complement',
            'street',
            'number',
          ]);
        }

        break;

      default:
        break;
    }

    if (isValid) {
      changeStep(currentStep + 1);
    }
  }, [currentStep]);

  return (
    <Keyboard>
      <S.Container>
        <Modal visible={load} transparent>
          <Center bg="#6c646489" flex="1">
            <ActivityIndicator size={30} color={cor.focus.a} />
          </Center>
        </Modal>
        <Box w="full" pt="12" bg={cor.bgcolor} p="4">
          <S.title>Cadastre-se</S.title>
        </Box>
        <ScrollView>
          {/* <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}> */}
          <S.main>
            <Box>{currentComponent}</Box>

            {lastStep ? (
              <HStack space={4}>
                <Box flex={1}>
                  <Button
                    txt_color="#fff"
                    onPress={() => changeStep(currentStep - 1)}
                    styleType="border"
                    title="VOLTAR"
                  />
                </Box>

                <Box flex={1}>
                  <Button
                    onPress={control.handleSubmit(handleSave)}
                    load={isLoading}
                    title="FINALIZAR"
                  />
                </Box>
              </HStack>
            ) : (
              <HStack w="full" justifyContent="space-between">
                {currentStep > 0 ? (
                  <TouchableOpacity
                    onPress={() => preview()}
                    style={{ padding: 5 }}
                  >
                    <ArrowCircleLeft color={cor.focus.a} size={50} />
                  </TouchableOpacity>
                ) : (
                  <Box />
                )}

                <TouchableOpacity onPress={handleNext} style={{ padding: 5 }}>
                  <ArrowCircleRight color={cor.focus.a} size={50} />
                </TouchableOpacity>
              </HStack>
            )}
          </S.main>
          {/* </KeyboardAvoidingView> */}
        </ScrollView>
      </S.Container>
    </Keyboard>
  );
}
