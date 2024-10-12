/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Platform } from 'react-native';

import * as NavigationBar from 'expo-navigation-bar';

import { ChartLine, Gear, QrCode } from 'phosphor-react-native';

import { BusinnesConfig } from '@/pages/businnes/BusinnesConfig';
import { GlobalHeader } from '@/pages/businnes/components/headers/GlobalHeader';
import { Qrcod } from '@/pages/businnes/Qrcod';
import { cor } from '@/styles/cor';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Stack } from './stack';

const Bt = createBottomTabNavigator();

export function Botton() {
  React.useEffect(() => {
    async function behover() {
      await NavigationBar.setVisibilityAsync('hidden');
    }
    if (Platform.OS === 'android') {
      // behover();
    }
  }, []);

  return (
    <Bt.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: cor.bgcolor,
          height: 70,
        },
        tabBarItemStyle: {
          paddingVertical: 10,
          height: 70,
        },
        tabBarActiveTintColor: cor.focus.a,
      }}
    >
      <Bt.Screen
        options={{
          title: 'Dashboard',
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <ChartLine weight="duotone" size={size} color={color} />
          ),
        }}
        name="actions"
        component={Stack}
      />

      <Bt.Screen
        options={{
          title: 'QRcode',
          header: props => <GlobalHeader {...props} />,
          tabBarIcon: ({ size, color }) => (
            <QrCode weight="duotone" size={size} color={color} />
          ),
        }}
        name="qrcode"
        component={Qrcod}
      />
      <Bt.Screen
        options={{
          title: 'Configurações do seu negócio',
          header: props => <GlobalHeader {...props} />,
          tabBarIcon: ({ size, color }) => (
            <Gear weight="duotone" size={size} color={color} />
          ),
        }}
        name="businnesConfig"
        component={BusinnesConfig}
      />
    </Bt.Navigator>
  );
}
