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

import { useToast } from 'native-base';

import { IUser } from '@/dtos';
import { useSignIn } from '@/hooks/mutations';
import { AppError } from '@/services/AppError';
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
  const toast = useToast();
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
  }, [LoadingUser]);

  const login = useCallback(async ({ email, password }: ILogin) => {
    try {
      const userSession = await mutateAsync({ email, password });
      await api
        .post(pathsRoutes.session.user, {
          email,
          password,
        })
        .then(async h => {
          const { token } = h.data;

          api.defaults.headers.common.Authorization = `Bearer ${token}`;

          const user = await api.get(pathsRoutes.byId.user);

          setData({ token, user: user.data });
          await storageToken.setToken(token);
        });
    } catch (error) {
      if (error instanceof AppError) {
        toast.show({
          title: 'Erro ao fazer login',
          description: error.message,
          placement: 'bottom',
          bg: 'red.500',
        });
      }
    }
  }, []);

  const logOut = useCallback(async () => {
    await storageToken.removeToken();
    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(async () => {
    await api.get(`/provider/${data.user.id}`).then(async h => {
      const provider = h.data;
      const dados = {
        token: data.token,
        user,
      };

      setData(dados);
    });
  }, [data.user, data.token]);

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
