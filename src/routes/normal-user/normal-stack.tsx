/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from 'react';

import { Providers } from '@/components/Providers';
import { CacheOut } from '@/components/templates/CacheOut';
import { Transactions } from '@/components/templates/transactions';
import { FullCadastro } from '@/pages/Cadastro/FullCadastro';
import { GlobalHeader } from '@/pages/NORMAL/components/headers/GlobalHeader';
import { HeadeInvit } from '@/pages/NORMAL/components/headers/HeadeInvit';
import { Extrato } from '@/pages/NORMAL/Extrato';
import { Favoritos } from '@/pages/NORMAL/Favoritos';
import { Home } from '@/pages/NORMAL/Home';
import { Invit } from '@/pages/NORMAL/Invit';
import { Profile } from '@/pages/NORMAL/Profile';
import { Rewards } from '@/pages/NORMAL/Rewards';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Screen, Navigator } = createNativeStackNavigator();

export function NormalStack() {
  const ref = useRef();
  return (
    <Navigator>
      <Screen
        options={{ headerShown: false }}
        name="normal-home"
        component={Home}
      />
      <Screen
        options={{
          title: 'Prestadores',
          header: props => <GlobalHeader {...props} />,
        }}
        name="providers"
        component={Providers}
      />
      <Screen name="fullCadastro" component={FullCadastro} />
      <Screen
        options={{
          title: 'Perfil',
          header: props => <GlobalHeader {...props} />,
        }}
        name="profile"
        component={Profile}
      />

      <Screen
        options={{
          header: props => <HeadeInvit {...props} />,
        }}
        name="invit"
        component={Invit}
      />

      <Screen
        options={{
          title: 'GEB Rewards',
          header: (props: any) => <GlobalHeader {...props} />,
        }}
        name="rewards"
        component={Rewards}
      />

      <Screen
        options={{
          title: 'Transactions',
          header: (props: any) => <GlobalHeader {...props} />,
        }}
        name="transactions"
        component={Transactions}
      />

      <Screen
        options={{
          title: 'Área de Saque',
          header: (props: any) => <GlobalHeader {...props} />,
        }}
        name="cacheOut"
        component={CacheOut}
      />

      <Screen
        options={{
          title: 'Extrato',
          header: (props: any) => <GlobalHeader {...props} />,
        }}
        name="extrato"
        component={Extrato}
      />

      <Screen
        options={{
          title: 'FAVORITOS',
          header: (props: any) => <GlobalHeader {...props} />,
        }}
        name="favoritos"
        component={Favoritos}
      />
    </Navigator>
  );
}
