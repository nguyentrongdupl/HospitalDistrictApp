import { useEffect, useState } from "react";
import { ScrollView, Text, View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getCureHistoryList, resetHistoryListStatus } from "../../redux/reducer/cureHistorySlice";
import { ApiStatus, MappingTypeAppointmentSchedule } from "../../utils/enum";
import { CustomListItem } from "../../components/FlatList/CustomListItem";
import { AntDesign } from '@expo/vector-icons';

const CureHistory = ({ navigation }: { navigation: any }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { cureHistoryList, status } = useSelector((state: RootState) => state.cureHistoryList);

    const [items, setItems] = useState<any[]>([]);

    const filter = {
        page: 1,
        pageSize: 9,
        searchKey: "",
        tableType: 14
    }

    useEffect(() => {
        dispatch(getCureHistoryList(filter));
    }, []);




    useEffect(() => {
        if (status === ApiStatus.Success) {
            const list: { id: any; title: any; subtitle: any; details: JSX.Element; }[] = [];
            cureHistoryList.forEach((his) => {
                list.push({
                    id: his._id,
                    title: his.appointmentDate,
                    subtitle: <View>
                        <Text style={{ marginRight: 8 }}>{`Bác sĩ: ${his.fullname}`}</Text>
                        <Text>{MappingTypeAppointmentSchedule[his.typeAppointment]}</Text>
                    </View>,
                    details:
                        <View 
                            style={{ 
                                flex: 1,
                                display: "flex", 
                                flexDirection: "row", 
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <View style={{ display: "flex", flexDirection: "column" }}>
                                <Text>{`Khoa: ${his.departmentName}`}</Text>
                                <Text>{`Triệu chứng: ${his.initialSymptom}`}</Text>
                            </View>
                            <View>
                                <AntDesign name="infocirlce" size={24} color="black" 
                                    onPress={() => navigation.navigate(`Details`, {id: his._id})}
                                />
                            </View>
                        </View>
                })
            });
            setItems(list);
            dispatch(resetHistoryListStatus());
        }
    }, [status])

    return (
        <View style={style.container}>
            {status === ApiStatus.Loading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={items || []}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={({ item }: { item: any }) =>
                        <CustomListItem
                            item={item}
                            havePicture={false}
                            selectable={false}
                        />
                    }
                />

            )}
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
})

export default CureHistory;