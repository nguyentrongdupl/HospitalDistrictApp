import DateTimePickerAndroid from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { ApiGet } from "../../api";
import { baseURL } from "../../api/config/axios";
import { useDispatch, useSelector } from "react-redux";
import { IFilter, getAllDepartment, getDoctorByDepartment, resetDepartmentStatus, resetDoctorStatus, resetSubmitStatus, submitAppointment } from "../../redux/reducer/appointmentSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { ApiStatus, DepartmentType } from "../../utils/enum";
import { Dictionary } from "@reduxjs/toolkit";
import { Dropdown } from "react-native-element-dropdown";
import { CustomListItem } from "../../components/FlatList/CustomListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDatestringtoMMDDYYYY, getDoctorPosition, getDoctorRank, getGender, getMMDDYYYY } from "../../utils/convert";

const deviceWidth = Math.round(Dimensions.get('window').width);

const Appointment = ({ navigation }: { navigation: any }) => {
    const [stepper, setStepper] = useState(0);
    const [open, setOpen] = useState(false);
    const [pickedDepartment, setPickedDepartment] = useState<string>();
    const [date, setDate] = useState(new Date());

    const [showPicker, setShowPicker] = useState(false);
    const [pickedDate, setPickedDate] = useState('');
    const [reason, setReason] = useState('');

    const [allDepartment, setAllDepartment] = useState([]);
    const [filter, setFilter] = useState<IFilter>({
        page: 1,
        pageSize: 10,
        tableType: 5,
        searchKey: "",
        departmentId: "",
    });
    const [isFocus, setIsFocus] = useState(false);
    const [doctorDepart, setDoctorDepart] = useState([]);
    const [doctor, setDoctor] = useState<any>();

    const [error, setError] = useState<Dictionary<string>>();

    const dispatch = useDispatch<AppDispatch>();

    const {
        department,
        departmentStatus,
        doctorList,
        doctorStatus
    } = useSelector((state: RootState) => state.appointment)

    const info = useSelector((state: RootState) => state.user.info);

    const { submitStatus } = useSelector((state: RootState) => state.appointment)

    useEffect(() => {
        dispatch(getAllDepartment());
    }, [])

    useEffect(() => {
        if (departmentStatus === ApiStatus.Success) {
            dispatch(resetDepartmentStatus());
        }
    }, [departmentStatus])

    useEffect(() => {
        if (department.length) {
            const list = [];
            department.forEach((item) => {
                if (item.departmentCode !== DepartmentType.tiepDon && item.departmentCode !== DepartmentType.canLamSang) {
                    list.push({
                        value: `${item._id}`,
                        label: `${item.departmentName}`
                    })

                }
            })
            setAllDepartment(list);
        }
    }, [department])

    useEffect(() => {
        if (doctorStatus === ApiStatus.Success) {
            dispatch(resetDoctorStatus());
        }
    }, [doctorStatus])

    useEffect(() => {
        const list = [];
        doctorList.forEach((doctor) => {
            list.push({
                id: doctor.doctorId,
                title: doctor.fullname,
                subtitle: getDoctorPosition(doctor.gender),
                details:
                    <View style={{ display: "flex", flexDirection: "column" }}>
                        <Text>{`Giới tính: ${getGender(doctor.gender)}`}</Text>
                        <Text>{`Số điện thoại: ${doctor.phonenumber}`}</Text>
                        <Text>{`Học vấn: ${getDoctorRank(doctor.rank)}`}</Text>
                    </View>
            })
        });
        setDoctorDepart(list);
    }, [doctorList])

    useEffect(() => {
        switch (stepper) {
            case 1:
                dispatch(getDoctorByDepartment(filter))
                break;
            default:
                break;
        }
    }, [stepper])

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    }

    const onChangeDate = ({ type }: any, selectedDate: any) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate);

            if (Platform.OS === "android") {
                toggleDatePicker();
                setPickedDate(currentDate.toLocaleString().split(", ")[1]);
            }
        } else {
            toggleDatePicker();
        }
    }

    const style = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#fff"
        },
        content: {
            // display: 'flex',
            // // alignItems: 'center',
            flex: 1,
            width: deviceWidth - 25,
            marginHorizontal: 12,
            // marginLeft: 12,
        },
        title: {
            // backgroundColor: '#fff',
            fontSize: 20,
            fontWeight: '600',
            marginVertical: 8
        },
        footerContainer: {
            width: deviceWidth - 25,
            marginHorizontal: 12,
            marginBottom: 20,
            display: 'flex',
            flexDirection: 'row',
        },
        footerButton: {
            width: "50%",
            height: 40,
            borderColor: "black",
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        doctorListContainer: {
            borderColor: "black",
            borderWidth: 1,
            borderRadius: 20,
            minHeight: 200
        },
        infoContainer: {
            borderColor: "black",
            borderWidth: 1,
            borderRadius: 20,
            padding: 10,
            marginBottom: 20,
            backgroundColor: "#fff",
        },
        personalInfo: {
        },
        pickDateandReason: {
            display: "flex",
            flexDirection: "row",
            alignItems: 'center'
        },
        textLine: {
            minHeight: 32
        },
        reasonInput: {
            padding: 10,
            marginTop: 10,
            textAlignVertical: 'top',
            borderColor: "black",
            borderWidth: 1,
        },
        error: {
            color: "red"
        }

    })

    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'white',

        },
        dropdown: {
            height: 50,
            borderColor: 'gray',
            borderWidth: 0.5,
            borderRadius: 8,
            paddingHorizontal: 8,
        },
        icon: {
            marginRight: 5,
        },
        label: {
            position: 'absolute',
            backgroundColor: 'white',
            left: 22,
            top: 8,
            zIndex: 999,
            paddingHorizontal: 8,
            fontSize: 14,
        },
        placeholderStyle: {
            fontSize: 16,
        },
        selectedTextStyle: {
            fontSize: 16,
        },
        iconStyle: {
            width: 20,
            height: 20,
        },
        inputSearchStyle: {
            height: 40,
            fontSize: 16,
        },
    });

    const selectDepartment = () => {
        return (
            <View style={styles.container}>
                {departmentStatus === ApiStatus.Loading ? (
                    <ActivityIndicator />
                ) : (
                    <>
                        <Text style={style.title}> Chọn khoa khám bệnh: </Text>
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={allDepartment}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Chọn Khoa' : '...'}
                            searchPlaceholder="Search..."
                            value={pickedDepartment}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item: { value: string, label: string }) => {
                                setPickedDepartment(item.value);
                                setFilter({
                                    ...filter,
                                    departmentId: item.value
                                })
                                setIsFocus(false);
                            }}
                        // renderLeftIcon={() => (
                        //     <AntDesign
                        //         style={styles.icon}
                        //         color={isFocus ? 'blue' : 'black'}
                        //         name="Safety"
                        //         size={20}
                        //     />
                        // )}
                        />

                    </>
                )}
            </View>
        )
    }

    const selectDoctor = () => {
        return (
            <View>
                {doctorStatus === ApiStatus.Loading ? (
                    <ActivityIndicator />
                ) : (
                    <FlatList
                        data={doctorDepart || []}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({ item }: { item: any }) =>
                            <CustomListItem
                                item={item}
                                havePicture={false}
                                selectable
                                selected={item?.id === doctor?.id}
                                onSelect={(item: any) => {
                                    if (item?.id === doctor?.id) setDoctor(undefined);
                                    else setDoctor(item)
                                }}
                            />
                        }
                        ListHeaderComponent={<Text style={style.title}>Chọn bác sĩ khám: </Text>}
                    />
                )}
            </View>
        )
    }

    const getDepartmentName = (id: string) => {
        const index = allDepartment.findIndex((item: any) => item.value === id);
        return index !== -1 ? allDepartment[index]?.label : ""
    }

    const selectDate = () => {
        return (
            <ScrollView>
                <Text style={style.title}>Chọn ngày khám, xác nhận thông tin</Text>
                <View style={[style.infoContainer, style.personalInfo]}>
                    <Text style={style.textLine}>{`Họ và tên: ${info?.fullname}`}</Text>
                    <Text style={style.textLine}>{`Giới tính: ${getGender(info?.gender!)}`}</Text>
                    <Text style={style.textLine}>{`Ngày sinh: ${info?.dateOfBirth}`}</Text>
                    <Text style={style.textLine}>{`Địa chỉ: ${info?.address}`}</Text>
                    <Text style={style.textLine}>{`Số điện thoại: ${info?.phonenumber}`}</Text>
                </View>
                <View style={style.infoContainer}>
                    <Text style={style.textLine}>{`Bác sĩ: ${doctor?.title}`}</Text>
                    <Text style={style.textLine}>{`Khoa: ${getDepartmentName(pickedDepartment!)}`} </Text>
                </View>
                <View style={style.infoContainer}>
                    <View style={style.pickDateandReason}>
                        <Text>Ngày khám: </Text>
                        {showPicker && (
                            <DateTimePickerAndroid
                                mode="date"
                                display="spinner"
                                value={date}
                                onChange={onChangeDate}
                            />
                        )}
                        <Pressable onPress={toggleDatePicker}>
                            <TextInput
                                placeholder="Chọn ngày khám"
                                value={pickedDate}
                                onChangeText={setPickedDate}
                                editable={false}
                                style={{ color: "black" }}
                            />

                        </Pressable>

                    </View>
                    <View>
                        <Text>Lý do: </Text>
                        <TextInput
                            editable
                            multiline
                            numberOfLines={8}
                            maxLength={40}
                            onChangeText={text => setReason(text)}
                            value={reason}
                            style={style.reasonInput}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }

    const renderStepper = (step: number) => {
        switch (step) {
            case 0:
                return selectDepartment();
            case 1:
                return selectDoctor();
            case 2:
                if (Platform.OS === "android") {
                    return selectDate();
                }
                else {
                    return (
                        <KeyboardAvoidingView behavior="padding">
                            {selectDate()}
                        </KeyboardAvoidingView>
                    )
                }
            default:
                return <ActivityIndicator />
        }
    }

    const handleSubmit = () => {
        console.log("dob: ",getMMDDYYYY(pickedDate));
        const reqBody = {
            departmentId: pickedDepartment ? pickedDepartment : "",
            appointmentDate: getMMDDYYYY(pickedDate),
            initialSymptom: reason.trim(),
            doctorId: doctor?.id
        }
        dispatch(submitAppointment(reqBody));
    }

    useEffect(() => {
        if (submitStatus === ApiStatus.Success) {
            dispatch(resetSubmitStatus());
            ToastAndroid.showWithGravity(
                'Đặt lịch thành công',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
            );
            navigation.navigate('Trang chủ')
        }
        if (submitStatus === ApiStatus.Failed) {
            ToastAndroid.showWithGravity(
                'Đặt lịch thất bại',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
            );
        }
    }, [submitStatus])

    const handleNext = () => {
        switch (stepper) {
            case 0: {
                if (pickedDepartment) {
                    break;
                } else {
                    ToastAndroid.showWithGravity(
                        'Hãy chọn khoa',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                    );
                    return;
                }
            }
            case 1: {
                if (doctor) {
                    break;
                } else {
                    ToastAndroid.showWithGravity(
                        'Hãy chọn Bác sĩ',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                    );
                    return;
                }
            }
            case 2: {
                if (pickedDate === '') {
                    ToastAndroid.showWithGravity(
                        'Hãy chọn ngày khám',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                    );
                    return;
                }
                if (!reason || reason === "") {
                    ToastAndroid.showWithGravity(
                        'Hãy nhập lý do',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                    );
                    return;
                }
                handleSubmit();
                return;
            }
            default:
                break;
        }
        setStepper(stepper + 1)
    };

    const handleBack = () => {
        setStepper(stepper - 1)
    }

    const renderFooterButton = () => {
        return (
            <View style={style.footerContainer}>
                {stepper === 0 ? (
                    <TouchableOpacity style={style.footerButton} onPress={() => navigation.navigate('Trang chủ')}>
                        <Text>Hủy</Text>
                    </TouchableOpacity>
                )
                    : (
                        <TouchableOpacity style={style.footerButton} onPress={handleBack}>
                            <Text>Quay lại</Text>
                        </TouchableOpacity>
                    )}
                {stepper !== 2 ? (
                    <TouchableOpacity style={style.footerButton} onPress={handleNext}>
                        <Text>Tiếp theo</Text>
                    </TouchableOpacity>
                )
                    : submitStatus === ApiStatus.Loading ?
                        (<ActivityIndicator />)
                        : (
                            <TouchableOpacity style={style.footerButton} onPress={handleNext}>
                                <Text>Hoàn tất</Text>
                            </TouchableOpacity>
                        )
                }
            </View>
        )
    }

    return (
        <View style={style.container}>
            <View style={style.content}>
                {renderStepper(stepper)}
            </View>
            {renderFooterButton()}
        </View>
    )
}

export default Appointment;