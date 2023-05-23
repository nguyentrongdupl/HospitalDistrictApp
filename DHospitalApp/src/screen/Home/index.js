import * as React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Profile from '../Profile';
import { MenuCard } from '../../components';

import {TbCalendarTime} from 'react-icons/tb'
import Ionicons from '@expo/vector-icons/Ionicons';

function DetailsScreen() {
    return (
        <View style={{
            flex: 1,
            //   justifyContent: 'center', 
            //   alignItems: 'center' 
        }}>
            <Text>Details!</Text>
        </View>
    );
}
  
  function HomeDisplayScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home screen</Text>
        <MenuCard item={{
          icon: <Ionicons name="md-checkmark-circle" size={32} color="green" />,
          title: 'Lịch sử khám bệnh',
          description: 'Lịch sử khám chữa bệnh'
        }}/>
        {/* <TbCalendarTime/> */}
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    );
  }

  
  
  function HomeStackScreen() {
    const HomeStack = createNativeStackNavigator();
    return (
      <HomeStack.Navigator screenOptions={{headerShown: false}}>
        <HomeStack.Screen name='HomeDisplay' component={HomeDisplayScreen}/>
        <HomeStack.Screen name='Details' component={DetailsScreen}/>
      </HomeStack.Navigator>
    );
  }
  
  
  export default HomeScreen = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="HomePage" component={HomeStackScreen} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
  }