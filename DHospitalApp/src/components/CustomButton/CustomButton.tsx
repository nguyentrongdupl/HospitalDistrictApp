import * as React from 'react'
import {StyleSheet, View, Text, TextInput, Pressable, TouchableOpacity} from 'react-native'

interface ICustomButtonProps{
    onPress: () => void,
    text: string,
    type?: string,
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
        }
    });

    return (
        <TouchableOpacity 
            style={[buttonStyles.container, buttonStyles[`container_${props.type}`]]} 
            onPress={props.onPress}
        >
            <Text style={[buttonStyles.text, buttonStyles[`text_${props.type}`]]}>{props.text}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton;