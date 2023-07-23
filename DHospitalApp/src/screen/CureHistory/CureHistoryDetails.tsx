import { useEffect, useState } from "react";
import { ScrollView, Text, View, StyleSheet, ActivityIndicator, FlatList, Dimensions, Pressable } from "react-native";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getCureHistoryList, resetHistoryListStatus } from "../../redux/reducer/cureHistorySlice";
import { ApiStatus, MappingTypeAppointmentSchedule, TestList } from "../../utils/enum";
import { CustomListItem } from "../../components/FlatList/CustomListItem";
import { AntDesign } from '@expo/vector-icons';
import { getCureHistoryDetails } from "../../redux/reducer/cureHistoryDetailsSlice";
import { getDoctorPosition, getDoctorRank } from "../../utils/convert";

const CureHistoryDetails = ({ route, navigation }: { route: any, navigation: any }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = route.params;

    const { cureHistoryDetails, status } = useSelector((state: RootState) => state.cureHistoryDetails);

    useEffect(() => {
        dispatch(getCureHistoryDetails(id));
    }, []);

    useEffect(() => {
        if (status === ApiStatus.Success) {
            dispatch(resetHistoryListStatus());
        }
    }, [status])

    const renderAppointmentInfo = () => {
        return (
            <View style={style.contentContainer}>
                <Text style={style.contentTitle}>Thông tin lịch khám</Text>
                <View>
                    <View style={style.basicInfoContainer}>
                        <Text style={style.basicInfoTitle}>Ngày khám</Text>
                        <Text style={style.basicInfoDes}>{cureHistoryDetails.appointmentDate}</Text>
                    </View>
                    <View style={style.basicInfoContainer}>
                        <Text style={style.basicInfoTitle}>Kiểu khám</Text>
                        <Text style={style.basicInfoDes}>{MappingTypeAppointmentSchedule[cureHistoryDetails.typeAppointment]}</Text>
                    </View>
                    <View style={style.basicInfoContainer}>
                        <Text style={style.basicInfoTitle}>Khoa</Text>
                        <Text style={style.basicInfoDes}>{cureHistoryDetails.departmentName}</Text>
                    </View>
                    <View style={style.basicInfoContainer}>
                        <Text style={style.basicInfoTitle}>Triệu chứng ban đầu</Text>
                        <Text style={style.basicInfoDes}>{cureHistoryDetails.initialSymptom}</Text>
                    </View>
                </View>
            </View>
        )

    };

    const renderDoctorInfo = () => {
        return (
            <View style={style.contentContainer}>
                <Text style={style.contentTitle}>Thông tin bác sĩ khám bệnh</Text>
                <View>
                    <View style={style.basicInfoContainer}>
                        <Text style={style.basicInfoTitle}>Họ và tên</Text>
                        <Text style={style.basicInfoDes}>{cureHistoryDetails.fullname}</Text>
                    </View>
                    <View style={style.basicInfoContainer}>
                        <Text style={style.basicInfoTitle}>Chức vụ</Text>
                        <Text style={style.basicInfoDes}>{getDoctorPosition(cureHistoryDetails.position)}</Text>
                    </View>
                    <View style={style.basicInfoContainer}>
                        <Text style={style.basicInfoTitle}>Trình độ</Text>
                        <Text style={style.basicInfoDes}>{getDoctorRank(cureHistoryDetails.rank)}</Text>
                    </View>
                    <View style={style.basicInfoContainer}>
                        <Text style={style.basicInfoTitle}>Email</Text>
                        <Text style={style.basicInfoDes}>{cureHistoryDetails.email}</Text>
                    </View>
                    <View style={style.basicInfoContainer}>
                        <Text style={style.basicInfoTitle}>Số điện thoại</Text>
                        <Text style={style.basicInfoDes}>{cureHistoryDetails.phonenumber}</Text>
                    </View>
                </View>
            </View>
        )
    };

    const renderHealthInfo = () => {
        const info = cureHistoryDetails.healthIndicator;
        const renderInfoValue = (value: string | number | undefined) => {
            if (value === 0) return "-";
            return value;
        }
        return (
            <View style={style.contentContainer}>
                <Text style={style.contentTitle}>Tình trạng sức khỏe</Text>
                <View>
                    <View style={style.basicInfoContainer}>
                        <Text style={style.basicInfoTitle}>Nhịp tim</Text>
                        <Text style={style.basicInfoDes}>{renderInfoValue(info?.heartRate)} bpm</Text>
                    </View>
                    <View style={style.basicInfoContainer}>
                        <Text style={style.basicInfoTitle}>Nhiệt độ cơ thể</Text>
                        <Text style={style.basicInfoDes}>{renderInfoValue(info?.temperature)} °C</Text>
                    </View>
                    <View style={style.basicInfoContainer}>
                        <Text style={style.basicInfoTitle}>Huyết áp</Text>
                        <Text style={style.basicInfoDes}>{`${renderInfoValue(info?.bloodPressureSystolic)}/${renderInfoValue(info?.bloodPressureDiastolic)}`}</Text>
                    </View>
                    <View style={style.basicInfoContainer}>
                        <Text style={style.basicInfoTitle}>Đường huyết</Text>
                        <Text style={style.basicInfoDes}>{renderInfoValue(info?.glucose)} mmHg</Text>
                    </View>
                    <View style={style.basicInfoContainer}>
                        <Text style={style.basicInfoTitle}>Chiều cao</Text>
                        <Text style={style.basicInfoDes}>{renderInfoValue(info?.height)} m</Text>
                    </View>
                    <View style={style.basicInfoContainer}>
                        <Text style={style.basicInfoTitle}>Cân nặng</Text>
                        <Text style={style.basicInfoDes}>{renderInfoValue(info?.weight)} kg</Text>
                    </View>
                </View>
            </View>
        )
    };

    const renderTestResult = () => {
        return (
            <View style={style.contentContainer}>
                <Text style={style.contentTitle}>Kết quả xét nghiệm</Text>
                {cureHistoryDetails.testResult.map((test, index) => {
                    return (
                        <View key={index}>
                            <View style={[style.basicInfoContainer, { display: "flex", flexDirection: "row" }]}>
                                <Text style={style.basicInfoTitle}>{TestList[test.service]}</Text>
                                <Text style={style.basicInfoDes}>{test.reason}</Text>
                            </View>
                            {/* <Pressable style={[style.basicInfoContainer, style.downloadBtn, { width: 120 }]}>
                                <Text>Tải xuống</Text>
                                <AntDesign name="download" size={24} color="black" />
                            </Pressable> */}
                        </View>
                    )
                })
                }
            </View>
        )
    };

    const renderConclusion = () => {
        const diseasesList = cureHistoryDetails.diseases.map((item) => {
            return item.diseasesName;
        });
        const diseasesResult = diseasesList.join(", ");
        return (
            <View style={style.contentContainer}>
                <Text style={style.contentTitle}>Chẩn đoán</Text>
                <View style={[style.basicInfoContainer, { marginBottom: 30 }]}>
                    <Text style={style.basicInfoTitle}>Tên bệnh</Text>
                    <Text style={style.basicInfoDes}>{diseasesResult}</Text>
                </View>
                <Text style={style.contentTitle}>Kết luận</Text>
                <View style={[style.basicInfoContainer, { marginBottom: 30 }]}>
                    <Text style={style.basicInfoTitle}>Chỉ định</Text>
                    <Text style={style.basicInfoDes}>{cureHistoryDetails.summary}</Text>
                </View>
            </View>
        )
    };

    const renderPrescription = () => {
        const medicationList = cureHistoryDetails.medication.map((item) => {
            return item.name;
        })
        const medicationResult = medicationList.join(", ");

        return (
            <View style={style.contentContainer}>
                <Text style={style.contentTitle}>Đơn thuốc</Text>
                <View style={[style.basicInfoContainer]}>
                    <Text style={style.basicInfoTitle}>Tên thuốc</Text>
                    <Text style={style.basicInfoDes}>{medicationResult}</Text>
                </View>
                <View style={[style.basicInfoContainer]}>
                    <Text style={style.basicInfoTitle}>Ghi chú</Text>
                    <Text style={style.basicInfoDes}>{cureHistoryDetails.note}</Text>
                </View>
            </View>
        )
    };


    return (
        <View style={style.container}>
            {status === ApiStatus.Loading ? (
                <ActivityIndicator />
            ) : (
                <ScrollView>
                    {renderAppointmentInfo()}

                    {renderDoctorInfo()}

                    {renderHealthInfo()}

                    {cureHistoryDetails.testResult.length !== 0 && renderTestResult()}

                    {renderConclusion()}

                    {renderPrescription()}
                </ScrollView>
            )}
        </View>
    )
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",

    },
    contentContainer: {
        width: deviceWidth - 40,
        marginHorizontal: 20,
        marginBottom: 30
    },
    contentTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10
    },
    basicInfoContainer: {
        width: deviceWidth - 52,
        backgroundColor: "red",
        flexDirection: 'row',
        height: "auto",
        marginLeft: 12,
        marginBottom: 4
    },
    basicInfoTitle: {
        width: 120,
        minHeight: 32,
        padding: 4,
        backgroundColor: "#eee",
        marginRight: 8
    },
    basicInfoDes: {
        flex: 1
    },
    downloadBtn: {
        borderRadius: 8,
        borderColor: "black",
        borderWidth: 1,
        padding: 4
    }

})

export default CureHistoryDetails;