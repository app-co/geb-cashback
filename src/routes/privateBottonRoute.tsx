/* eslint-disable react/no-unstable-nested-components */
import * as Ico from 'phosphor-react-native';

import { cor } from '@/styles/cor';
import { _text } from '@/styles/sizes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '../pages/Home';

const S = createBottomTabNavigator();

export function PrivateBottonRoute() {
  return (
    <S.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: cor.focus.a,
        tabBarLabelStyle: {
          fontFamily: 'Regular',
          fontSize: _text,
        },
        tabBarInactiveTintColor: cor.focus.a,
        tabBarStyle: {
          paddingTop: 5,
          paddingBottom: 10,
          backgroundColor: cor.focus.a,
          height: 70,
        },
      }}
    >
      <S.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ico.HouseLine size={size} weight="duotone" color={color} />
          ),
        }}
      />
    </S.Navigator>
  );
}
