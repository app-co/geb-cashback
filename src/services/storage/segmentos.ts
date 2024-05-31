/* eslint-disable class-methods-use-this */
import AsyncStorage from '@react-native-async-storage/async-storage';

const keyToken = '@geb:segmenttt';

export interface ISegmentsStorage {
  firstLogin: boolean;
  segments: string[];
}

export async function setStorageSegmentos(item: ISegmentsStorage) {
  const data = JSON.stringify(item);
  await AsyncStorage.setItem(keyToken, data);
}

export async function getStorageSegmentos() {
  const get = await AsyncStorage.getItem(keyToken);

  const data: ISegmentsStorage = get ? JSON.parse(get) : null;

  return data;
}

export async function removeStorageSegmentos() {
  await AsyncStorage.removeItem(keyToken);
}
