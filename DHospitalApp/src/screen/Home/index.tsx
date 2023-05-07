import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const HomeScreen = () => {

    const homeStyle = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent:'center'
        }
    })

    return(
        <View style={homeStyle.container}>
            <Text>Đây là trang chủ</Text>
        </View>
    )
}