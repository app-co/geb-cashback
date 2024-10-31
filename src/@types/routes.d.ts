type TCadastro = {
  type: 'search' | 'normal' | 'businnes';
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
      rewards: { codigo?: string };
      cacheOut: undefined;
      extrato: undefined;
      favoritos: undefined;
      transactions: T<{ providerId: string }>;
      BusinnesConfig: undefined;
      faturamento: undefined;
      casheout: undefined;
    }
  }
}
