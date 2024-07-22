/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable prettier/prettier */
import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';

import { Box, FlatList, HStack, Image, Modal, VStack } from 'native-base';
import {
  Faders,
  Globe,
  InstagramLogo,
  MapTrifold,
  WhatsappLogo,
} from 'phosphor-react-native';

import { useSaveLocal } from '@/hooks/mutations';
import { useGetAllCompany, useGetLocalSegemnto } from '@/hooks/querys';
import { cor } from '@/styles/cor';
import { canvaPercent, hightPercent, widtPercent } from '@/styles/sizes';
import { _segmentos } from '@/utils/segments';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../forms/Button';
import { Input } from '../forms/Input';
import { Loading } from '../Loading';
import { Select } from '../Select';
import * as S from './styles';


const transformEnununsSegmentos = _segmentos().transform
const segmentos = _segmentos().enun

export function Providers() {
  const nav = useNavigation()
  const getLocalSegmento = useGetLocalSegemnto()
  const updateSegmento = useSaveLocal()
  const getSegmento = getLocalSegmento.data
  const segmento = getSegmento || _segmentos().enun.map(h => { return { ...h, value: Number(h.value) } })


  const [search, setSearch] = React.useState<string>('');
  const [selectedSegmento, setSelectedSegmento] = React.useState<{ value: number, label: string }[]>(segmento)

  const [isOpem, setIsOpem] = React.useState<boolean>(false)

  const seg = JSON.stringify(selectedSegmento.map(h => Number(h.value)))


  const { data, fetchNextPage } = useGetAllCompany({
    segmento: seg,
  })

  const company = data?.pages[0]?.records ?? []

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
      <HStack px={4} alignContent="center" my="4">
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

      {company.length === 0 && (
        <S.title>No momento não temos prestadores para esses segmentos</S.title>
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
              <S.title>{h.name}</S.title>
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
