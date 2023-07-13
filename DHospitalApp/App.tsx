import LoginScreen from './src/screen/Login';
import HomeScreen from './src/screen/Home'
import React from 'react';
import { Provider } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from "./src/redux/store"
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const token = async () => {
  const result = await AsyncStorage.getItem('accessToken');
  return result
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
          {/* {!token() ? */}
            {/* ( */}
              <Stack.Screen name="Login" component={LoginScreen} />
            {/* ) */}
            {/* :
            ( */}
              <Stack.Screen name="Home" component={HomeScreen} />
            {/* )
          } */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
