import React, { useCallback, useState } from 'react';

import { CameraView, useCameraPermissions } from 'expo-camera';

import { Box, Center, HStack, Image } from 'native-base';

import pix from '@/assets/pix1.png';
import { Button } from '@/components/forms/Button';
import { Line } from '@/components/Line';
import { Parceiros } from '@/components/Parceiros';
import { useAuth } from '@/context/auth';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { MenuBox } from '../components/MenuBox';
import { MenuHeader } from '../components/MenuHeader';
import * as S from './styles';

export function Home() {
  const { navigate } = useNavigation();
  const { user } = useAuth();
  const [scanned, setScanned] = useState(true);
  const [openScan, setOpneScan] = React.useState<boolean>(false);

  const handleScan = React.useCallback(
    async (data: any) => {
      console.log({ scan: data });
      setScanned(false);
      navigate(data.data);
      setOpneScan(false);
    },
    [navigate],
  );

  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();

  useFocusEffect(
    useCallback(() => {
      if (!user.locality) {
        navigate('fullCadastro', { type: 'extra_cash', session: true });
      }
    }, [user]),
  );

  if (!permission) {
    // Camera permissions are still loading.
    return <Box />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <Box>
        <S.title style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </S.title>
        <Button onPress={requestPermission} title="grant permission" />
      </Box>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <S.Container>
      <MenuHeader />

      {openScan && (
        <Center flex={1} w="full" h="200px" mt="12">
          {/* <BarCodeScanner
            style={StyleSheet.absoluteFillObject}
            onBarCodeScanned={scanned ? undefined : handleScan}
          /> */}
          {/* {scanned && (
            <Button
              title="Tap to Scan Again"
              onPress={() => setScanned(false)}
            />
          )} */}
          <CameraView style={{ flex: 1 }} facing="front" />
        </Center>
      )}

      <HStack mt="8" alignItems="flex-end" justifyContent="space-between">
        <Box>
          <S.subtitle style={{ fontWeight: '800' }}>Cashback</S.subtitle>
          <S.cash>
            <S.title>R$ 00,0</S.title>
          </S.cash>
        </Box>

        <Box>
          <S.cash>
            <S.title>SACAR</S.title>
            <Image source={pix} alt="pix" />
          </S.cash>
        </Box>
      </HStack>

      <Box mt="8">
        <MenuBox
          presBuy={() => {
            toggleCameraFacing();
            setOpneScan(!openScan);
          }}
          presProvider={() => navigate('providers')}
        />
      </Box>

      <Box mt="8">
        <Line />
      </Box>

      <Box>
        <Parceiros />
      </Box>
    </S.Container>
  );
}
