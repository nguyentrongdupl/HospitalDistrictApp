import * as React from 'react'
import { View, Text, StyleSheet, Button, ScrollView, Dimensions, Image } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Profile from '../Profile';
import { MenuCard } from '../../components';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card/Card';
import CureHistory from '../CureHistory/CureHistory';
import News from '../News/News';
import Appointment from '../Appointment/Appointment';
import Diseases from '../Diseases/Diseases';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserInfo } from '../../redux/reducer/userSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { AppointmentList } from '../AppointmentList/AppointmentList';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const deviceWidth = Math.round(Dimensions.get('window').width);
const homeStyle = StyleSheet.create(
  {
    root: {
      // backgroundColor: "green",
      width: deviceWidth,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: "wrap",
      // justifyContent: 'space-around'
    },
    contentContainer: {

      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',

      padding: 12,

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
    welcomecontainer: {
      height: 200,
      width: deviceWidth - 25,
      padding: 12,
      marginHorizontal: 12,
      marginTop: 20,
      backgroundColor: "#fff",
      borderRadius: 20,

      shadowColor: "#000",
      shadowOffset: {
        width: 5,
        height: 5,
      },
      shadowOpacity: 0.75,
      shadowRadius: 5,
      elevation: 9,

      position: "relative"
    },
    welcomeLogo: {
      height: 150,
      width: 150,

      position: "absolute",
      bottom: 0,
      right: 20
    },
    infoContainer: {
      width: deviceWidth - 25,
      padding: 12,
      marginHorizontal: 12,
      marginTop: 20,
      backgroundColor: "#fff",
      borderRadius: 20,

      shadowColor: "#000",
      shadowOffset: {
        width: 5,
        height: 5,
      },
      shadowOpacity: 0.75,
      shadowRadius: 5,
      elevation: 9,
    },
    basicInfoContainer: {
      flexDirection: 'row',
      marginLeft: 12
    },
    basicInfoTitle: {
      width: 120,
    }
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

function getWeekdayString(day: number) {
  switch (day) {
    case 0:
      return "Chủ nhật";
    case 1:
      return "Thứ hai";
    case 2:
      return "Thứ ba";
    case 3:
      return "Thứ tư";
    case 4:
      return "Thứ năm";
    case 5:
      return "Thứ sáu";
    case 6:
      return "Thứ bảy";
    default:
      return "";
  }
}

function getTodayDatetoString() {
  const today = new Date();
  var weekDay = today.getDay();
  var month = today.getUTCMonth() + 1; //months from 1-12
  var day = today.getUTCDate();
  var year = today.getUTCFullYear();
  return `${getWeekdayString(weekDay)}, ngày ${day} tháng ${month} năm ${year}`;
};

function HomeDisplayScreen({ navigation }: { navigation: any }) {
  const { info } = useSelector((state: RootState) => state.user)
  const menuList = [
    {
      icon: <MaterialCommunityIcons name="clipboard-text-clock-outline" size={64} color="black" />,
      title: 'Lịch sử khám bệnh',
      description: 'Xem lịch sử khám',
      onPress: () => navigation.navigate('History')
    },
    {
      icon: <MaterialCommunityIcons name="newspaper-variant-multiple-outline" size={64} color="black" />,
      title: 'Tin tức',
      description: 'Cung cấp các thông tin sức khỏe',
      onPress: () => navigation.navigate('News')
    },
    {
      icon: <MaterialCommunityIcons name="calendar-month-outline" size={64} color="black" />,
      title: 'Đặt lịch khám',
      description: 'Đặt trước lịch khám bệnh',
      onPress: () => navigation.navigate('Appointment'),
    },
    {
      icon: <FontAwesome name="calendar-check-o" size={54} color="black" />,
      title: 'Danh sách lịch hẹn',
      description: 'Xem danh sách lịch hẹn',
      onPress: () => navigation.navigate('AppointmentList'),
    },
    {
      icon: <FontAwesome5 name="bacterium" size={64} color="black" />,
      title: 'Bệnh',
      description: 'Thông tin các loại bệnh',
      onPress: () => navigation.navigate('Diseases')
    },
  ]

  const renderHealthInfo = () => {
    const info = useSelector((state: RootState) => state.user.info)
    const renderInfoValue = (value: string | number | undefined) => {
      if (value === 0) return "-";
      return value;
    }
    return (
      <View>
        <View style={homeStyle.basicInfoContainer}>
          <Text style={homeStyle.basicInfoTitle}>Nhịp tim</Text>
          <Text>{renderInfoValue(info?.heartRate)} bpm</Text>
        </View>
        <View style={homeStyle.basicInfoContainer}>
          <Text style={homeStyle.basicInfoTitle}>Nhiệt độ cơ thể</Text>
          <Text>{renderInfoValue(info?.temperature)} °C</Text>
        </View>
        <View style={homeStyle.basicInfoContainer}>
          <Text style={homeStyle.basicInfoTitle}>Huyết áp</Text>
          <Text>{`${renderInfoValue(info?.bloodPressureSystolic)}/${renderInfoValue(info?.bloodPressureDiastolic)}`}</Text>
        </View>
        <View style={homeStyle.basicInfoContainer}>
          <Text style={homeStyle.basicInfoTitle}>Đường huyết</Text>
          <Text>{renderInfoValue(info?.glucose)} mmHg</Text>
        </View>
        <View style={homeStyle.basicInfoContainer}>
          <Text style={homeStyle.basicInfoTitle}>Chiều cao</Text>
          <Text>{renderInfoValue(info?.height)} m</Text>
        </View>
        <View style={homeStyle.basicInfoContainer}>
          <Text style={homeStyle.basicInfoTitle}>Cân nặng</Text>
          <Text>{renderInfoValue(info?.weight)} kg</Text>
        </View>
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={homeStyle.root}>
      <View style={homeStyle.welcomecontainer}>
        <Text style={{ marginBottom: 20 }}>{getTodayDatetoString()}</Text>
        <Text>Xin chào, {info?.fullname}</Text>
        <Image
          style={homeStyle.welcomeLogo}
          source={require("../../assets/image/welcome-logo.png")}
        />
      </View>
      <View style={homeStyle.infoContainer}>
        <Text>Các chỉ số quan trọng của cơ thể</Text>
        {renderHealthInfo()}
      </View>
      <View style={[homeStyle.infoContainer, { flexDirection: "row", justifyContent: "space-between" }]}>
        <Text>Danh sách lịch hẹn hôm nay</Text>
        <AntDesign name="arrowright" size={24} color="black" onPress={() => navigation.navigate("AppointmentList")} />
      </View>
      <View style={[homeStyle.infoContainer, { flexDirection: "row", justifyContent: "space-between" }]}>
        <Text>Thông tin tư vấn</Text>
        <AntDesign name="arrowright" size={24} color="black" />
      </View>
      {menuList.map((menu, index) => (
        <View key={index} style={homeStyle.contentContainer}>
          <Card
            icon={menu.icon}
            title={menu.title}
            description={menu.description}
            onPress={menu.onPress}
          />
        </View>
      ))}
    </ScrollView>
  );
}

function HomeStackScreen() {
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name='Trang chủ' component={HomeDisplayScreen} />
      <HomeStack.Screen name='History' component={CureHistory} />
      <HomeStack.Screen name='News' component={News} />
      <HomeStack.Screen name='Appointment' component={Appointment} />
      <HomeStack.Screen name='AppointmentList' component={AppointmentList} />
      <HomeStack.Screen name='Diseases' component={Diseases} />
      <HomeStack.Screen name='Details' component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}


const HomeScreen = () => {
  const Tab = createBottomTabNavigator();
  const dispatch = useDispatch<AppDispatch>();
  React.useEffect(() => {
    dispatch(getCurrentUserInfo());
  }, [])

  return (
    <Tab.Navigator screenOptions={{
      tabBarHideOnKeyboard: true
    }}>
      <Tab.Screen
        name="HomePage"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Thông tin cá nhân"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeScreen;