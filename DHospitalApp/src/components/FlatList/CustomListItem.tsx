import React, { useState, useEffect } from 'react'
import {Image, TouchableOpacity, StyleSheet, Text, View, Pressable } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { CheckBox } from '@rneui/base';

interface IListItemProps {
    item: any;
    havePicture?: boolean;
    selected?: boolean;
    onSelect? : (value: any) => void;
}

export const CustomListItem = (props: IListItemProps) => {
    const { item, havePicture, selected, onSelect } = props;
    const [expanded, setExpanded] = useState<boolean>(false);
    const [isSelected, setSelected] = useState<boolean>(false);
    useEffect(() => {
        setSelected(selected!)
    },[selected])

    return (
        <Pressable style={styles.wrap} >
            <View style={styles.container}>
                {havePicture && (
                    <Image source={{ uri: item.image }} style={styles.image} />
                )}
                <View style={styles.container}>
                    <CheckBox 
                        checked={isSelected}
                        onPress={(e) => {
                            // setSelection(!isSelected)
                            onSelect?.(item)
                        } }
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{item.title}</Text>
                        <Text style={styles.text}>{item.subtitle}</Text>
                    </View>
                </View>
                <View style={{marginRight: 8}}>
                    {expanded ? (
                        <Entypo name="chevron-down" size={24} color="black" onPress={() => setExpanded(!expanded)}/>
                    ) : (
                        <Entypo name="chevron-up" size={24} color="black" onPress={() => setExpanded(!expanded)}/>
                    )

                    }

                </View>
            </View>
            {expanded && (
                <Text style={[styles.details, styles.text]}>{item.details}</Text>
            )}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    wrap: {
        borderColor: '#ccc', borderWidth: 1, marginVertical: 5, marginHorizontal: 10, borderRadius: 5, backgroundColor: '#fff',
        shadowColor: '#000', shadowOffset: { width: 3, height: 3 }, shadowOpacity: 0.2,
    },
    container: { flexDirection: 'row', justifyContent: "space-between", alignItems: "center"},
    image: { width: 50, height: 50, margin: 10, borderRadius: 5, },
    textContainer: { justifyContent: 'space-around' },
    details: { margin: 10 },
    text: { opacity: 0.7 },
});