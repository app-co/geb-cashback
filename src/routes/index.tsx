import React, { ReactNode } from 'react';

import { Center } from 'native-base';

import { Loading } from '@/components/Loading';
import { useAuth } from '@/context/auth';
import { NavigationContainer } from '@react-navigation/native';

import { BusinnesStack } from './businnes-user/businnes-stack';
import { NormalStack } from './normal-user/normal-stack';
import { SimpleStack } from './Simple-user/stack';
import { StackRoutes } from './stackRoutes';

export function Routes() {
  const { user, loading } = useAuth();

  const routeType: { [key: string]: ReactNode } = {
    simple: <SimpleStack />,
    businnes: <BusinnesStack />,
    normal: <NormalStack />,
  };

  if (loading) {
    return (
      <Center flex="1">
        <Loading />
      </Center>
    );
  }
  return (
    <NavigationContainer>
      {user ? routeType[user.account_type] : <StackRoutes />}
    </NavigationContainer>
  );
}
