import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react"
import { getAppointmentList, resetListStatus } from "../../redux/reducer/appointmentList";
import { ApiStatus, ScheduleRequestStatus } from "../../utils/enum";
import { CustomListItem } from "../../components/FlatList/CustomListItem";
import { getDoctorPosition, getDoctorRank } from "../../utils/convert";

export const AppointmentList = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { appointmentList, status } = useSelector((state: RootState) => state.appointmentList);

    const [items, setItems] = useState<any[]>([])

    const filter = {
        page: 1,
        pageSize: 20,
        searchKey: "",
        tableType: 12
    }

    const getStatusRequestSchedule = (type: ScheduleRequestStatus) => {
        let text;
        let colorText;
        switch (type) {
            case ScheduleRequestStatus.accpect:
                text = "Chấp nhận";
                colorText = "#32CD32";
                break;
            case ScheduleRequestStatus.wait:
                text = "Chờ xác nhận";
                colorText = "#DAA520";
                break;
            case ScheduleRequestStatus.reject:
                text = "Từ chối";
                colorText = "#DC143C";
                break;
        }
        return (<Text style={{ color: colorText }}> {text} </Text>)

    }

    useEffect(() => {
        dispatch(getAppointmentList(filter));
    }, [])

    useEffect(() => {
        if (status === ApiStatus.Success) {
            const list: { id: any; title: any; subtitle: any; details: JSX.Element; }[] = [];
            appointmentList.forEach((appt) => {
                list.push({
                    id: appt._id,
                    title: appt.appointmentDate,
                    subtitle: <View>
                        <Text style={{ marginRight: 8 }}>{`Bác sĩ: ${appt.doctorName}`}</Text>
                        {getStatusRequestSchedule(appt.status)}
                    </View>,
                    details:
                        <View style={{ display: "flex", flexDirection: "column" }}>
                            <Text>{`Khoa: ${appt.departmentName}`}</Text>
                            <Text>{`Chức vụ: ${getDoctorPosition(appt.doctorPosition)}`}</Text>
                            <Text>{`Học vấn: ${getDoctorRank(appt.doctorRank)}`}</Text>
                        </View>
                })
            });
            setItems(list);
            dispatch(resetListStatus())
        }
    }, [status])

    return (
        <View style={style.container}>
            {status === ApiStatus.Loading ? (
                <ActivityIndicator />
            ) : (
                items.length === 0 ?
                    <View>
                        <Text>
                            Không có lịch hẹn khám nào
                        </Text>
                    </View>
                    :
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