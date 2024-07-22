import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';

import { Box, HStack, useToast, VStack } from 'native-base';

import { Button } from '@/components/forms/Button';
import { FormInput } from '@/components/forms/FormInput';
import { useAuth } from '@/context/auth';
import {
  schemaLocality,
  schemaSaveCardToken,
  schemaUserUpdate,
} from '@/hooks/fetchs/schemas';
import {
  TCardToken,
  TLocality,
  TUpdateUser,
  TUser,
} from '@/hooks/fetchs/types';
import { useSaveCardToken } from '@/hooks/mutations';
import { api } from '@/services/api';
import { AppError } from '@/services/AppError';
import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { zodResolver } from '@hookform/resolvers/zod';

import * as S from './styles';

export function ComponentFormProfile() {
  const { user, logOut, updateUser } = useAuth();
  const { locality } = user;
  const controlUser = useForm<TUpdateUser>({
    resolver: zodResolver(schemaUserUpdate),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const toast = useToast();

  const registerCardToken = useSaveCardToken();

  const controlCardToken = useForm<TCardToken>({
    resolver: zodResolver(
      schemaSaveCardToken.omit({
        expiryMonth: true,
        expiryYear: true,
        remoteIp: true,
        userId: true,
      }),
    ),
  });

  const controlLocality = useForm<TLocality>({
    resolver: zodResolver(schemaLocality.omit({ id: true, userId: true })),
    defaultValues: {
      city: locality.city,
      region_code: locality.region_code,
      postal_code: locality.postal_code,
      complement: locality.complement,
      street: locality.street,
      number: locality.number,
    },
  });

  const updateUserAccount = React.useCallback(async (input: TUser) => {
    try {
      await api.put('/user/update', input);
    } catch (error) {
      console.log({ error });
    }
  }, []);

  const updateLocality = React.useCallback(async (input: TLocality) => { }, []);

  async function saveCard(input: TCardToken) {
    const [mes, ano] = input.expiry
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{2})/, '$1/20$2')
      .split('/')
      .map(String);

    try {
      const dt = {
        card_number: input.card_number,
        holderName: input.holderName,
        expiryMonth: Number(mes).toString(),
        expiryYear: ano,
        ccv: input.ccv,
        remoteIp: '127.0.0.1',
        userId: user.id,
      };

      await registerCardToken.mutateAsync(dt);

      updateUser();
    } catch (error) {
      if (error instanceof AppError) {
        toast.show({
          title: 'Erro ao salvar cartão',
          description: error.message,
          placement: 'bottom',
          bg: 'red.500',
        });
      }
    }
  }

  return (
    <S.Container>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <VStack
          space={4}
          borderWidth={1}
          borderColor={cor.focus.b}
          style={{
            shadowColor: '#eeff2e',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
          }}
          mt="8"
          bg={cor.bgcolor}
          p={4}
          borderRadius={10}
        >
          <Box my={8}>
            <S.title style={{ color: cor.focus.a, fontFamily: font.bold }}>
              Dados de acesso
            </S.title>
          </Box>
          <FormInput
            label="Nome"
            error={controlUser.formState.errors?.name}
            name="name"
            keyboardType="email-address"
            autoCapitalize="none"
            control={controlUser.control}
            placeholder="Nome completo"
          />

          <FormInput
            label="E-mail"
            error={controlUser.formState.errors.email}
            name="email"
            keyboardType="email-address"
            autoCapitalize="none"
            control={controlUser.control}
            placeholder="Seu email"
          />

          <FormInput
            label="Nova senha"
            error={controlUser.formState.errors.password}
            name="password"
            autoCapitalize="none"
            control={controlUser.control}
            placeholder="Altere sua senha"
          />

          <Button
            onPress={controlUser.handleSubmit(updateUserAccount)}
            styleType="border"
            txt_color="#fff"
          />
        </VStack>

        <VStack
          space={4}
          borderWidth={1}
          borderColor={cor.focus.b}
          style={{
            shadowColor: '#eeff2e',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
          }}
          mt="8"
          bg={cor.bgcolor}
          p={4}
          borderRadius={10}
        >
          <Box my={8}>
            <S.title style={{ color: cor.focus.a, fontFamily: font.bold }}>
              Endereço
            </S.title>
          </Box>
          <FormInput
            label="CEP"
            error={controlLocality.formState.errors.postal_code}
            name="postal_code"
            keyboardType="numeric"
            control={controlLocality.control}
            placeholder="CEP"
            maxLength={8}
          />

          <HStack space={2} alignItems="center">
            <Box flex="1">
              <FormInput
                label="Cidade"
                error={controlLocality.formState.errors.city}
                name="city"
                autoCapitalize="none"
                control={controlLocality.control}
                placeholder="Cidade"
              />
            </Box>

            <Box w="80px">
              <FormInput
                label="UF"
                error={controlLocality.formState.errors.region_code}
                name="region_code"
                autoCapitalize="characters"
                control={controlLocality.control}
                placeholder="UF"
              />
            </Box>
          </HStack>

          <FormInput
            label="Complemento"
            error={controlLocality.formState.errors.complement}
            name="complement"
            autoCapitalize="none"
            control={controlLocality.control}
            icon="lock"
            placeholder="complemento"
          />

          <HStack space={2} alignItems="center">
            <Box flex="1">
              <FormInput
                label="Rua"
                error={controlLocality.formState.errors.street}
                name="street"
                autoCapitalize="none"
                control={controlLocality.control}
                placeholder="Rua"
              />
            </Box>

            <Box w="80px">
              <FormInput
                label="Nº"
                error={controlLocality.formState.errors.number}
                name="number"
                keyboardType="numeric"
                control={controlLocality.control}
                placeholder="número"
              />
            </Box>
          </HStack>

          <Button
            onPress={controlLocality.handleSubmit(updateLocality)}
            styleType="border"
            txt_color="#fff"
          />
        </VStack>

        <VStack
          mb={10}
          space={4}
          borderWidth={1}
          borderColor={cor.focus.b}
          style={{
            shadowColor: '#eeff2e',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
          }}
          mt="8"
          bg={cor.bgcolor}
          p={4}
          borderRadius={10}
        >
          <Box my={8}>
            <S.title style={{ color: cor.focus.a, fontFamily: font.bold }}>
              Meus cartões
            </S.title>
            {user?.cardToken ? (
              <VStack>
                <Box p={4} mt={10} bg="gray.900">
                  <S.title>{user?.cardToken.brand}</S.title>
                  <S.title>...{user.cardToken.number}</S.title>
                </Box>
                <Button
                  styleType="border"
                  onPress={() => { }}
                  title="Atualizar cartão"
                  txt_color={cor.text.light}
                />
              </VStack>
            ) : (
              <Box style={{ gap: 10 }}>
                <S.title>Nenhum cartão registrado</S.title>
                <Box my={2}>
                  <S.title
                    style={{ color: cor.focus.a, fontFamily: font.bold }}
                  >
                    Cadastre seu cartão de crédito
                  </S.title>
                </Box>
                <FormInput
                  label="Nome impresso no cartão"
                  error={controlCardToken.formState.errors.holderName}
                  name="holderName"
                  control={controlCardToken.control}
                  placeholder="Digite o nome impresso no cartão"
                />

                <FormInput
                  control={controlCardToken.control}
                  mask="card"
                  maxLength={19}
                  label="Número do cartão"
                  error={controlCardToken.formState.errors.card_number}
                  name="card_number"
                  autoCapitalize="none"
                  keyboardType="numeric"
                  placeholder="Digite o número do cartão"
                />

                <HStack space={4} alignItems="center">
                  <Box flex="1">
                    <FormInput
                      control={controlCardToken.control}
                      mask="date"
                      label="Vencimento"
                      error={controlCardToken.formState.errors.expiry}
                      name="expiry"
                      autoCapitalize="none"
                      placeholder="mês/ano"
                      maxLength={5}
                    />
                  </Box>

                  <Box flex={1}>
                    <FormInput
                      control={controlCardToken.control}
                      label="Código de secgurança"
                      error={controlCardToken.formState.errors.ccv}
                      name="ccv"
                      autoCapitalize="characters"
                      placeholder="123"
                    />
                  </Box>
                </HStack>

                <Button
                  onPress={controlCardToken.handleSubmit(saveCard)}
                  styleType="border"
                  txt_color="#fff"
                  load={registerCardToken.isLoading}
                />
              </Box>
            )}
          </Box>
        </VStack>

        <Button title="SAIR DA CONTA" onPress={() => logOut()} />
      </ScrollView>
    </S.Container>
  );
}
