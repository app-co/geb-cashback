import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, TouchableOpacity } from 'react-native';
import Dropdown from 'react-native-input-select';

import * as ImagePiker from 'expo-image-picker';
import * as Linkin from 'expo-linking';

import { Box, HStack, Image } from 'native-base';
import {
  DiscordLogo,
  Envelope,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  MapTrifold,
  PinterestLogo,
  RedditLogo,
  SkypeLogo,
  SnapchatLogo,
  TelegramLogo,
  TiktokLogo,
  TwitterLogo,
  WhatsappLogo,
  YoutubeLogo,
} from 'phosphor-react-native';

import { Button } from '@/components/forms/Button';
import { FormInput } from '@/components/forms/FormInput';
import { InputForm } from '@/components/forms/InputForm';
import { Loading } from '@/components/Loading';
import { useAuth } from '@/context/auth';
import { cor } from '@/styles/cor';
import { hightPercent, widtPercent } from '@/styles/sizes';
import { _segmentos } from '@/utils/segments';
import { zodResolver } from '@hookform/resolvers/zod';
import storage from '@react-native-firebase/storage';

import { formRegisterCompnay, formRegisterSocialMida } from './hooks/dto/shema';
import {
  TFormRegisterCompany,
  TFormRegisterSocialMidate,
} from './hooks/dto/types';
import { useRegisterCompany, useRegisterSocialMida } from './hooks/mutation';
import { useCompanyById } from './hooks/querys';
import * as S from './styles';

const segmentos = _segmentos().enun;

const socialMidia = [
  {
    label: 'Google Maps (Localização da sua empresa)',
    value: 'maps',
    ico: <MapTrifold color={cor.focus.a} size={35} />,
  },
  {
    label: 'WhattsApp',
    value: 'whatsapp',
    ico: <WhatsappLogo color={cor.focus.a} size={35} />,
  },
  {
    label: 'Facebook',
    value: 'facebook',
    ico: <FacebookLogo color={cor.focus.a} size={35} />,
  },
  {
    label: 'Twitter',
    value: 'twitter',
    ico: <TwitterLogo color={cor.focus.a} size={35} />,
  },
  {
    label: 'Linkedin',
    value: 'linkedin',
    ico: <LinkedinLogo color={cor.focus.a} size={35} />,
  },
  {
    label: 'YouTube',
    value: 'youtube',
    ico: <YoutubeLogo color={cor.focus.a} size={35} />,
  },
  {
    label: 'E-mail',
    value: 'email',
    ico: <Envelope color={cor.focus.a} size={35} />,
  },
  {
    label: 'Skype',
    value: 'skype',
    ico: <SkypeLogo color={cor.focus.a} size={35} />,
  },
  {
    label: 'Instagram',
    value: 'instagram',
    ico: <InstagramLogo color={cor.focus.a} size={35} />,
  },
  {
    label: 'Telegram',
    value: 'telegram',
    ico: <TelegramLogo color={cor.focus.a} size={35} />,
  },
  {
    label: 'Discord',
    value: 'discord',
    ico: <DiscordLogo color={cor.focus.a} size={35} />,
  },
  {
    label: 'Tiktok',
    value: 'tiktok',
    ico: <TiktokLogo color={cor.focus.a} size={35} />,
  },
  {
    label: 'Pinterest',
    value: 'pinterest',
    ico: <PinterestLogo color={cor.focus.a} size={35} />,
  },
  {
    label: 'Reddit:',
    value: 'reddit',
    ico: <RedditLogo color={cor.focus.a} size={35} />,
  },
  {
    label: 'Snapchat',
    value: 'Snapchat',
    ico: <SnapchatLogo color={cor.focus.a} size={35} />,
  },
];

export function BusinnesConfig() {
  const { user } = useAuth();

  const { data, isLoading } = useCompanyById();
  const { mutateAsync: register, isLoading: load } = useRegisterCompany();
  const { mutateAsync: registerSocialMidia, isLoading: loadSocialMidia } =
    useRegisterSocialMida();

  const [segmento, setSegmento] = React.useState('');

  const [img, setImg] = React.useState(
    'https://w7.pngwing.com/pngs/388/487/png-transparent-computer-icons-graphy-img-landscape-graphy-icon-miscellaneous-angle-text-thumbnail.png',
  );

  const control = useForm<TFormRegisterCompany>({
    resolver: zodResolver(formRegisterCompnay),
    defaultValues: {
      provider_id: user.id,
      veriyfild: true,
    },
  });

  const socialControl = useForm<TFormRegisterSocialMidate>({
    resolver: zodResolver(formRegisterSocialMida),
    defaultValues: {
      userId: user.id,
    },
  });

  const casheback = control.watch('casheback') ? control.watch('casheback') : 0;

  async function submit(obj: TFormRegisterCompany) {
    await register(obj);
  }

  async function handleRegisterSocialMida(obj: TFormRegisterSocialMidate) {
    console.log(obj);
    await registerSocialMidia(obj);
  }

  React.useEffect(() => {
    if (!data) return;

    control.setValue('name', data.name);
    control.setValue('cnpj', data.cnpj);
    control.setValue('telefone', data.telefone);
    control.setValue('segmento', data.segmento);
    control.setValue('logo', data.logo);
    control.setValue('casheback', String(data.casheback));
    setImg(data.logo);
  }, [data]);

  React.useEffect(() => {
    control.setValue('segmento', Number(segmento));
  }, [control, segmento]);

  const handleLogo = useCallback(async () => {
    const { status } = await ImagePiker.requestMediaLibraryPermissionsAsync();

    if (status === 'granted') {
      const result = await ImagePiker.launchImageLibraryAsync({
        mediaTypes: ImagePiker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 2.8],
        quality: 1,
      });

      if (!result.canceled) {
        try {
          const ref = storage().ref(`image/logo/${user.id}.png`);
          await ref.delete();
        } catch (error) {
          console.log(error);
        }
        const reference = storage().ref(`/image/logo/${user.id}.png`);

        await reference.putFile(result.assets[0].uri);
        const photoUrl = await reference.getDownloadURL();
        setImg(photoUrl);
        control.setValue('logo', photoUrl);
      }
    }
  }, [user]);

  const social = data?.social_midia ?? [];

  if (isLoading) {
    return <Loading />;
  }

  const taxa = casheback / 100 + 0.06;
  const calc = 100 - 100 * taxa;

  const type = socialControl.watch('type');

  return (
    <S.Container>
      <ScrollView contentContainerStyle={{ paddingBottom: 50, gap: 20 }}>
        <S.box>
          <FormInput
            name="name"
            control={control.control}
            error={control.formState.errors.name}
            label="Nome fantasia"
            placeholder="Digite o nome da sua empresa"
          />
          <FormInput
            name="cnpj"
            control={control.control}
            error={control.formState.errors.cnpj}
            label="CNPJ"
            placeholder="CNPJ da sua empresa"
            keyboardType="numeric"
            mask="cpf"
            maxLength={18}
          />
          <FormInput
            name="telefone"
            control={control.control}
            error={control.formState.errors.telefone}
            label="Contato"
            placeholder="Telefone/celular para contato"
            mask="cell-phone"
            keyboardType="numeric"
            maxLength={15}
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
            label="Segmento"
            placeholder={
              data?.segmento
                ? _segmentos().transform[data.segmento]
                : 'Selecione um segmento'
            }
            listComponentStyles={{
              itemSeparatorStyle: {
                backgroundColor: cor.focus.a,
              },
            }}
            options={segmentos}
            isSearchable
            selectedValue={segmento}
            onValueChange={value => setSegmento(value)}
            primaryColor={cor.focus.a}
            selectedItemStyle={{
              color: cor.text.light,
              fontFamily: 'Regular',
            }}
            modalControls={{
              modalOptionsContainerStyle: {
                backgroundColor: cor.focus.a,
              },
            }}
          />

          <TouchableOpacity onPress={handleLogo}>
            <Image
              source={{ uri: img }}
              h={hightPercent('20')}
              w={widtPercent('30')}
              alt="logo"
            />
            <S.title>Selecione o logo/banner da sua empresa</S.title>
          </TouchableOpacity>
          <Box mt={6}>
            <FormInput
              name="casheback"
              control={control.control}
              error={control.formState.errors.casheback}
              label="Casheback %"
              placeholder="Valor em porcentagem(%)"
              keyboardType="numeric"
            />

            <S.title style={{ marginTop: 25 }}>
              Cálculo do seu faturamento:
            </S.title>

            <S.text>Valor da compra: R$ 100,00</S.text>
            <S.text>Casheback: {casheback ?? 0}%</S.text>
            <S.text>Taxas de serviços: 6%</S.text>
            <S.text>Cálculo: 100x{casheback / 100}x0.06</S.text>
            <S.text>Total a receber: {calc}</S.text>
          </Box>

          <Button load={load} onPress={control.handleSubmit(submit)} />
        </S.box>

        <S.box>
          <S.title>Midias Sociais</S.title>

          <InputForm
            control={socialControl.control}
            name="type"
            error={socialControl.formState.errors.type}
            render={({ onChange, value }) => (
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
                  borderColor: socialControl.formState.errors.type
                    ? '#aa0c0c'
                    : cor.focus.a,
                }}
                label="Tipo de Link"
                placeholder="Selecione um..."
                listComponentStyles={{
                  itemSeparatorStyle: {
                    backgroundColor: cor.focus.a,
                  },
                }}
                options={socialMidia}
                isSearchable
                selectedValue={value}
                onValueChange={value => onChange(value)}
                primaryColor={cor.focus.a}
                selectedItemStyle={{
                  color: cor.text.light,
                  fontFamily: 'Regular',
                }}
                modalControls={{
                  modalOptionsContainerStyle: {
                    backgroundColor: cor.focus.a,
                  },
                }}
              />
            )}
          />

          {type === 'whatsapp' && (
            <S.text style={{ fontFamily: 'trin' }}>
              exemplo: https://wa.me/5514999999999
            </S.text>
          )}

          <FormInput
            label="Link"
            name="link"
            control={socialControl.control}
            error={socialControl.formState.errors.link}
            placeholder="Digite a url da sua midia social"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Button
            load={loadSocialMidia}
            onPress={socialControl.handleSubmit(handleRegisterSocialMida)}
          />

          <S.text>Máximo de mida permitido - 5</S.text>

          {social.length > 0 && (
            <HStack space={8}>
              {social.map(h => (
                <TouchableOpacity
                  style={{ alignItems: 'center', justifyContent: 'center' }}
                  onPress={() => Linkin.openURL(h.link)}
                >
                  {socialMidia.find(p => p.value === h.type)?.ico}
                  <S.text>{h.type}</S.text>
                </TouchableOpacity>
              ))}
            </HStack>
          )}
        </S.box>
      </ScrollView>
    </S.Container>
  );
}
