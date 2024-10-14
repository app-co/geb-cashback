/* eslint-disable react/jsx-no-constructed-context-values */
// /* eslint-disable react/jsx-no-constructed-context-values */
// /* eslint-disable consistent-return */
// /* eslint-disable react/prop-types */
// /* eslint-disable camelcase */
// import { STORAGE_KEY, STORAGE_KEY_TOKEN } from '@types';
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

// import * as LocalAuthentication from 'expo-local-authentication';

import { OneSignal } from 'react-native-onesignal';

import { IUser } from '@/dtos';
import { useSignIn } from '@/hooks/mutations';
import { api } from '@/services/api';
import { pathsRoutes } from '@/services/schemeRoutes';
import { TokenStorage } from '@/services/storage/token-storage';

interface ILogin {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: IUser;
  login(credential: ILogin): Promise<void>;
  loading: boolean;
  logOut(): Promise<void>;
  updateUser(): Promise<void>;
}

type TAuthContext = {
  children: ReactNode;
};

type AuthState = {
  token: string;
  user: IUser;
};

export const AuthContext = createContext<IAuthContextData>(
  {} as IAuthContextData,
);

const storageToken = new TokenStorage();

export function AuthContextProvider({ children }: TAuthContext) {
  const { mutateAsync } = useSignIn();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AuthState>({} as AuthState);

  const userAndTokenUpdate = React.useCallback(async (token: string) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    const user = await api.get(pathsRoutes.byId.user);

    setData({ token, user: user.data });
  }, []);

  const LoadingUser = useCallback(async () => {
    setLoading(true);

    const token = await storageToken.getToken();

    if (token) {
      userAndTokenUpdate(token);
    }

    setLoading(false);
  }, [userAndTokenUpdate]);

  React.useEffect(() => {
    LoadingUser();
  }, []);

  const login = useCallback(async ({ email, password }: ILogin) => {
    try {
      const { token } = await mutateAsync({ email, password });

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      const user = await api.get(pathsRoutes.byId.user);

      setData({ token, user: user.data });
      await storageToken.setToken(token);
      OneSignal.User.addTag('user', user.data.id);

      //   await api
      //     .post(pathsRoutes.session.user, {
      //       email,
      //       password,
      //     })
      //     .then(async h => {
      //       const { token } = h.data;

      //       api.defaults.headers.common.Authorization = `Bearer ${token}`;

      //       const user = await api.get(pathsRoutes.byId.user);

      //       setData({ token, user: user.data });
      //       await storageToken.setToken(token);
      //     });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const logOut = useCallback(async () => {
    await storageToken.removeToken();
    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(async () => {
    const user = await api.get(pathsRoutes.byId.user);
    setData({
      token: data.token,
      user: user.data,
    });
  }, [data]);

  return (
    <AuthContext.Provider
      value={{ user: data.user, login, logOut, loading, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
