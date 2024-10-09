import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { HStack, Image } from 'native-base';
import {
  Globe,
  InstagramLogo,
  MapTrifold,
  ShareNetwork,
  Trash,
  WhatsappLogo,
} from 'phosphor-react-native';

import { Loading } from '@/components/Loading';
import { useRemoveFavorites } from '@/hooks/mutations';
import { useFavorites } from '@/hooks/querys';
import { cor } from '@/styles/cor';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';

export function Favoritos() {
  const navigation = useNavigation();

  const { data = [], isLoading } = useFavorites();
  const { mutateAsync } = useRemoveFavorites();

  const handleRemoveFavorite = React.useCallback(async (id: number) => {
    await mutateAsync(id);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <S.Container>
      <S.title>Favoritos</S.title>

      <FlatList
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        data={data}
        renderItem={({ item: h }) => (
          <S.boxProvider
            onPress={() =>
              navigation.navigate('transactions', { providerId: h.id })
            }
          >
            <S.logo>
              <Image size="full" src={h.logo} alt="logo" />
            </S.logo>

            <S.bx>
              <HStack alignItems="center" justifyContent="space-between">
                <S.title>{h.name}</S.title>
                <S.actions>
                  <TouchableOpacity
                    onPress={() => handleRemoveFavorite(h.favoriteId)}
                  >
                    <Trash weight="duotone" size={30} color="#dd2323" />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <ShareNetwork size={30} color={cor.focus.a} weight="bold" />
                  </TouchableOpacity>
                </S.actions>
              </HStack>
              <S.texts>
                {h.location?.street}, {h.location?.number}, {h.location?.city} -{' '}
                {h.location?.region_code}
              </S.texts>
              <S.texts>Contato: {h.telefone}</S.texts>

              <HStack space={8} mt="4">
                <TouchableOpacity>
                  <WhatsappLogo size={25} color="green" weight="duotone" />
                </TouchableOpacity>

                <TouchableOpacity>
                  <InstagramLogo size={25} color="#2096e4" weight="duotone" />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Globe color="#c1c1c1" size={25} weight="duotone" />
                </TouchableOpacity>

                <TouchableOpacity>
                  <MapTrifold color="#c1c1c1" size={25} weight="duotone" />
                </TouchableOpacity>
              </HStack>
            </S.bx>
          </S.boxProvider>
        )}
      />
    </S.Container>
  );
}