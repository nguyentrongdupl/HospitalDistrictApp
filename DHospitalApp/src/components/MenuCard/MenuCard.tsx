import * as React from 'react'
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Icon } from '@rneui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';

interface MenuProps{
    item: {
        icon: JSX.Element,
        title: string,
        description: string
    },
    style: StyleProp<ViewStyle>
    
}

const MenuCard = (props: MenuProps) => {
    const menuStyle = StyleSheet.create({
        root: {
            borderColor: 'black',
            borderWidth: 3,
        },
        image:{},
        title:{},
        description:{}
    })
    return(
        <View style={[menuStyle.root, props.style]}>
            <View>
                {props.item.icon}
            </View> 
            <Text>{props.item?.title}</Text>
            <Text>{props.item?.description}</Text>
        </View>
    )
}

export default MenuCard;