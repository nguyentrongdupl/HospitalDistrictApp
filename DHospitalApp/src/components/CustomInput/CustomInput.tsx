import * as React from 'react'
import {StyleSheet, View, Text, TextInput} from 'react-native'

interface ICustomInputProps{
    value: string,
    onChange?: (text: string) => void,
    placeholder?: string,
    secureTextEntry?: boolean,
    errorMessage?: string
}

export const CustomInput = (props: ICustomInputProps) => {
    const inputStyles = StyleSheet.create({
        container:{
            backgroundColor: '#fff',
            width: '100%',

            borderColor: '#e8e8e8',
            borderWidth: 1,
            borderRadius: 5,

            paddingHorizontal: 10,
            marginVertical: 5,
        },
        input: {
            height: 42
        }
    });

    return(
        <View style={inputStyles.container}>
           <TextInput 
                placeholder={props?.placeholder}
                value={props.value}
                onChangeText={(text) => props.onChange?.(text)}
                style={inputStyles.input}
                secureTextEntry={props?.secureTextEntry}
           />
        </View>
    )
}