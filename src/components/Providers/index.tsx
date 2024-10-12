/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable prettier/prettier */
import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';

import { Box, FlatList, HStack, Image, Modal, VStack } from 'native-base';
import {
  Faders,
  Heart,
  ShareNetwork
} from 'phosphor-react-native';
import { ZodError } from 'zod';

import { useRegisterFavorites, useRemoveFavorites, useSaveLocal } from '@/hooks/mutations';
import { useFavorites, useGetAllCompany, useGetLocalSegemnto } from '@/hooks/querys';
import { cor } from '@/styles/cor';
import { canvaPercent, hightPercent, widtPercent } from '@/styles/sizes';
import { Mask } from '@/utils/mask';
import { _segmentos } from '@/utils/segments';
import { _socialMidia } from '@/utils/socia-midia';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../forms/Button';
import { Input } from '../forms/Input';
import { Loading } from '../Loading';
import Toast from '../modals/toast/handler';
import { Select } from '../Select';
import * as S from './styles';


const transformEnununsSegmentos = _segmentos().transform
const segmentos = _segmentos().enun
const mask = new Mask()

export function Providers() {
  const nav = useNavigation()
  const getLocalSegmento = useGetLocalSegemnto()
  const updateSegmento = useSaveLocal()
  const getSegmento = getLocalSegmento.data
  const segmento = getSegmento || _segmentos().enun.map(h => { return { ...h, value: Number(h.value) } })


  const [favorites, setFavorites] = React.useState<string[]>([])
  const [search, setSearch] = React.useState<string>('');
  const [selectedSegmento, setSelectedSegmento] = React.useState<{ value: number, label: string }[]>(segmento)

  const [isOpem, setIsOpem] = React.useState<boolean>(false)

  const seg = JSON.stringify(selectedSegmento.map(h => Number(h.value)))


  const { data, fetchNextPage } = useGetAllCompany({
    segmento: seg,
  })

  const { mutateAsync } = useRegisterFavorites()
  const removeFavorites = useRemoveFavorites()
  const { data: getFavorites = [], isLoading: favoritesLoading } = useFavorites()

  const company = data?.pages.flatMap(h => h.records) ?? []

  const toggleSecection = useCallback(
    (item: number) => {
      const index = selectedSegmento.findIndex(i => i.value === item);

      const arrSelect = [...selectedSegmento];
      if (index !== -1) {
        arrSelect.splice(index, 1);
      } else {
        arrSelect.push({ value: item, label: transformEnununsSegmentos[item] });
      }

      setSelectedSegmento(arrSelect)
    },
    [selectedSegmento],
  );

  const handleSaveSegmenots = React.useCallback(async () => {
    await updateSegmento.mutateAsync({
      value: selectedSegmento,
      key: 'segmento'
    })

    getLocalSegmento.refetch()
    setIsOpem(false)

  }, [selectedSegmento])

  function selectAll() {
    selectedSegmento.length === segmentos.length
      ? setSelectedSegmento([])
      : setSelectedSegmento(segmentos.map(h => { return { value: Number(h.value), label: h.label } }))
    return null
  }

  const handleAddFavorites = React.useCallback(async (companyId: string) => {
    try {

      const find = getFavorites.find(h => h.id === companyId)

      if (find) {
        await removeFavorites.mutateAsync(find.favoriteId)
        setFavorites((prevSelectedIds) => {
          if (prevSelectedIds.includes(companyId)) {
            return prevSelectedIds.filter(selectedId => selectedId !== companyId);
          }
          return [...prevSelectedIds, companyId];

        });

        return
      }

      await mutateAsync({ companyId })
      setFavorites((prevSelectedIds) => {
        if (prevSelectedIds.includes(companyId)) {
          return prevSelectedIds.filter(selectedId => selectedId !== companyId);
        }
        return [...prevSelectedIds, companyId];

      });

    } catch (error) {
      if (error instanceof ZodError) {
        Toast.show({
          title: 'Erro ao salvar',
          description: 'Erro interno',
          tipo: 'warning'
        })
      }
    }
  }, [getFavorites])


  React.useEffect(() => {
    const map = getFavorites.map(h => h.id)
    setFavorites(map)
  }, [favoritesLoading])



  if (!company && updateSegmento.isLoading) return <Loading />



  return (
    <S.Container>
      <Modal isOpen={isOpem} onClose={() => setIsOpem(false)} >
        <Modal.CloseButton />

        <Box p={4} flex='1' w='full' pt='16' bg={cor.bgcolor}>
          <S.title style={{ textAlign: 'center' }} >Selecione suas novas preferencias</S.title>
          <VStack h={canvaPercent('70')} space={3} mt={8}>
            <Select
              selected={selectedSegmento.length === 20}
              title="Todos"
              pres={() => selectAll()}
            />
            <FlatList
              contentContainerStyle={{
                paddingBottom: 200,
                gap: 12
              }}
              onEndReached={() => {
                fetchNextPage()
              }}
              data={segmentos}
              renderItem={({ item: h }) => (
                <Box>
                  <Select
                    selected={selectedSegmento.findIndex(i => i.value === Number(h.value)) !== -1}
                    pres={() => toggleSecection(Number(h.value))}
                    title={h.label}
                  />
                </Box>
              )}
            />
          </VStack>

          <Button
            onPress={handleSaveSegmenots}
            styleType="solid"
            txt_color={cor.text.black}
            title="CONFIRMAR"
          />
        </Box>

      </Modal>
      <HStack px={4} alignContent="center">
        <Box flex="1">
          <Input
            label=""
            onChangeText={setSearch}
            icon="search"
            placeholder="Pesquisar"
          />
        </Box>
        <TouchableOpacity
          onPress={() => setIsOpem(true)}
          style={{
            marginTop: hightPercent('2.5'),
            width: widtPercent('7'),
            padding: 5,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <Faders
            size={widtPercent('5')}
            color={cor.focus.a}
            weight="duotone"
          />
        </TouchableOpacity>
      </HStack>

      {company?.length === 0 && (
        <Box p={8} >

          <S.title style={{ textAlign: 'center' }} >No momento não temos prestadores para esses segmentos</S.title>
        </Box>
      )}

      <FlatList
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        data={company}
        renderItem={({ item: h }) => (
          <S.boxProvider onPress={() => nav.navigate('transactions', { providerId: h.id })} >

            <S.logo>
              <Image size="full" src={h.logo} alt="logo" />
            </S.logo>

            <S.bx>
              <HStack alignItems="center" justifyContent="space-between">
                <Box>
                  <S.title>{h.name}</S.title>
                  <S.texts style={{ color: cor.focus.a }} >{_segmentos().transform[h.segmento]}</S.texts>
                </Box>
                <S.actions>
                  <TouchableOpacity onPress={() => handleAddFavorites(h.id)} >
                    {favorites.includes(h.id) ? (
                      <Heart size={30} color={cor.focus.a} weight='fill' />
                    ) : (
                      <Heart size={30} color={cor.focus.a} weight='bold' />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <ShareNetwork size={30} color={cor.focus.a} weight='bold' />
                  </TouchableOpacity>
                </S.actions>
              </HStack>

              <S.texts style={{ marginTop: 8 }} >Contato: {mask.cellPhone(h.telefone)}</S.texts>

              <HStack space={8} mt="4">
                {h.social_midia && h.social_midia.map(j => (
                  <TouchableOpacity>
                    {_socialMidia.find(p => p.value === j.type)?.ico}
                  </TouchableOpacity>
                ))}

              </HStack>
            </S.bx>
          </S.boxProvider>
        )}
      />
    </S.Container>
  );
}
