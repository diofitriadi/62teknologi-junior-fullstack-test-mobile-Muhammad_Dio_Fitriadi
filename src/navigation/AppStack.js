import React from 'react'
import AppNav from '../screens/AppNav'
import AppDetails from '../screens/AppDetails'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AppNav" component={AppNav} />
        <Stack.Screen name="AppDetails" component={AppDetails} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default AppStack