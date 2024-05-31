import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
} from 'react-native';

import { Box, Center, HStack, ScrollView, useToast } from 'native-base';
import { ArrowCircleLeft, ArrowCircleRight } from 'phosphor-react-native';
import { z } from 'zod';

import { useAuth } from '@/context/auth';
import { useStepByStep } from '@/context/step-by-step';
import { api } from '@/services/api';
import { AppError } from '@/services/AppError';
import { pathsRoutes } from '@/services/schemeRoutes';
import { cor } from '@/styles/cor';
import { yupResolver } from '@hookform/resolvers/yup';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

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

type TLocality = z.infer<typeof schemaLocality>;

type TCadastroParams = {
  type: 'search' | 'extra_cash' | 'businnes';
  session?: boolean;
};

export function FullCadastro() {
  const { params } = useRoute();
  const { updateUser } = useAuth();

  const { type, session } = params as TCadastroParams;
  const [load, setLoad] = React.useState<boolean>(false);

  const { goBack, navigate } = useNavigation();
  const toast = useToast();
  const [token, setToken] = React.useState<string>('');

  const controlA = useForm<IA>({
    resolver: yupResolver(schemeA),
  });

  const controlB = useForm<IB>({
    resolver: yupResolver(shcmeB),
  });

  const controlLocality = useForm<TLocality>({
    resolver: zodResolver(schemaLocality),
  });

  const components = [
    <A control={controlA.control} error={controlA.formState.errors} />,
    <B control={controlB.control} error={controlB.formState.errors} />,
    <Locality
      control={controlLocality.control}
      error={controlLocality.formState.errors}
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
    async (input: any) => {
      setLoad(true);
      try {
        await api.post(pathsRoutes.register.user, input);

        const { data } = await api.post(pathsRoutes.session.user, {
          email: input.email,
          password: input.password,
        });

        setToken(data.token);
        setLoad(false);

        changeStep(currentStep + 1);
      } catch (error) {
        if (error instanceof AppError) {
          toast.show({
            title: 'Erro ao fazer login',
            description: error.message,
            placement: 'bottom',
            bg: 'red.500',
          });
        }
      }
    },
    [changeStep, currentStep],
  );

  const handleProfile = React.useCallback(
    async (input: IB) => {
      setLoad(true);
      try {
        await api.post(pathsRoutes.register.profile, input);
        updateUser();

        setLoad(false);
        changeStep(currentStep + 1);
      } catch (error) {
        setLoad(false);
        if (error instanceof AppError) {
          toast.show({
            description: error.message,
            bg: 'red.600',
          });
        }
      }
    },
    [changeStep, currentStep],
  );

  const handleLocality = React.useCallback(
    async (input: TLocality) => {
      try {
        await api.post(pathsRoutes.register.locality, input);

        setLoad(false);
        changeStep(currentStep + 1);
      } catch (error) {
        setLoad(false);
      }
    },
    [changeStep, currentStep],
  );

  useFocusEffect(
    useCallback(() => {
      if (session) {
        changeStep(1);
      }
    }, [changeStep, session]),
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
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
          <S.main>
            <Box>{currentComponent}</Box>

            <HStack w="full" justifyContent="space-between">
              {session && <Box />}
              {!session && (
                <TouchableOpacity
                  onPress={() => preview()}
                  style={{ padding: 5 }}
                >
                  <ArrowCircleLeft color={cor.focus.a} size={50} />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={submit[currentStep]}
                style={{ padding: 5 }}
              >
                <ArrowCircleRight color={cor.focus.a} size={50} />
              </TouchableOpacity>
            </HStack>
          </S.main>
        </KeyboardAvoidingView>
      </ScrollView>
    </S.Container>
  );
}
