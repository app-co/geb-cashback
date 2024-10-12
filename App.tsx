/* eslint-disable react/style-prop-object */
/* eslint-disable @typescript-eslint/no-use-before-define */
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import { Platform, Text, View } from 'react-native';
import { OneSignal } from 'react-native-onesignal';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';

import { BarCodeScanner } from 'expo-barcode-scanner';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';

import {
  Roboto_900Black as Black,
  Roboto_700Bold as Bold,
  Roboto_300Light as Light,
  Roboto_400Regular as Regular,
  Roboto_100Thin as trin,
} from '@expo-google-fonts/roboto';

import { NativeBaseProvider } from 'native-base';

import { ConectionErrorModal } from '@/components/modals/conexao-error';
import { GlobalErrorModal } from '@/components/modals/global-error';
import { ToastModal } from '@/components/modals/toast';
import { UnauthorizedModal } from '@/components/modals/unauthorizedModal';
import { Splash } from '@/components/Splash';
import { reactotron } from '@/config/reactotron';
import { AuthContextProvider } from '@/context/auth';
import { StorageProvider } from '@/context/storage';
import { Routes } from '@/routes';
import { cor } from '@/styles/cor';

OneSignal.initialize('77610791-dd21-497f-a9e0-9ee1e02d6077');

export default function App() {
  const [loadSplash, setLoadSplash] = React.useState(true);
  const [hasPermission, setHasPermission] = React.useState<any>(null);

  if (Platform.OS === 'android') {
    NavigationBar.setBackgroundColorAsync('#3a3a3a');
  }

  const [fontsLoaded, fontError] = useFonts({
    Light,
    Regular,
    Bold,
    Black,
    trin,
  });

  React.useEffect(() => {
    setTimeout(() => {
      setLoadSplash(false);
    }, 5500);
  }, []);

  React.useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const client = new QueryClient();

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (loadSplash) {
    return <Splash />;
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (__DEV__) {
    reactotron.connect();
  }

  return (
    <View style={{ flex: 1, backgroundColor: cor.bgcolor }}>
      <QueryClientProvider client={client}>
        <NativeBaseProvider>
          <SafeAreaProvider>
            <AuthContextProvider>
              <StorageProvider>
                <Routes />
                <UnauthorizedModal />
                <GlobalErrorModal />
                <ConectionErrorModal />
                <ToastModal />
              </StorageProvider>
            </AuthContextProvider>
            <StatusBar style="light" />
          </SafeAreaProvider>
        </NativeBaseProvider>
      </QueryClientProvider>
    </View>
  );
}
