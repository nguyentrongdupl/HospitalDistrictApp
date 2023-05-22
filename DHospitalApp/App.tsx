//import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Platform, NativeModules , StatusBar} from 'react-native';
import LoginScreen from './src/screen/Login';
// import { HomeScreen } from './src/screen/Home';
import HomeScreen from './src/screen/Home'
import AppNavigator from './AppNavigator'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
