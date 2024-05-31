import React, { useCallback } from 'react';

import { Box, Center, FlatList, VStack } from 'native-base';

import { Button } from '@/components/forms/Button';
import { Loading } from '@/components/Loading';
import { Select } from '@/components/Select';
import { useStorage } from '@/context/storage';
import { cor } from '@/styles/cor';
import { font } from '@/styles/fonts';
import { canvaPercent } from '@/styles/sizes';
import { Segments } from '@/utils/segments';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';

export function SimpleWellcome() {
  const { updateSegments } = useStorage();
  const { navigate } = useNavigation();
  const [itensSegmentos, setItensSegmentos] = React.useState<string[]>([]);
  const [load, setLoad] = React.useState<boolean>(false);

  const toggleSecection = useCallback(
    (item: string) => {
      const index = itensSegmentos.findIndex(i => i === item);

      const arrSelect = [...itensSegmentos];
      if (index !== -1) {
        arrSelect.splice(index, 1);
      } else {
        arrSelect.push(item);
      }

      setItensSegmentos(arrSelect);
    },
    [itensSegmentos],
  );

  const handleNext = React.useCallback(async () => {
    setLoad(true);
    const dt = {
      firstLogin: false,
      segments: itensSegmentos,
    };

    setTimeout(() => {
      setLoad(false);
      updateSegments(dt);
    }, 3000);
  }, [itensSegmentos, updateSegments]);

  const handleGeb = React.useCallback(async () => {
    const dt = {
      firstLogin: false,
      segments: [],
    };
    updateSegments(dt);
  }, [updateSegments]);

  if (load) {
    return <Loading />;
  }

  return (
    <S.Container>
      <Center mt="8">
        <S.title>Bem vindo!</S.title>
        <S.text>Antes de começarmos,</S.text>
        <S.text style={{ color: cor.focus.a, fontFamily: font.bold }}>
          quais são as suas preverências
        </S.text>
      </Center>

      <VStack h={canvaPercent('57')} space={4} mt="8">
        <Select
          selected={itensSegmentos.length === 20}
          title="Todos"
          pres={() => setItensSegmentos(Segments)}
        />
        <FlatList
          contentContainerStyle={{
            paddingBottom: 200,
          }}
          data={Segments}
          renderItem={({ item: h }) => (
            <Box mt="4">
              <Select
                selected={itensSegmentos.findIndex(i => i === h) !== -1}
                pres={() => toggleSecection(h)}
                title={h}
              />
            </Box>
          )}
        />
      </VStack>

      <Button onPress={handleNext} title="VAMOS COMEÇAR" />
      <Button
        onPress={handleGeb}
        styleType="transpale"
        txt_color={cor.text.light}
        title="PULAR"
      />
    </S.Container>
  );
}
