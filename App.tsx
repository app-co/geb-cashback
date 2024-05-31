/* eslint-disable react/style-prop-object */
/* eslint-disable @typescript-eslint/no-use-before-define */
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';

import { BarCodeScanner } from 'expo-barcode-scanner';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

import {
  Roboto_900Black as Black,
  Roboto_700Bold as Bold,
  Roboto_300Light as Light,
  Roboto_400Regular as Regular,
} from '@expo-google-fonts/roboto';

import { NativeBaseProvider } from 'native-base';

import { UnauthorizedModal } from '@/components/modals/unauthorizedModal';
import { Splash } from '@/components/Splash';
import { reactotron } from '@/config/reactotron';
import { AuthContextProvider } from '@/context/auth';
import { StorageProvider } from '@/context/storage';
import { Routes } from '@/routes';

export default function App() {
  const [loadSplash, setLoadSplash] = React.useState(true);
  const [hasPermission, setHasPermission] = React.useState<any>(null);

  const [fontsLoaded, fontError] = useFonts({
    Light,
    Regular,
    Bold,
    Black,
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
    <View style={{ flex: 1 }}>
      <QueryClientProvider client={client}>
        <NativeBaseProvider>
          <SafeAreaProvider>
            <AuthContextProvider>
              <StorageProvider>
                <Routes />
                <UnauthorizedModal />
              </StorageProvider>
            </AuthContextProvider>
            <StatusBar style="auto" />
          </SafeAreaProvider>
        </NativeBaseProvider>
      </QueryClientProvider>
    </View>
  );
}
