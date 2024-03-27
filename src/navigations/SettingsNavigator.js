/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Settings, Notifications } from '../screens';
import { ROUTES } from '../constants';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ROUTES.HOME}
    >
      <Stack.Screen name={ROUTES.HOME} component={Home} />
      <Stack.Screen name={ROUTES.SETTINGS} component={Settings} />
      <Stack.Screen name={ROUTES.NOTIFICATIONS} component={Notifications} />
      {/* Add more screens if needed */}
    </Stack.Navigator>
  );
}

export default AppNavigator;
