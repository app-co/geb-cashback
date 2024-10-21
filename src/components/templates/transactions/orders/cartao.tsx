/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
import React from 'react';
import { useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';

import { Box, Center, HStack, useToast, VStack } from 'native-base';
import { ZodError } from 'zod';

import { Button } from '@/components/forms/Button';
import { FormInput } from '@/components/forms/FormInput';
import { FormSelection } from '@/components/forms/FormSelection';
import GlobalErrorModalHandler from '@/components/modals/global-error/handler';
import Toast from '@/components/modals/toast/handler';
import { useAuth } from '@/context/auth';
import { AppError } from '@/services/AppError';
import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { _currencyToNumber, convertNumberToCurrency } from '@/utils/unidades';
import { zodResolver } from '@hookform/resolvers/zod';
import {PUBLIC_KEY} from '@env'

import { Encrypt } from '../cripto';
import {
  TPayNotSaveCard,
  TSchemaCard
} from '../hooks/dto/types';
import { usePagamento } from '../hooks/mutations';
import { schemaObjPayCard, schemaPayNoCardSaveCard } from '../hooks/schemas';
import { installments } from '../installments';
import * as S from '../styles';

interface I {
  providerId: string;
  setPaymentType: (paymentType: string) => void;
  paymentType: 'card' | 'pix' | 'money';
  ref: () => void;
}
export function Card({ providerId, setPaymentType, ref, paymentType }: I) {
  const { user, updateUser } = useAuth();
  const { payCard, saveCard } = usePagamento();
  const toast = useToast();
  const casheback = Number(user!.wallet!.amount_cashback);

  const token = user?.cardToken
    ? user!.cardToken.token
    : ''


  const {
    control,
    formState: { errors },
    handleSubmit,
    trigger,
    watch,
  } = useForm<TPayNotSaveCard>({
    resolver: zodResolver(schemaPayNoCardSaveCard.omit({ encrypted: true })),
    defaultValues: {
      userId: user.id,
      companyId: providerId,
      cachebakCliente: '0',
      installments: '1',
    },
  });

  const controlCardToken = useForm<TSchemaCard>({
    resolver: zodResolver(schemaObjPayCard),
    defaultValues: {
      userId: user.id,
      companyId: providerId,
      holder: user.name,
      cachebakCliente: '0',
      installments: '1',
      encrypted: token
    },
  })


  async function cashInCard(obj: TSchemaCard) {
    try {
      const dt = {
        ...obj,
        cardToken: token
      };

      if (obj.cachebakCliente > casheback) {
        return Toast.show({
          title: 'Saldo insuficiente',
          description: 'Você não possui saldo de cacheback suficiente para realizar este pagamento.',
          tipo: 'warning'
        })
      }


      await payCard.mutateAsync(dt);
      Toast.show({
        title: 'Pagamento realizado',
        description: 'Seu pagamento foi realizado com sucesso.',
        tipo: 'success'
      })
      updateUser();
    } catch (error) {
      console.log(error)
      if (error instanceof AppError) {
        Toast.show({
          title: 'Erro ao pagar com cartão',
          description: error.message,
          tipo: 'warning',
        });
      }
    }
  }



  async function payNotCardSave(obj: TPayNotSaveCard) {
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
      public_key: PUBLIC_KEY
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


    const dt = {
      value: String(watch('value')),
      cachebakCliente: String(watch('cachebakCliente')),
      companyId: providerId,
      encrypted: encryptedCard,
      holder: user.name,
      paymentType: 'card' as 'pix' | 'card' | 'money',
      installments: String(watch('installments')),
      store: true,
      userId: user.id,
      cvv: obj.ccv
    };


    try {
      const schema = schemaObjPayCard.parse(dt);

      const pay = await payCard.mutateAsync(schema);

      const cardTokek = {
        token: pay[0].payment_method.card.id,
        brand: pay[0].payment_method.card.brand,
        userId: user.id,
        number: pay[0].payment_method.card.first_digits
      };

      await saveCard.mutateAsync(cardTokek);

      Toast.show({
        title: 'Pagamento realizado',
        description: 'Seu pagamento foi realizado com sucesso.',
        tipo: 'success'
      })

      GlobalErrorModalHandler.setTitle({
        title: 'Atenção',
        description: 'Para sua comodidade, o token do seu cartão será salvo em nossa base de dados. Não salvamos sua SENHA, código de segurança ou o número completo do cartão.'
      })

      updateUser()


    } catch (error) {
      console.log('erro =>', error)
      if (error instanceof ZodError) {
        const { message, path } = error.issues[0]


        GlobalErrorModalHandler.setTitle({ title: 'Erro de validação', description: `${path}, ${message}` })
      }
    }


    // await saveCard.mutateAsync(dt);
  }


  const valor = watch('value');

  const valorS = controlCardToken.watch('value');



  return (
    <Box>
      {user?.cardToken ? (
        <S.content>
          <FormInput
            mask="money"
            label="Valor da compra"
            control={controlCardToken.control}
            name="value"
            error={controlCardToken.formState.errors.value}
            keyboardType="numeric"
            placeholder="Digite o valor total da sua compra"
          />

          <FormInput
            mask="money"
            label="Pagar com Cashback"
            control={controlCardToken.control}
            error={controlCardToken.formState.errors.cachebakCliente}
            keyboardType="numeric"
            name="cachebakCliente"
            placeholder="Digite quanto você irá utilizar do seu cachback"
          />
        </S.content>

      ) : (
        <S.content>
          <FormInput
            mask="money"
            label="Valor da compra"
            control={control}
            name="value"
            error={errors.value}
            keyboardType="numeric"
            placeholder="Digite o valor total da sua compra"
          />

          <FormInput
            mask="money"
            label="Pagar com Cashback"
            control={control}
            error={errors.cachebakCliente}
            keyboardType="numeric"
            name="cachebakCliente"
            placeholder="Digite quanto você irá utilizar do seu cachback"
          />
        </S.content>

      )}

      <S.content>
        <Center mt={2}>
          <S.title>Abater com</S.title>
        </Center>
        <HStack alignItems="center" justifyContent="space-evenly">
          <TouchableOpacity
            onPress={() => {
              setPaymentType('pix');
            }}
          >
            <S.boxTypePayment selected={paymentType === 'pix'}>
              <S.textTypePyament select={paymentType === 'pix'}>
                PIX
              </S.textTypePyament>
            </S.boxTypePayment>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPaymentType('card');
            }}
          >
            <S.boxTypePayment selected={paymentType === 'card'}>
              <S.textTypePyament select={paymentType === 'card'}>
                CARTÃO
              </S.textTypePyament>
            </S.boxTypePayment>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPaymentType('money')}>
            <S.boxTypePayment selected={paymentType === 'money'}>
              <S.textTypePyament select={paymentType === 'money'}>
                DINHEIRO
              </S.textTypePyament>
            </S.boxTypePayment>
          </TouchableOpacity>
        </HStack>
      </S.content>

      <S.content>

        <Box>
          {user?.cardToken ? (
            <VStack space={4}>

              {user?.cardToken && (
                <Center borderRadius={8} mb={4} p={4} borderWidth={1} borderColor={cor.focus.a} mt={2} bg="gray.900">
                  <Box mb={6} >
                    <S.title>{user?.cardToken.brand}</S.title>
                    <S.title>...{user.cardToken.number}</S.title>
                  </Box>



                  <FormInput
                    control={controlCardToken.control}
                    label="Código de secgurança"
                    error={controlCardToken.formState.errors.cvv}
                    name="cvv"
                    autoCapitalize="characters"
                    placeholder="ccv"
                  />

                  <Box w="full" mt={4} flex={1} >
                    <FormSelection
                      control={control}
                      name="installments"
                      error={errors.installments}
                      placeholder={`1 x ${convertNumberToCurrency(_currencyToNumber(String(valorS))) ?? 'R$ 0,00'
                        }`}
                      itens={installments(String(valorS) ?? '0')}
                    />
                  </Box>


                </Center>

              )}

              <Button
                onPress={controlCardToken.handleSubmit(cashInCard)}
                title="Finalizar compra"
                load={payCard.isLoading}
              />
              {/* 
              <Button
                styleType="border"
                onPress={() => { }}
                title="Pagar com outro cartão"
                txt_color={cor.text.light}
              /> */}
            </VStack>
          ) : (
            <Box>
              <S.title>Nenhum cartão registrado</S.title>
              <Box my={2}>
                <S.title
                  style={{
                    color: cor.focus.a,
                    marginTop: 20,
                    fontFamily: font.bold,
                  }}
                >
                  Dados do seu cartão de crédito
                </S.title>
              </Box>

              <VStack space={4}>
                <FormInput
                  label="Nome impresso no cartão"
                  error={errors.holder}
                  name="holder"
                  control={control}
                  placeholder="Digite o nome impresso no cartão"
                />

                <FormInput
                  control={control}
                  mask="card"
                  maxLength={19}
                  label="Número do cartão"
                  error={errors.number}
                  name="number"
                  autoCapitalize="none"
                  keyboardType="numeric"
                  placeholder="Digite o número do cartão"
                />

                <HStack space={2} alignItems="center">
                  <Box flex="1">
                    <FormInput
                      control={control}
                      mask="short-date"
                      label="Vencimento"
                      error={errors.expiry}
                      name="expiry"
                      autoCapitalize="none"
                      placeholder="mês/ano"
                      maxLength={5}
                      keyboardType="numeric"
                    />
                  </Box>

                  <Box flex={1}>
                    <FormInput
                      control={control}
                      label="Código de secgurança"
                      error={errors.ccv}
                      name="ccv"
                      autoCapitalize="characters"
                      placeholder="ccv"
                    />
                  </Box>
                </HStack>

                <FormSelection
                  control={control}
                  name="installments"
                  error={errors.installments}
                  placeholder={`1 x ${_currencyToNumber(String(valor)) ?? 'R$ 0,00'
                    }`}
                  itens={installments(String(valor) ?? '0')}
                />

                <Button
                  onPress={handleSubmit(payNotCardSave)}
                  styleType="border"
                  txt_color="#fff"
                  load={saveCard.isLoading || payCard.isLoading}
                />
              </VStack>
            </Box>
          )}
        </Box>
      </S.content>
    </Box>
  );
}
