import * as React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

const Profile = ({ navigation }: { navigation: any }) => {
    const {username} = useSelector((state: RootState) => state.user)
    const deviceWidth = Math.round(Dimensions.get('window').width);

    const [openEdit, setOpenEdit] = useState(false);

    const profileStyle = StyleSheet.create({
        imageContainer: {
            width: deviceWidth -25,
            marginHorizontal: 12,
            // height: deviceWidth,
            // borderRadius: deviceWidth * 0.25,
            overflow: 'hidden',

            paddingTop: 40,
            alignItems: 'center',
            // backgroundColor: "green",
            
            // opacity: 0.7
        },
        image: {
            width: deviceWidth * 0.5,
            height: deviceWidth * 0.5,

            borderRadius: deviceWidth * 0.25,
        },
        title: {
            height: 32,
            fontSize: 20,
            fontWeight: '600',
            marginVertical: 8
        },
        infoContainer: {
            width: deviceWidth -25,
            marginHorizontal: 12,
            marginTop: 20,
            
            // borderColor: "black",
            // borderWidth: 1,
            borderRadius: 20,
            paddingHorizontal: 10,
            paddingVertical: 20,
            marginBottom: 20,
            backgroundColor: "#fff",
            
        },
        textInfoContainer:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: "space-between",

            paddingVertical: 8,
            borderColor: "#ADB1B4",
            borderBottomWidth: 1
        },
        textInfo: {
            // height: 32,
            fontSize: 16,
        },
        editBtn: {
            height: 40,
            width: 150,
            backgroundColor: "yellow",
            alignItems: 'center',
            justifyContent: "center",
            borderRadius: 8,
            
            // backgroundColor: 'blue',
            color: 'white'
        },
        logout:{
            height: 40,
            width: 150,
            backgroundColor: "green",
            alignItems: 'center',
            justifyContent: "center",
            borderRadius: 8,
            // backgroundColor: 'blue',
            color: 'white'
        },
    });

    const personalInfomation = [
        {
            title: 'Tên đăng nhập:',
            value: username
        },
        {
            title: 'Ngày sinh:',
            value: '30/04/1990'
        },
        {
            title: 'Giới tính:',
            value: 'Nam'
        },
        {
            title: 'Địa chỉ:',
            value: "Hà Nội"
        },
        {
            title: 'Căn cước công dân:',
            value: ""
        },
        {
            title: 'Bảo hiểm y tế',
            value: ""
        },
    ]
    
    return(
        <SafeAreaView>
            <View style={profileStyle.imageContainer}>
                <Image style={profileStyle.image} source={require("../../../assets/niceView.jpg")} />
                <Text style={[profileStyle.title, {width: deviceWidth -25, marginHorizontal: 12, textAlign: "center"}]}>
                    Nguyễn Văn A
                </Text>
            </View>
            <View style={profileStyle.infoContainer}>
                {personalInfomation.map((info) => (
                    <View style={profileStyle.textInfoContainer}>
                        <Text style={profileStyle.textInfo}>{info.title}</Text>
                        <Text style={profileStyle.textInfo}>{info.value}</Text>
                    </View>
                ))}
            </View>
            <View style={{flexDirection: 'row', justifyContent: "space-around", marginTop: 40}}>
                <TouchableOpacity style={profileStyle.editBtn} onPress={() => setOpenEdit(true)}>
                    <Text>Chỉnh sửa thông tin </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={profileStyle.logout}
                    onPress={() => {
                        navigation.navigate('Login')
                        AsyncStorage.clear();
                    }}
                >
                    <Text>Đăng xuất</Text>                
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Profile;