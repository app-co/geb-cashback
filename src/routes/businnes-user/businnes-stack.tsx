/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Providers } from '@/components/Providers';
import { CacheOut } from '@/components/templates/CacheOut';
import { ComapanyCasheout } from '@/components/templates/company-casheout';
import { Transactions } from '@/components/templates/transactions';
import { useAuth } from '@/context/auth';
import { BusinnesConfig } from '@/pages/businnes/BusinnesConfig';
import { useCompanyById } from '@/pages/businnes/BusinnesConfig/hooks/querys';
import { GlobalHeader } from '@/pages/businnes/components/headers/GlobalHeader';
import { HeadeInvit } from '@/pages/businnes/components/headers/HeadeInvit';
import { Dashboard } from '@/pages/businnes/Dashboard';
import { Extrato } from '@/pages/businnes/Extrato';
import { Faturamento } from '@/pages/businnes/faturamento';
import { Favoritos } from '@/pages/businnes/Favoritos';
import { Home } from '@/pages/businnes/Home';
import { Invit } from '@/pages/businnes/Invit';
import { Profile } from '@/pages/businnes/Profile';
import { Rewards } from '@/pages/businnes/Rewards';
import { Visible } from '@/pages/businnes/Visible';
import { FullCadastro } from '@/pages/Cadastro/FullCadastro';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Botton } from './botton';

const { Screen, Navigator } = createNativeStackNavigator();

export function BusinnesStack() {
  const { user } = useAuth();
  const { data, isLoading } = useCompanyById();

  if (!data?.id) {
    return (
      <Navigator>
        <Screen
          options={{
            headerShown: false,
          }}
          name="visible"
          component={Visible}
        />
        <Screen
          options={{
            title: 'Configurações',
            header: props => <GlobalHeader {...props} />,
          }}
          name="businnesConfig"
          component={BusinnesConfig}
        />
      </Navigator>
    );
  }

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

      <Screen
        options={{
          headerShown: false,
        }}
        name="BusinnesConfig"
        component={Botton}
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

      <Screen
        options={{
          title: 'Extrato',
          header: (props: any) => <GlobalHeader {...props} />,
        }}
        name="faturamento"
        component={Faturamento}
      />
      <Screen
        options={{
          title: 'SAQUE',
          header: (props: any) => <GlobalHeader {...props} />,
        }}
        name="casheout"
        component={ComapanyCasheout}
      />

      <Screen
        options={{
          title: 'SAQUE',
          header: (props: any) => <GlobalHeader {...props} />,
        }}
        name="dashboard"
        component={Dashboard}
      />
    </Navigator>
  );
}
