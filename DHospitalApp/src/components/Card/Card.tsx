import React from "react"
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from "react-native"

export interface ICardProps{
    imageSrc?: any;
    icon?: JSX.Element;
    title: string;
    description: string;
    onPress?: () => void;
}

const Card = (props: ICardProps) => {
    return (
        <View style={styles.cardContainer} >
            <TouchableOpacity onPress={() => props.onPress?.()}>
                {props?.imageSrc &&
                    <Image style={styles.imageStyle} source={props.imageSrc} />
                }
                {props?.icon &&
                    <View style={styles.iconStyle}>
                        {props.icon}
                    </View>
                }
                <View style={styles.infoStyle}>
                    <Text style={styles.titleStyle}>{props.title}</Text>
                    <Text style={styles.descriptionStyle}>{props.description}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const radius = 20;
const styles = StyleSheet.create({
    cardContainer: {
        width: deviceWidth -25,
        height: 200,
        backgroundColor: "#fff",
        borderRadius: radius,

        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 5,
        elevation: 9,

    },
    imageStyle: {
        height: 130,
        width: deviceWidth - 25,
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
        opacity: 0.9,
    },
    infoStyle: {
        marginHorizontal: 10,
        marginVertical: 5
    },
    titleStyle: {
        fontSize: 20,
        fontWeight: "700"
    },
    descriptionStyle: {
        fontWeight: "400"
    },
    iconStyle: {

    }
})

export default Card;