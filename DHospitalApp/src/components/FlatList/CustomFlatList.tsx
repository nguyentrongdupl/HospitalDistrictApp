import React from 'react'
import { FlatList, View } from 'react-native'
import { CustomListItem } from './CustomListItem';

interface IFlatListProps{
    data: any[];
}

export const CustomFlastList = (props: IFlatListProps) => {
    const { data } = props;

    const renderItem = (item: any) => {
        return(
            <CustomListItem item ={item} />
        )
    }
    return(
        <View>
            <FlatList
                data={data || []}
                keyExtractor={(item, index) => `${item.title}${index}`}
                renderItem={renderItem}
            />
        </View>
    )
}