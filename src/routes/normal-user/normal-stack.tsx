import { Providers } from '@/components/Providers';
import { FullCadastro } from '@/pages/Cadastro/FullCadastro';
import { Home } from '@/pages/NORMAL/Home';
import { Profile } from '@/pages/NORMAL/Profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Screen, Navigator } = createNativeStackNavigator();

export function NormalStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="normal-home" component={Home} />
      <Screen name="providers" component={Providers} />
      <Screen name="fullCadastro" component={FullCadastro} />
      <Screen name="profile" component={Profile} />
    </Navigator>
  );
}
