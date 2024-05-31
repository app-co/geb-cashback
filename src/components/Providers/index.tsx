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

import { useStorage } from '@/context/storage';
import { ICompany } from '@/dtos';
import { api } from '@/services/api';
import { cor } from '@/styles/cor';
import { canvaPercent, hightPercent, widtPercent } from '@/styles/sizes';
import { Segments } from '@/utils/segments';

import { Button } from '../forms/Button';
import { Input } from '../forms/Input';
import { Loading } from '../Loading';
import { Select } from '../Select';
import * as S from './styles';

export function Providers() {
  const { getSegments, updateSegments } = useStorage()

  const [company, setCompany] = React.useState<ICompany[]>([]);
  const [segments, setSegments] = React.useState<string[]>(getSegments!.segments);
  const [search, setSearch] = React.useState<string>('');
  const [itensSegments, setItensSegments] = React.useState<string[]>(getSegments!.segments)

  const [isOpem, setIsOpem] = React.useState<boolean>(false)

  React.useEffect(() => {
    api.get('/company/get-all').then(h => {
      const data = h.data as ICompany[];
      setCompany(data);
    });
  }, []);


  const companyList = React.useMemo(() => {
    const list = company || [];

    const preferenceList: ICompany[] = [];

    segments.forEach(h => {
      list.forEach(l => {
        if (h === l.segmento) {
          preferenceList.push(l);
        }
      });
    });

    const preference = search
      ? preferenceList.filter(h => {
        const name = h.name.toLocaleLowerCase();

        if (name.includes(search.toLocaleLowerCase())) {
          return h;
        }
        return null
      })
      : preferenceList;

    return { list, preference };
  }, [company, search, segments]);

  const toggleSecection = useCallback(
    (item: string) => {
      const index = itensSegments.findIndex(i => i === item);

      const arrSelect = [...itensSegments];
      if (index !== -1) {
        arrSelect.splice(index, 1);
      } else {
        arrSelect.push(item);
      }

      setItensSegments(arrSelect);
      setSegments(arrSelect)
    },
    [itensSegments],
  );

  const handleSaveSegmenots = React.useCallback(async (
  ) => {
    const dt = {
      firstLogin: false,
      segments: itensSegments
    }

    updateSegments(dt)

    setSegments(itensSegments)
    setIsOpem(false)

  }, [itensSegments, updateSegments])

  if (!company) return <Loading />

  console.log(company[0])

  return (
    <S.Container>
      <Modal isOpen={isOpem} onClose={() => setIsOpem(false)} >
        <Modal.CloseButton />

        <Box flex='1' w='full' pt='16' bg={cor.bgcolor}>
          <S.title style={{ textAlign: 'center' }} >Selecione suas novas preferencias</S.title>
          <VStack h={canvaPercent('70')} space={4} mt="8">
            <Select
              selected={itensSegments.length === 20}
              title="Todos"
              pres={() => setItensSegments(Segments)}
            />
            <FlatList
              contentContainerStyle={{
                paddingBottom: 200,
              }}
              data={Segments}
              renderItem={({ item: h }) => (
                <Box mt="4">
                  <Select
                    selected={itensSegments.findIndex(i => i === h) !== -1}
                    pres={() => toggleSecection(h)}
                    title={h}
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
      <HStack alignContent="center" my="4">
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

      {companyList.preference.length === 0 && (
        <S.title>No momento não temos prestadores para esses segmentos</S.title>
      )}

      <FlatList
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        data={companyList.preference}
        renderItem={({ item: h }) => (
          <S.boxProvider>
            <S.logo>
              <Image size="full" src={h.logo} alt="logo" />
            </S.logo>

            <S.bx>
              <S.title>{h.name}</S.title>
              <S.texts>
                {h.location?.street}, {h.location?.number}, {h.location?.city} -{' '}
                {h.location?.region_code}
              </S.texts>
              <S.texts>Contato: {h.user.contato}</S.texts>

              <HStack space={8} mt="4">
                <TouchableOpacity>
                  <WhatsappLogo size={30} color="green" weight="duotone" />
                </TouchableOpacity>

                <TouchableOpacity>
                  <InstagramLogo size={30} color="#2096e4" weight="duotone" />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Globe color="#c1c1c1" size={30} weight="duotone" />
                </TouchableOpacity>

                <TouchableOpacity>
                  <MapTrifold color="#c1c1c1" size={30} weight="duotone" />
                </TouchableOpacity>
              </HStack>
            </S.bx>
          </S.boxProvider>
        )}
      />
    </S.Container>
  );
}
