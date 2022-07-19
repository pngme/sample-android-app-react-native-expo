import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './context/user-provider';
import Login from './screens/login';
import SignUp from './screens/singup';
import Welcome from './screens/welcome';
import Permissions from './screens/permissions';
import LoanApplication from './screens/loan-application';

const APP_NAME = 'Acme Bank';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ title: APP_NAME }} />
          <Stack.Screen name="Signup" component={SignUp} options={{ title: APP_NAME }} />
          <Stack.Screen name="Welcome" component={Welcome} options={{ title: APP_NAME }} />
          <Stack.Screen name="Permissions" component={Permissions} options={{ title: APP_NAME }} />
          <Stack.Screen
            name="LoanApplication"
            component={LoanApplication}
            options={{ title: APP_NAME }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
