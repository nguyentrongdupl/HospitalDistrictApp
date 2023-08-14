import * as React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView, RefreshControl } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { getGender } from '../../utils/convert';
import EditProfile from './EditProfile';
import { getCurrentUserInfo, setStatus } from '../../redux/reducer/userSlice';
import { ApiStatus } from '../../utils/enum';

const Profile = ({ navigation }: { navigation: any }) => {
    const { username } = useSelector((state: RootState) => state.user)
    const deviceWidth = Math.round(Dimensions.get('window').width);

    const [openEdit, setOpenEdit] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    const { info, status } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>();

    const profileStyle = StyleSheet.create({
        imageContainer: {
            width: deviceWidth - 25,
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
            width: deviceWidth - 25,
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
        textInfoContainer: {
            display: 'flex',
            flexDirection: 'row',
            // justifyContent: "space-between",

            paddingVertical: 8,
            borderColor: "#ADB1B4",
            borderBottomWidth: 1
        },
        textTitle: {
            fontSize: 16,
            width: 170
        },
        textInfo: {
            // height: 32,
            fontSize: 16,
            maxWidth: 200
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
        logout: {
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

    const personalInfomation =React.useCallback(() => {return [
        {
            title: 'Tên đăng nhập:',
            value: username
        },
        {
            title: 'Ngày sinh:',
            value: info?.dateOfBirth
        },
        {
            title: 'Giới tính:',
            value: getGender(info?.gender!)
        },
        {
            title: 'Điện thoại',
            value: info?.phonenumber
        },
        {
            title: 'Email:',
            value: info?.email,
        },
        {
            title: 'Địa chỉ:',
            value: info?.address
        },
        {
            title: 'Căn cước công dân:',
            value: info?.identification
        },
        {
            title: 'Bảo hiểm y tế',
            value: info?.insurance
        },
    ]},[status]);

    React.useEffect(() => {
        if (status === ApiStatus.Success) {
            dispatch(setStatus(ApiStatus.None))
            setRefreshing(false);
        }
    }, [status])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(getCurrentUserInfo());
    }, [status]);

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={profileStyle.imageContainer}>
                <Image style={profileStyle.image} source={{ uri: info?.avatar }} />
                <Text style={[profileStyle.title, { width: deviceWidth - 25, marginHorizontal: 12, textAlign: "center" }]}>
                    {info?.fullname}
                </Text>
            </View>
            <View style={profileStyle.infoContainer}>
                {personalInfomation().map((info) => (
                    <View key={info.title} style={profileStyle.textInfoContainer}>
                        <Text style={profileStyle.textTitle}>{info.title}</Text>
                        <Text style={profileStyle.textInfo}>{info.value}</Text>
                    </View>
                ))}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: "space-around", marginTop: 40 }}>
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
            <EditProfile
                // profileInfo={undefined} 
                openModal={openEdit}
                toggleModal={() => setOpenEdit(false)} />
        </ScrollView>
    )
}

export default Profile;