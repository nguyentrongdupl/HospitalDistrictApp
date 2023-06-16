import * as React from 'react'
import {StyleSheet, View, Text, TextInput, Pressable, TouchableOpacity, ActivityIndicator} from 'react-native'

interface ICustomButtonProps{
    onPress: () => void,
    text: string,
    type?: string,
    isLoading?: boolean;
    loadingColor?: string;
}

const CustomButton = (props: ICustomButtonProps) => {
    const buttonStyles = StyleSheet.create({
        container:{
            width: '100%',
            height: 42,

            padding: 8,
            marginVertical: 5,

            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
        },
        container_PRIMARY: {
            backgroundColor: 'rgb(0, 120, 212)',
        },
        container_TERTIARY: {
            backgroundColor: '#111827'
        },
        text: {
            color: '#fff',
            fontWeight: 'bold'
        },
        text_TERTIARY: {
            color: 'gray'
        },
        insideContent: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
        }
    });

    return (
        <TouchableOpacity 
            style={[buttonStyles.container, buttonStyles[`container_${props.type}`]]} 
            onPress={props.onPress}
        >
            <View style={buttonStyles.insideContent}>
                {props.isLoading && <ActivityIndicator size="large" color={props.loadingColor} />}
                <Text style={[buttonStyles.text, buttonStyles[`text_${props.type}`]]}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CustomButton;