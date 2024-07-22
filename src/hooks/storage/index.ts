import AsyncStorage from '@react-native-async-storage/async-storage';

import { TSaveSegmento } from '../fetchs/types';

type keys = 'segmento';
interface I {
  key: keys;
  value: any;
}

export async function saveDataLocal({ key, value }: I) {
  await AsyncStorage.setItem(`gebcasheback:${key}`, JSON.stringify(value));
}

export async function getSegmento() {
  const objeto = await AsyncStorage.getItem(`gebcasheback:segmento`);
  const data = objeto ? JSON.parse(objeto) : [];
  return data as TSaveSegmento[];
}
