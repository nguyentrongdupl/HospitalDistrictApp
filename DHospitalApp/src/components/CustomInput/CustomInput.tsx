import * as React from 'react'
import { useState } from 'react'
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';

interface ICustomInputProps {
    value: string,
    onChange?: (text: string) => void,
    placeholder?: string,
    errorMessage?: string,
    showInput?: boolean,
    secureTextEntry?:boolean,
}

export const CustomInput = (props: ICustomInputProps) => {
    const [showtext, setShowText] = useState<boolean>(false);
    const inputStyles = StyleSheet.create({
        container: {
            backgroundColor: '#fff',
            width: '100%',

            borderColor: '#e8e8e8',
            borderWidth: 1,
            borderRadius: 5,

            paddingHorizontal: 10,
            marginVertical: 5,

        },
        input: {
            height: 42,
            position: "relative"
        },
        eyeIcon: {
            position: "absolute",

            right: 8,
            top: 8
        }
    });

    return (
        <View style={inputStyles.container}>
            <TextInput
                placeholder={props?.placeholder}
                value={props.value}
                onChangeText={(text) => props.onChange?.(text)}
                style={inputStyles.input}
                secureTextEntry={!showtext && props.secureTextEntry}
            />
            {props?.showInput && props.secureTextEntry && props.value !== "" && (
                <Pressable style={inputStyles.eyeIcon} onPress={() => setShowText(!showtext)}>
                    { !showtext ? (
                        <FontAwesome5 name="eye-slash" size={24} color="black" />
                    ) : (
                        <FontAwesome5 name="eye" size={24} color="black" />
                    )}
                </Pressable>
            )}
        </View>
    )
}