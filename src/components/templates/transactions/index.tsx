/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { useForm } from 'react-hook-form';
import { Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useQuery } from 'react-query';

import * as Clipboard from 'expo-clipboard';

import { Box, Center, HStack, Image, useToast, VStack } from 'native-base';

import { Button } from '@/components/forms/Button';
import { FormInput } from '@/components/forms/FormInput';
import { Selection } from '@/components/forms/Selection';
import { Loading } from '@/components/Loading';
import { useAuth } from '@/context/auth';
import { Fetch } from '@/hooks/fetchs';
import {
  schemaPayWithCard,
  schemaSaveCardToken,
  schemaTransaction,
} from '@/hooks/fetchs/schemas';
import { TCardToken, TPayWithCard, TTransaction } from '@/hooks/fetchs/types';
import { useCashInPix, usePayCard, usePayMoney, useSaveCardToken } from '@/hooks/mutations';
import { AppError } from '@/services/AppError';
import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _toNumber, convertNumberToCurrency } from '@/utils/unidades';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRoute } from '@react-navigation/native';

import { installments } from './installments';
import * as S from './styles';

type TPaymentType = 'pix' | 'card' | 'money' | '';

const fetch = new Fetch();

function passNumber(e: string): number {
  let value = e.replace(/\D/g, '');
  value = value.length <= 2 ? value : (Number(value) / 100).toString();

  return Number(value);
}

export function Transactions() {
  const { user, updateUser } = useAuth();
  const registerCard = useSaveCardToken();
  const payWihCard = usePayCard();
  const payMoney = usePayMoney()

  const { mutateAsync, isLoading: load } = useCashInPix();

  const { providerId } = useRoute().params as { providerId: string };
  const toast = useToast();

  const [imageQrcode, setImageQrcode] = React.useState<{
    img: string;
    text: string;
  }>();
  const [cardToken, setCardToken] = React.useState<string>(
    user?.cardToken?.token ?? '',
  );
  const [selectedInstallments, setInstallmens] = React.useState<string>('1');

  const [selectedTypePayment, setSelectTypePayment] =
    React.useState<TPaymentType>('');

  const control = useForm<TTransaction>({
    resolver: zodResolver(schemaTransaction),
  });

  const controlResgisterCard = useForm<TCardToken>({
    resolver: zodResolver(
      schemaSaveCardToken.omit({
        expiryMonth: true,
        expiryYear: true,
        remoteIp: true,
        userId: true,
      }),
    ),
  });

  const controlPayWithCard = useForm<TPayWithCard>({
    resolver: zodResolver(schemaPayWithCard.omit({ cardToken: true })),
  });

  async function saveCard(input: TCardToken) {
    const [dia, mes, ano] = input.expiry
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
      .split('/')
      .map(String);

    try {
      await registerCard.mutateAsync({
        card_number: input.card_number,
        holderName: input.holderName,
        expiryMonth: (Number(mes) - 1).toString(),
        expiryYear: ano,
        ccv: input.ccv,
        remoteIp: '127.0.0.1',
        userId: user.id,
      });

      updateUser();
    } catch (error) { }
  }

  const { data, isLoading } = useQuery('company', async () =>
    fetch.getCompanyById(providerId),
  );

  async function cashInPix(input: TTransaction) {
    setSelectTypePayment('pix');
    const dt = {
      value: passNumber(input.value),
      companyId: providerId,
      clientCashback: passNumber(input.valueCache ?? '0'),
      userId: user.id,
      paymentType: 'pix' as 'pix' | 'card' | 'money',
    };

    try {
      const pay = await mutateAsync(dt);
      setImageQrcode({
        img: pay.image,
        text: pay.payload,
      });
      updateUser();
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
  }

  async function cashInCard(item: TTransaction) {
    try {
      const dt = {
        ...item,
        value: _toNumber(item.value),
        cardToken,
        installment: Number(selectedInstallments),
        companyId: providerId,
      };

      await payWihCard.mutateAsync(dt);
      toast.show({
        title: 'Compra finalizada com sucesso',
        placement: 'top',
        bg: 'green.500',
      });
      updateUser();
    } catch (error) {
      if (error instanceof AppError) {
        toast.show({
          title: 'Erro ao pagar com cartão',
          description: error.message,
          placement: 'top',
          bg: 'red.500',
        });
      }
    }
  }

  async function cashInMoney(item: TTransaction) {
    try {
      const dt = {
        value: _toNumber(item.value),
        companyId: providerId,
        clientCashback: _toNumber(item.valueCache ?? '0'),
        userId: user.id,
      }

      await payMoney.mutateAsync(dt);
    } catch (error) {
      
    }
  }

  async function submit(item: TTransaction) {
    switch (selectedTypePayment) {
      case 'pix':
        break;
      case 'card':
        break;
      case 'money':
        break;

      default:
        break;
    }
  }

  async function qrCodeCopy() {
    await Clipboard.setStringAsync(imageQrcode!.text);
    Alert.alert('Texto copiado');
  }

  const value = control.getValues('value');
  const parcelamento = installments(value ?? '0');

  if (isLoading) {
    <Loading />;
  }

  if (load) {
    return <Loading />;
  }

  const casheback = convertNumberToCurrency(user.wallet.amount_cashback);

  return (
    <S.container>
      <HStack justifyContent="space-between">
        <Box style={{ gap: 8 }}>
          <S.text>Empresa</S.text>
          <S.title>
            {data?.name} - {data?.segmento}
          </S.title>
        </Box>
        <Box style={{ gap: 8 }}>
          <S.text>Meu Cachback</S.text>
          <S.boxCache>
            <S.title style={{ color: cor.text.black }}>{casheback}</S.title>
          </S.boxCache>
        </Box>
      </HStack>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <S.content>
          <FormInput
            mask="money"
            label="Valor da compra"
            control={control.control}
            name="value"
            error={control.formState.errors.value}
            keyboardType="numeric"
            placeholder="Digite o valor total da sua compra"
            onChange={() => {
              setImageQrcode({});
            }}
          />

          <FormInput
            mask="money"
            label="Pagar com Cashback"
            control={control.control}
            error={control.formState.errors.valueCache}
            keyboardType="numeric"
            name="valueCache"
            placeholder="Digite quanto você irá utilizar do seu cachback"
          />

          {selectedTypePayment === 'card' && (
            <Selection
              label="Parcelas"
              placeholder={`1 x ${convertNumberToCurrency(_toNumber(value))}`}
              itemSelected={h => setInstallmens(h)}
              itens={parcelamento}
            />
          )}
        </S.content>

        <S.content>
          <Center mt={2}>
            <S.title>Abater com</S.title>
          </Center>
          <HStack alignItems="center" justifyContent="space-evenly">
            <TouchableOpacity onPress={control.handleSubmit(cashInPix)}>
              <S.boxTypePayment selected={selectedTypePayment === 'pix'}>
                <S.textTypePyament select={selectedTypePayment === 'pix'}>
                  PIX
                </S.textTypePyament>
              </S.boxTypePayment>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectTypePayment('card')}>
              <S.boxTypePayment selected={selectedTypePayment === 'card'}>
                <S.textTypePyament select={selectedTypePayment === 'card'}>
                  CARTÃO
                </S.textTypePyament>
              </S.boxTypePayment>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectTypePayment('money')}>
              <S.boxTypePayment selected={selectedTypePayment === 'money'}>
                <S.textTypePyament select={selectedTypePayment === 'money'}>
                  DINHEIRO
                </S.textTypePyament>
              </S.boxTypePayment>
            </TouchableOpacity>
          </HStack>
        </S.content>

        <S.content>
          {selectedTypePayment === 'card' && (
            <Box>
              {/* <Selection
                itens={[]}
                itemSelected={h => console.log(h)}
                placeholder="Selecione um cartão"
              /> */}

              <Box>
                {user?.cardToken ? (
                  <VStack space={4}>
                    <Center borderRadius={8} mb={4} p={4} mt={2} bg="gray.900">
                      <S.title>{user?.cardToken.brand}</S.title>
                      <S.title>...{user.cardToken.number}</S.title>
                    </Center>

                    <Button
                      onPress={control.handleSubmit(cashInCard)}
                      title="Finalizar compra"
                      load={payWihCard.isLoading}
                    />

                    <Button
                      styleType="border"
                      onPress={() => { }}
                      title="Pagar com outro cartão"
                      txt_color={cor.text.light}
                    />
                  </VStack>
                ) : (
                  <Box>
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
                      error={controlResgisterCard.formState.errors.holderName}
                      name="holderName"
                      control={controlResgisterCard.control}
                      placeholder="Digite o nome impresso no cartão"
                    />

                    <FormInput
                      control={controlResgisterCard.control}
                      mask="card"
                      maxLength={19}
                      label="Número do cartão"
                      error={controlResgisterCard.formState.errors.card_number}
                      name="card_number"
                      autoCapitalize="none"
                      keyboardType="numeric"
                      placeholder="Digite o número do cartão"
                    />

                    <HStack space={2} alignItems="center">
                      <Box flex="1">
                        <FormInput
                          control={controlResgisterCard.control}
                          mask="date"
                          label="Vencimento"
                          error={controlResgisterCard.formState.errors.expiry}
                          name="expiry"
                          autoCapitalize="none"
                          placeholder="dd/mm/yyyy"
                          maxLength={10}
                        />
                      </Box>

                      <Box flex={1}>
                        <FormInput
                          control={controlResgisterCard.control}
                          label="Código de secgurança"
                          error={controlResgisterCard.formState.errors.ccv}
                          name="ccv"
                          autoCapitalize="characters"
                          placeholder="123"
                        />
                      </Box>
                    </HStack>

                    <Button
                      onPress={controlResgisterCard.handleSubmit(saveCard)}
                      styleType="border"
                      txt_color="#fff"
                    />
                  </Box>
                )}
              </Box>
            </Box>
          )}
          {selectedTypePayment === 'pix' && imageQrcode?.text && (
            <Center style={{ gap: 10 }}>
              <Image
                source={{ uri: `data:image/jpeg;base64,${imageQrcode.img}` }}
                alt="qrcode image"
                size="250px"
              />

              <TouchableOpacity onPress={qrCodeCopy}>
                <S.title>Qrcode copia e cola</S.title>
              </TouchableOpacity>
            </Center>
          )}
          {selectedTypePayment === 'money' && (
            <S.title>
              Após o pagamento do seu produto, clique em finalizar a compra para
              validar seu cacheback
            </S.title>
          )}
          {/* <Button title="FINALIZAR COMPRA" /> */}
        </S.content>
      </ScrollView>
    </S.container>
  );
}
