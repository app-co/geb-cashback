import React from 'react';
import { useForm } from 'react-hook-form';

import { Box, VStack } from 'native-base';
import * as y from 'yup';

import Logo from '@/assets/logo.png';
import { FormInput } from '@/components/forms/FormInput';
import { Line } from '@/components/Line';
import { useAuth } from '@/context/auth';
import { cor } from '@/styles/cor';
import { _text } from '@/styles/sizes';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../components/forms/Button';
import * as S from './styles';

type TFormaData = {
  email: string;
  password: string;
};

const scheme = y.object({
  email: y.string().email('E-mail inválido').required('Informe seu email'),
  password: y.string().required('Informe sua senha').min(6, 'Mínimo 6 digitos'),
});

export function Login() {
  const { navigate } = useNavigation();
  const { login } = useAuth();
  const [shoModal, setShowModal] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormaData>({
    resolver: yupResolver(scheme),
  });

  const submit = React.useCallback(async (data: TFormaData) => {
    login(data);
  }, []);

  return (
    <S.Container>
      <S.img contentFit="contain" source={Logo} />

      <S.boxForm>
        <FormInput
          label="E-mail"
          error={errors.email}
          name="email"
          keyboardType="email-address"
          autoCapitalize="none"
          control={control}
          icon="mail"
          placeholder="Seu email"
        />

        <FormInput
          label="Senha"
          error={errors.password}
          name="password"
          control={control}
          icon="lock"
          placeholder="Sua senha"
        />
        <Box mt="4" w="full">
          <Button title="Entrar" load={false} onPress={handleSubmit(submit)} />
        </Box>
        <S.forgotPass onPress={() => setShowModal(true)}>
          <S.text style={{ color: cor.text.lightSoft }}>
            Esqueci minha senha
          </S.text>
        </S.forgotPass>
      </S.boxForm>

      <Box w="full" mt="4">
        <Line />
      </Box>

      <S.foot>
        <S.text>Ainda não possui uma conta?</S.text>

        <VStack w="full">
          <Button
            onPress={() => navigate('signUp')}
            title="Cadastre-se com o E-mail"
            styleType="border"
            txt_color={cor.text.light}
          />
          <Button
            title="Cadastre-se com o Google"
            bg_color={cor.text.lightSoft}
          />
        </VStack>

        <Box mt="8">
          <S.text style={{ color: cor.text.lightSoft, fontSize: _text - 2 }}>
            Ao continuar, você concorda com os{' '}
            <S.text
              style={{
                textDecorationColor: '#fff',
                textDecorationLine: 'underline',
              }}
            >
              Termos de Serviços
            </S.text>{' '}
            e com a Política de Privacidade do g.e.b
          </S.text>
        </Box>
      </S.foot>
    </S.Container>
  );
}
