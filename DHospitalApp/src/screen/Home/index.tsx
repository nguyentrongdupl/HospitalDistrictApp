import * as React from 'react'
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Profile from '../Profile';
import { MenuCard } from '../../components';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card/Card';

const homeStyle = StyleSheet.create(
  {
      root: {
          // flex: 1,
          // overflow: 'scroll',
      },
      content: {
          // height: '100%',
          // width: '100%',

          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around'

      },
      menu: {
          width: '45%',
          paddingTop: 20,
          paddingBottom: 20,
      },
      errorMessage: {
          color: 'red',
          height: 30,
      },

  }
)

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

const menuList = [
  {
    icon: <MaterialCommunityIcons name="calendar-clock" size={24} color="black" />,
    title: 'Lịch sử khám bệnh',
    description: 'Lịch sử khám chữa bệnh'
  },
  {
    icon: <MaterialCommunityIcons name="newspaper-variant-multiple-outline" size={24} color="black" />,
    title: 'Tin tức',
    description: 'Lịch sử khám chữa bệnh'
  },
  {
    icon: <FontAwesome5 name="bacterium" size={24} color="black" />,
    title: 'Bệnh',
    description: 'Lịch sử khám chữa bệnh'
  },
]
  
  function HomeDisplayScreen({navigation}: {navigation: any}) {
    return (
      <ScrollView style={homeStyle.root}>
        {/* <View style={homeStyle.content}>
          {
            menuList.map((item, index) => (
              <MenuCard 
                key={index}
                item={{
                  icon: item.icon,
                  title: item.title,
                  description: item.description
                }}
                style={homeStyle.menu}
              />
            ))
          }
        </View> */}
          <Card
            imageSrc={require('../../../assets/niceView.jpg')}
            title='Lịch sử khám bệnh'
            description='Xem lịch sử khám'
            onPress={() => navigation.navigate('Details')}
          />
          <Card
            imageSrc={require('../../../assets/niceView.jpg')}
            title='Lịch sử khám bệnh'
            description='Xem lịch sử khám'
          />
          <Card
            imageSrc={require('../../../assets/niceView.jpg')}
            title='Lịch sử khám bệnh'
            description='Xem lịch sử khám'
          />
          <Card
            imageSrc={require('../../../assets/niceView.jpg')}
            title='Lịch sử khám bệnh'
            description='Xem lịch sử khám'
          />
          <Card
            imageSrc={require('../../../assets/niceView.jpg')}
            title='Lịch sử khám bệnh'
            description='Xem lịch sử khám'
          />

          <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Details')}
          />
      </ScrollView>
    );
  }

  
  
  function HomeStackScreen() {
    const HomeStack = createNativeStackNavigator();
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name='HomeDisplay' component={HomeDisplayScreen}/>
        <HomeStack.Screen name='Details' component={DetailsScreen}/>
      </HomeStack.Navigator>
    );
  }
  
  
  const HomeScreen = () => {
    const Tab = createBottomTabNavigator();
    
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen 
            name="HomePage" 
            component={HomeStackScreen} 
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
            }}          
          />
          <Tab.Screen 
            name="Profile" 
            component={Profile} 
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({color, size}) => (
                <Ionicons name="person-circle-outline" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
    );
  }

  export default HomeScreen;