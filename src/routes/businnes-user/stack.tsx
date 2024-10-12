/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { ComapanyCasheout } from '@/components/templates/company-casheout';
import { useAuth } from '@/context/auth';
import { GlobalHeader } from '@/pages/businnes/components/headers/GlobalHeader';
import { Dashboard } from '@/pages/businnes/Dashboard';
import { Faturamento } from '@/pages/businnes/faturamento';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Screen, Navigator } = createNativeStackNavigator();

export function Stack() {
  const { user } = useAuth();

  return (
    <Navigator>
      <Screen
        options={{
          title: 'Dashboard',
          header: (props: any) => <GlobalHeader {...props} />,
        }}
        name="dashboard"
        component={Dashboard}
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
    </Navigator>
  );
}
