import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native';

interface MenuProps{
    item: {
        image: JSX.Element
        title: string,
        description: string
    }
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
        <View style={menuStyle.root}>
            <Text>MenuCard</Text>
            {/* <View>
                {props?.item.image}
            </View>  */}
            <Text>{props.item?.title}</Text>
            <Text>{props.item?.description}</Text>
        </View>
    )
}

export default MenuCard;