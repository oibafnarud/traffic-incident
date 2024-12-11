import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../screens/auth/Login';
import { Register } from '../screens/auth/Register';
import { colors } from '../theme';

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.white,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: colors.primary,
      headerTitleStyle: {
        fontWeight: '600',
      },
    }}
  >
    <Stack.Screen 
      name="Login" 
      component={Login} 
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="Register" 
      component={Register}
      options={{ title: 'Registro' }}
    />
  </Stack.Navigator>
);