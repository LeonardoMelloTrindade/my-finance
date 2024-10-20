import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/login.jsx';
import RegisterScreen from '../screens/register.jsx';
import MenuScreen from '../screens/menu.jsx';
import DownPaymentScreen from '../screens/downPaymentScreen.jsx';
import ExpensesScreen from '../screens/expensesScreen.jsx';

const Stack = createNativeStackNavigator();

export default function RoutesProject() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Tela de login' component={LoginScreen} />
        <Stack.Screen name='Tela principal' component={MenuScreen} />
        <Stack.Screen name='Tela de registro' component={RegisterScreen} />
        <Stack.Screen name='Tela de entradas' component={DownPaymentScreen} />
        <Stack.Screen name='Tela de despesas' component={ExpensesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}