import React from 'react';
import { TouchableOpacity } from 'react-native';

import { HStack, Image } from 'native-base';
import { Eye, Question, UserCircle, UsersThree } from 'phosphor-react-native';

import logo from '@/assets/logo-11.png';
import { useAuth } from '@/context/auth';
import { canvaPercent } from '@/styles/sizes';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';

export function MenuHeader() {
  const { user } = useAuth();
  const nav = useNavigation();

  const [name, lastName] = user.name.split(' ').map(String);

  return (
    <S.Container>
      <S.main>
        <S.content>
          <Image
            w={`${canvaPercent('8')}px`}
            h={`${canvaPercent('5')}px`}
            source={logo}
            alt="logo"
          />

          <S.titleName>
            Olá, {name} {lastName}
          </S.titleName>
        </S.content>

        <S.content>
          <HStack space={4}>
            {/* <EyeSlash weight="duotone" size={`${canvaPercent('4')}px`} /> */}
            <Eye weight="duotone" size={`${canvaPercent('4')}px`} />
            <Question weight="duotone" size={`${canvaPercent('4')}px`} />

            <TouchableOpacity onPress={() => nav.navigate('invit')}>
              <UsersThree weight="duotone" size={`${canvaPercent('4')}px`} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => nav.navigate('profile')}>
              <UserCircle weight="duotone" size={`${canvaPercent('4')}px`} />
            </TouchableOpacity>
          </HStack>
        </S.content>
      </S.main>
    </S.Container>
  );
}
