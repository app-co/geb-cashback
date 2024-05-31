import { useStorage } from '@/context/storage';
import { Prestadores } from '@/pages/SIMPLE/Providers';
import { SimpleWellcome } from '@/pages/SIMPLE/search-segmentos';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Screen, Navigator } = createNativeStackNavigator();

export function SimpleStack() {
  const { getSegments } = useStorage();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {getSegments?.firstLogin ? (
        <Screen name="segmentos" component={SimpleWellcome} />
      ) : (
        <Screen name="providers" component={Prestadores} />
      )}
    </Navigator>
  );
}
