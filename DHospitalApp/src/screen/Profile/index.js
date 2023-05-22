import * as React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

const Profile = ({navigation}) => {

    const profileStyle = StyleSheet.create({
        logout:{
            height: 30,
            backgroundColor: 'blue',
            color: 'white'
        }
    });

    return(
        <View>
            <Text>Profile screen</Text>
            <TouchableOpacity
                style={profileStyle.logout}
                onPress={() => {
                    navigation.navigate('Login')
                }}
            >
                <Text>Đăng xuất</Text>                
            </TouchableOpacity>
        </View>
    )
}

export default Profile;