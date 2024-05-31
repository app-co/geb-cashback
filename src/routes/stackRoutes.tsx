import { Cadastro } from '@/pages/Cadastro';
import { FullCadastro } from '@/pages/Cadastro/FullCadastro';
import { SimpleCadastro } from '@/pages/Cadastro/SimpleCadastro';
import { Login } from '@/pages/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Screen, Navigator } = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="login" component={Login} />
      <Screen name="signUp" component={Cadastro} />
      <Screen name="simpleCadastro" component={SimpleCadastro} />
      <Screen name="fullCadastro" component={FullCadastro} />
    </Navigator>
  );
}
