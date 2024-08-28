import React from 'react';
import { useForm } from 'react-hook-form';

import { Box, VStack } from 'native-base';
import * as y from 'yup';

import { Button } from '@/components/forms/Button';
import { FormInput } from '@/components/forms/FormInput';
import { api } from '@/services/api';
import { AppError } from '@/services/AppError';
import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _text } from '@/styles/sizes';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';
import Toast from '@/components/modals/toast/handler';

type TFormaData = {
  name: string;
  confirmation_pass: string;
  email: string;
  password: string;
};

interface IRequesMessage {
  type: 'sucess' | 'alert' | 'error';
  message: string;
}

const confirmationPasswordSchema = y
  .string()
  .oneOf([y.ref('password'), ''], 'A senha não confere')
  .required('Confirme sua senha');

const scheme = y.object({
  name: y.string().required('Informe seu nome completo'),
  email: y.string().email('E-mail inválido').required('Informe seu email'),
  password: y.string().required('Informe sua senha').min(6, 'Mínimo 6 digitos'),
  confirmation_pass: confirmationPasswordSchema,
});

export function SimpleCadastro() {
  const { navigate } = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormaData>({
    resolver: yupResolver(scheme),
  });

  const [showModal, setModal] = React.useState<boolean>(false);
  const [requestMessage, setRequestMessage] = React.useState<IRequesMessage>({
    type: 'error',
    message: '',
  });

  const submit = React.useCallback(
    async (data: any) => {
      try {
        await api.post('user/simple-register', data);
        setModal(!showModal);
        setRequestMessage({
          type: 'sucess',
          message: 'Cadastro realizado com sucesso!',
        });

        setTimeout(() => {
          navigate('login');
        }, 4000);
      } catch (error) {
        if (error instanceof AppError) {
          setModal(!showModal);
          setRequestMessage({ type: 'error', message: error.message });
        }
      }
    },
    [navigate, showModal],
  );

  return (
    <S.Container>
      <Toast
        message={requestMessage.message}
        type={requestMessage.type}
        isVisible={showModal}
        onClose={() => setModal(false)}
      />

      <Box w="full" pt="12" bg={cor.bgcolor} p="4">
        <S.title>Cadastre-se</S.title>
      </Box>

      <S.main>
        <S.subtitle>
          Finalize seu cadastro e faça parte do maior grupo de empresas do
          Brasil
        </S.subtitle>

        <VStack mt="8" space={4}>
          <FormInput
            label="Nome"
            error={errors.name}
            name="name"
            keyboardType="email-address"
            autoCapitalize="none"
            control={control}
            icon="user"
            placeholder="Nome completo"
          />

          <FormInput
            label="E-mail"
            error={errors.email}
            name="email"
            keyboardType="email-address"
            autoCapitalize="none"
            control={control}
            icon="user"
            placeholder="Seu email"
          />

          <FormInput
            label="Senha"
            error={errors.password}
            name="password"
            autoCapitalize="none"
            control={control}
            icon="lock"
            placeholder="Sua senha"
          />

          <FormInput
            label="Confirme sua senha"
            error={errors.confirmation_pass}
            name="confirmation_pass"
            autoCapitalize="none"
            control={control}
            icon="lock"
            placeholder="Nome completo"
          />
          <Box>
            <Button onPress={handleSubmit(submit)} />
            <Button
              bg_color={cor.text.lightSoft}
              title="Casastre-se com o Google"
            />
          </Box>
        </VStack>
        <Box mt="8">
          <S.text style={{ color: cor.text.lightSoft, fontSize: _text - 2 }}>
            Ao continuar, você concorda com os{' '}
            <S.text
              style={{
                color: cor.text.light,
                fontFamily: font.bold,
                textDecorationColor: cor.text.light,
                textDecorationLine: 'underline',
              }}
            >
              Termos de Serviços
            </S.text>{' '}
            e com a Política de Privacidade do g.e.b
          </S.text>
        </Box>
      </S.main>
    </S.Container>
  );
}
