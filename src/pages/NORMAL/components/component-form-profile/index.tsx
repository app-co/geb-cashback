/* eslint-disable consistent-return */
import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';

import { Box, HStack, useToast, VStack } from 'native-base';

import { Button } from '@/components/forms/Button';
import { FormInput } from '@/components/forms/FormInput';
import SucessHandler from '@/components/modals/sucess/handler';
import Toast from '@/components/modals/toast/handler';
import { Encrypt } from '@/components/templates/transactions/cripto';
import { useAuth } from '@/context/auth';
import { schemaLocality } from '@/hooks/fetchs/schemas';
import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  schemaCardToken,
  schemaProfile,
  schemaUser,
} from '../../Profile/dto/forms/schema';
import {
  TFormSaveCardToken,
  TFormUpdaProfile,
  TFormUpdateLocality,
  TFormUpdateUser,
} from '../../Profile/dto/forms/types';
import { useUpdates } from '../../Profile/hooks/mutations';
import * as S from './styles';

export function ComponentFormProfile() {
  const { user, logOut, updateUser } = useAuth();
  const { locality } = user;
  const updates = useUpdates();
  const [newCard, setNewCard] = React.useState<boolean>(false);

  const UserControll = useForm<TFormUpdateUser>({
    resolver: zodResolver(schemaUser),
    defaultValues: {
      name: user.name,
      email: user.email,
      id: user.id,
    },
  });

  const LocalityControl = useForm<TFormUpdateLocality>({
    resolver: zodResolver(schemaLocality),
    defaultValues: {
      city: locality.city,
      region_code: locality.region_code,
      postal_code: locality.postal_code,
      complement: locality.complement,
      street: locality.street,
      number: locality.number,
      id: locality.id,
      userId: user.id,
    },
  });

  const ProfileControl = useForm<TFormUpdaProfile>({
    resolver: zodResolver(schemaProfile),
    defaultValues: {
      born: user.profile.born,
      document: user.profile.document,
      profission: user.profile.profission,
      contato: user.profile.contato,
      userId: user.id,
    },
  });

  const SaveCardControl = useForm<TFormSaveCardToken>({
    resolver: zodResolver(schemaCardToken.omit({ encrypted: true })),
    defaultValues: {
      userId: user.id,
    },
  });

  const updateUserAccount = React.useCallback(
    async (input: TFormUpdateUser) => {
      try {
        await updates.upUser.mutateAsync(input);
        updateUser();

        Toast.show({
          title: 'Sucesso!',
          description: 'Seus dados pessoais foram atualizados',
        });
      } catch (error) {
        console.log({ error });
      }
    },
    [],
  );

  const updateLocality = React.useCallback(
    async (input: TFormUpdateLocality) => {
      try {
        await updates.upLocality.mutateAsync(input);
        updateUser();
        SucessHandler.message({
          title: 'Sucesso!',
          description: 'Seu endereço foi atualizado',
        });
      } catch (error) {
        console.log({ error });
      }
    },
    [],
  );

  const upateProfile = React.useCallback(async (obj: TFormUpdaProfile) => {
    try {
      await updates.upProfile.mutateAsync(obj);
      updateUser();
      SucessHandler.message({
        title: 'Sucesso!',
        description: 'Seus dados pessoal foi atualizado',
      });
    } catch (error) {
      console.log({ error });
    }
  }, []);

  const toast = useToast();

  async function saveCard(obj: TFormSaveCardToken) {
    const [mes, ano] = obj.expiry
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{2})/, '$1/$2/')
      .split('/')
      .map(String);

    const cript = Encrypt({
      expMonth: mes,
      expYear: `20${ano}`,
      number: obj.number,
      holder: obj.holder,
      securityCode: obj.ccv,
    });

    if (cript?.errors.length > 0) {
      return toast.show({
        title: 'Erro ao salvar cartão',
        description: cript.errors[0].message,
        placement: 'top',
        bg: 'red.500',
      });
    }

    const { encryptedCard } = cript;

    try {
      await updates.upCardToken.mutateAsync({
        token: encryptedCard,
        userId: user.id,
      });

      updateUser();

      SucessHandler.message({
        title: 'Sucesso!',
        description: 'Seu endereço foi atualizado',
      });

      setNewCard(false);
    } catch (error) { }
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
            error={UserControll.formState.errors?.name}
            name="name"
            keyboardType="email-address"
            autoCapitalize="none"
            control={UserControll.control}
            placeholder="Nome completo"
          />

          <FormInput
            label="E-mail"
            error={UserControll.formState.errors.email}
            name="email"
            keyboardType="email-address"
            autoCapitalize="none"
            control={UserControll.control}
            placeholder="Seu email"
          />

          <FormInput
            label="Nova senha"
            error={UserControll.formState.errors.password}
            name="password"
            autoCapitalize="none"
            control={UserControll.control}
            placeholder="Altere sua senha"
          />

          <Button
            onPress={UserControll.handleSubmit(updateUserAccount)}
            styleType="border"
            txt_color="#fff"
            load={updates.upUser.isLoading}
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
              Dados Pessoal
            </S.title>
          </Box>
          <FormInput
            label="Dt. Nacimento"
            error={ProfileControl.formState.errors?.born}
            name="born"
            keyboardType="numeric"
            autoCapitalize="none"
            control={ProfileControl.control}
            placeholder="dd/mês/ano"
          />

          <FormInput
            label="Profissão"
            error={ProfileControl.formState.errors.profission}
            name="profission"
            autoCapitalize="none"
            control={ProfileControl.control}
            placeholder="Seu email"
          />

          <FormInput
            label="Contato"
            error={ProfileControl.formState.errors.contato}
            name="contato"
            keyboardType="numeric"
            control={ProfileControl.control}
            placeholder="(99) 99999 9999"
          />

          <FormInput
            label="Documento pessoal"
            error={ProfileControl.formState.errors.document}
            name="document"
            keyboardType="numeric"
            control={ProfileControl.control}
            placeholder="cpf/cnpj"
          />

          <Button
            onPress={ProfileControl.handleSubmit(upateProfile)}
            styleType="border"
            txt_color="#fff"
            load={updates.upProfile.isLoading}
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
            error={LocalityControl.formState.errors.postal_code}
            name="postal_code"
            keyboardType="numeric"
            control={LocalityControl.control}
            placeholder="CEP"
            maxLength={8}
          />

          <HStack space={2} alignItems="center">
            <Box flex="1">
              <FormInput
                label="Cidade"
                error={LocalityControl.formState.errors.city}
                name="city"
                autoCapitalize="none"
                control={LocalityControl.control}
                placeholder="Cidade"
              />
            </Box>

            <Box w="80px">
              <FormInput
                label="UF"
                error={LocalityControl.formState.errors.region_code}
                name="region_code"
                autoCapitalize="characters"
                control={LocalityControl.control}
                placeholder="UF"
              />
            </Box>
          </HStack>

          <FormInput
            label="Complemento"
            error={LocalityControl.formState.errors.complement}
            name="complement"
            autoCapitalize="none"
            control={LocalityControl.control}
            icon="lock"
            placeholder="complemento"
          />

          <HStack space={2} alignItems="center">
            <Box flex="1">
              <FormInput
                label="Rua"
                error={LocalityControl.formState.errors.street}
                name="street"
                autoCapitalize="none"
                control={LocalityControl.control}
                placeholder="Rua"
              />
            </Box>

            <Box w="80px">
              <FormInput
                label="Nº"
                error={LocalityControl.formState.errors.number}
                name="number"
                keyboardType="numeric"
                control={LocalityControl.control}
                placeholder="número"
              />
            </Box>
          </HStack>

          <Button
            onPress={LocalityControl.handleSubmit(updateLocality)}
            styleType="border"
            txt_color="#fff"
            load={updates.upLocality.isLoading}
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
          <Box my={4}>
            <S.title style={{ color: cor.focus.a, fontFamily: font.bold }}>
              Meus cartões
            </S.title>

            {user?.cardToken && !newCard ? (
              <VStack>
                {user.cardToken.map(h => (
                  <Box p={4} mt={2} bg="gray.900">
                    <S.title>{h.brand}</S.title>
                    <S.title>{h.number}</S.title>
                  </Box>
                ))}
                <Button
                  styleType="border"
                  onPress={() => {
                    setNewCard(true);
                  }}
                  title="Atualizar cartão"
                  txt_color={cor.text.light}
                />
              </VStack>
            ) : (
              <Box style={{ gap: 10 }}>
                <Box my={2}>
                  <S.title
                    style={{ color: cor.focus.a, fontFamily: font.bold }}
                  >
                    Cadastre um novo cartão
                  </S.title>
                </Box>
                <FormInput
                  label="Nome impresso no cartão"
                  error={SaveCardControl.formState.errors.holder}
                  name="holder"
                  control={SaveCardControl.control}
                  placeholder="Digite o nome impresso no cartão"
                />

                <FormInput
                  control={SaveCardControl.control}
                  mask="card"
                  maxLength={19}
                  label="Número do cartão"
                  error={SaveCardControl.formState.errors.number}
                  name="number"
                  autoCapitalize="none"
                  keyboardType="numeric"
                  placeholder="Digite o número do cartão"
                />

                <HStack space={4} alignItems="center">
                  <Box flex="1">
                    <FormInput
                      control={SaveCardControl.control}
                      mask="date"
                      label="Vencimento"
                      error={SaveCardControl.formState.errors.expiry}
                      name="expiry"
                      autoCapitalize="none"
                      placeholder="mês/ano"
                      maxLength={5}
                    />
                  </Box>

                  <Box flex={1}>
                    <FormInput
                      control={SaveCardControl.control}
                      label="Código de secgurança"
                      error={SaveCardControl.formState.errors.ccv}
                      name="ccv"
                      autoCapitalize="characters"
                      placeholder="123"
                    />
                  </Box>
                </HStack>

                <Button
                  onPress={SaveCardControl.handleSubmit(saveCard)}
                  styleType="border"
                  txt_color="#fff"
                  load={updates.upCardToken.isLoading}
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
