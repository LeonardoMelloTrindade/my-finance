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
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Menu' component={MenuScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='fixedCosts' component={DownPaymentScreen} />
        <Stack.Screen name='variablesCosts' component={ExpensesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}