/* eslint-disable react/jsx-no-constructed-context-values */
import React, { ReactNode, createContext, useContext } from 'react';

// import * as LocalAuthentication from 'expo-local-authentication';

import {
  ISegmentsStorage,
  getStorageSegmentos,
  setStorageSegmentos,
} from '@/services/storage/segmentos';

interface IAuthContextData {
  getSegments?: ISegmentsStorage;
  updateSegments: (item: ISegmentsStorage) => void;
}

type TAuthContext = {
  children: ReactNode;
};

export const Storagecontex = createContext<IAuthContextData>(
  {} as IAuthContextData,
);

export function StorageProvider({ children }: TAuthContext) {
  const [segmentos, setSegments] = React.useState<
    ISegmentsStorage | undefined
  >();

  const getSegments = React.useCallback(async () => {
    const dt = await getStorageSegmentos();
    const data = dt || { firstLogin: true, segments: [] };
    setSegments(data);
  }, []);

  const updateSegments = React.useCallback(async (item: ISegmentsStorage) => {
    await setStorageSegmentos(item);

    setSegments(item);
  }, []);

  React.useEffect(() => {
    getSegments();
  }, [getSegments]);

  return (
    <Storagecontex.Provider value={{ getSegments: segmentos, updateSegments }}>
      {children}
    </Storagecontex.Provider>
  );
}

export function useStorage() {
  const context = useContext(Storagecontex);

  return context;
}

//
