/* eslint-disable react/no-unstable-nested-components */
import * as Ico from 'phosphor-react-native';

import { cor } from '@/styles/cor';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { DrawerContent } from '../components/routes/DrawerComp';
import { PrivateBottonRoute } from './privateBottonRoute';

const S = createDrawerNavigator();

export function PrivateDrawerRoute() {
  return (
    <S.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        drawerActiveBackgroundColor: cor.focus.a,
        drawerInactiveBackgroundColor: cor.focus.a,
        drawerInactiveTintColor: cor.focus.a,
        drawerActiveTintColor: cor.focus.a,
        drawerLabelStyle: {
          fontFamily: 'Bold',
        },
        headerShown: false,
      }}
    >
      <S.Screen
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ico.HouseLine
              weight="duotone"
              size={size}
              color={focused ? cor.focus.a : cor.focus.b}
            />
          ),
        }}
        name="Início"
        component={PrivateBottonRoute}
      />
    </S.Navigator>
  );
}
