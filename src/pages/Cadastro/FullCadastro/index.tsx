import React, { useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Modal, TouchableOpacity } from 'react-native';

import { Box, Center, HStack, ScrollView, useToast } from 'native-base';
import { ArrowCircleLeft, ArrowCircleRight } from 'phosphor-react-native';
import { z } from 'zod';

import { Button } from '@/components/forms/Button';
import { useAuth } from '@/context/auth';
import { useStepByStep } from '@/context/step-by-step';
import { useSignUp } from '@/hooks/mutations';
import { AppError } from '@/services/AppError';
import { cor } from '@/styles/cor';
import { yupResolver } from '@hookform/resolvers/yup';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';

import { A } from '../steps/A';
import { B } from '../steps/B';
import { Locality } from '../steps/locality';
import { schemaLocality, schemeA, shcmeB } from './schemes';
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

export type TLocality = z.infer<typeof schemaLocality>;

type TAction =
  | { step: 0; payload: IA }
  | { step: 1; payload: IB }
  | { step: 2; payload: Omit<TLocality, 'id'> };

type TState = {
  user: IA;
  profile: Omit<IB, 'id'>;
  locality: Omit<TLocality, 'id'>;
};

const initialState: TState = {
  locality: {
    city: '',
    region_code: '',
    postal_code: '',
    complement: '',
    street: '',
    number: '',
  },
  profile: {
    born: '',
    profission: '',
    contato: '',
    document: '',
  },
  user: {
    name: '',
    email: '',
    password: '',
    confirmation_pass: '',
  },
};

export function FullCadastro() {
  const { updateUser } = useAuth();
  const { isLoading, mutateAsync } = useSignUp();

  function reducer(state: TState, action: TAction) {
    switch (action.step) {
      case 0:
        return { ...state, user: action.payload };
      case 1:
        return { ...state, profile: action.payload };
      case 2:
        return { ...state, locality: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const [load, setLoad] = React.useState<boolean>(false);

  const { goBack, navigate } = useNavigation();
  const toast = useToast();

  const controlA = useForm<IA>({
    resolver: yupResolver(schemeA),
  });

  const controlB = useForm<IB>({
    resolver: yupResolver(shcmeB),
  });

  const controlLocality = useForm<Omit<TLocality, 'id'>>({
    resolver: zodResolver(schemaLocality.omit({ id: true })),
  });

  const components = [
    <A control={controlA.control} error={controlA.formState.errors} />,
    <B
      setValue={controlB.setValue}
      control={controlB.control}
      error={controlB.formState.errors}
    />,
    <Locality
      control={controlLocality.control}
      error={controlLocality.formState.errors}
      getCep={h => {
        controlLocality.setValue('postal_code', h.cep);
        controlLocality.setValue('city', h.city);
        controlLocality.setValue('street', h.street);
        controlLocality.setValue('region_code', h.state);
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

  const handleUser = React.useCallback(
    async (input: IA) => {
      setLoad(true);
      dispatch({ step: 0, payload: input });
      changeStep(currentStep + 1);
      setLoad(false);
    },
    [changeStep, currentStep],
  );

  const handleProfile = React.useCallback(
    async (input: IB) => {
      setLoad(true);
      dispatch({ step: 1, payload: input });
      changeStep(currentStep + 1);

      setLoad(false);
    },
    [changeStep, currentStep],
  );

  const handleLocality = React.useCallback(
    async (input: Omit<TLocality, 'id'>) => {
      setLoad(true);
      dispatch({ step: 2, payload: input });
    },
    [changeStep, currentStep],
  );

  const handleSave = React.useCallback(
    async (L: Omit<TLocality, 'id'>) => {
      const { user, profile } = state;
      try {
        const U = {
          name: user.name,
          email: user.email,
          password: user.password,
          account_type: 'normal' as any,
        };

        await mutateAsync({ U, P: profile, L });
        navigate('login');
      } catch (error) {
        if (error instanceof AppError) {
          toast.show({
            title: 'Erro ao salvar',
            description: error.message,
            placement: 'bottom',
            bg: 'red.500',
          });
        }
      }
    },
    [mutateAsync, navigate, state],
  );

  const submit = {
    0: controlA.handleSubmit(handleUser),
    1: controlB.handleSubmit(handleProfile),
    2: controlLocality.handleSubmit(handleLocality),
  };

  return (
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
                  onPress={controlLocality.handleSubmit(handleSave)}
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

              <TouchableOpacity
                onPress={submit[currentStep]}
                style={{ padding: 5 }}
              >
                <ArrowCircleRight color={cor.focus.a} size={50} />
              </TouchableOpacity>
            </HStack>
          )}
        </S.main>
        {/* </KeyboardAvoidingView> */}
      </ScrollView>
    </S.Container>
  );
}
