type TCadastro = {
  type: 'search' | 'extra_cash' | 'businnes';
  session?: boolean;
};

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      simpleCadastro: TCadastro;
      fullCadastro: TCadastro;
      login: undefined;
      profile: undefined;
      providers: undefined;
      invit: undefined;
      rewards: undefined;
      cacheOut: undefined;
      extrato: undefined;
      transactions: T<{ providerId: string }>;
    }
  }
}
