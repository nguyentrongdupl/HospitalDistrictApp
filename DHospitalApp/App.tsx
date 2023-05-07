import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Platform, NativeModules } from 'react-native';
import { LoginScreen } from './src/screen/Login';
import { HomeScreen } from './src/screen/Home';
import AppNavigator from './AppNavigator'
import React from 'react';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeScreen/>
      {/* <LoginScreen/> */}
      {/* <AppNavigator/> */}
    </SafeAreaView>
  );
}

const {StatusBarManager} = NativeModules;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#111827',
    paddingTop: Platform.OS === 'android' ? StatusBarManager.height : 0,
  },
});
