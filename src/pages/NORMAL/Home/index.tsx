import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from 'expo-camera';

import { Box, Center, HStack, Image } from 'native-base';

import pix from '@/assets/pix1.png';
import { Button } from '@/components/forms/Button';
import { Line } from '@/components/Line';
import { Parceiros } from '@/components/Parceiros';
import { useAuth } from '@/context/auth';
import { convertNumberToCurrency } from '@/utils/unidades';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { MenuBox } from '../components/MenuBox';
import { MenuHeader } from '../components/MenuHeader';
import * as S from './styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

// 171.672.735-97
export function Home() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [openScan, setOpneScan] = React.useState<boolean>(false);

  const handleScan = React.useCallback(async (data: BarcodeScanningResult) => {
    setOpneScan(false);
    navigation.navigate('transactions', {
      providerId: data.data,
    });
  }, []);

  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();

  useFocusEffect(
    useCallback(() => {
      if (!user.locality) {
        navigation.navigate('fullCadastro', {
          type: 'extra_cash',
          session: true,
        });
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
    setFacing(current => (current === 'back' ? 'back' : 'front'));
  }

  const casheback = convertNumberToCurrency(user.wallet.amount_cashback);

  return (
    <S.Container>
      <MenuHeader />

      {openScan && (
        <Center flex={1} w="full" h="200px" mt="12">
          <CameraView
            onBarcodeScanned={h => handleScan(h)}
            barcodeScannerSettings={{
              barcodeTypes: ['qr'],
            }}
            style={{ width: 300, height: 200 }}
            facing={facing}
          >
            <Box h={26}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraFacing}
              >
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
            </Box>
          </CameraView>
        </Center>
      )}

      <HStack mt="8" alignItems="flex-end" justifyContent="space-between">
        <Box>
          <S.subtitle style={{ fontWeight: '800' }}>Cashback</S.subtitle>
          <S.cash>
            <S.title>{casheback}</S.title>
          </S.cash>
        </Box>

        <Box>
          <S.cash onPress={() => navigation.navigate('cacheOut')}>
            <S.title>SACAR</S.title>
            <Image source={pix} alt="pix" />
          </S.cash>
        </Box>
      </HStack>

      <Box mt="8">
        <MenuBox
          presExtrato={() => navigation.navigate('extrato')}
          presBuy={() => {
            toggleCameraFacing();
            setOpneScan(!openScan);
          }}
          presProvider={() => navigation.navigate('providers')}
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
