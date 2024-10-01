import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/login.jsx';
import RegisterScreen from '../screens/register.jsx';
import MenuScreen from '../screens/menu.jsx';
import FixedCostsScreen from '../screens/fixedCosts.jsx';
import VariableCostsScreen from '../screens/variablesCostsScreen.jsx';
import TotalCostsScreen from '../screens/totalCosts.jsx';

const Stack = createNativeStackNavigator();

export default function RoutesProject() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Menu' component={MenuScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='fixedCosts' component={FixedCostsScreen} />
        <Stack.Screen name='variablesCosts' component={VariableCostsScreen} />
        <Stack.Screen name='totalCosts' component={TotalCostsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}