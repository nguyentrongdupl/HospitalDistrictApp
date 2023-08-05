import React, { useState, useEffect } from 'react'
import { Modal, View, Text, Pressable, StyleSheet, Dimensions, TextInput, Platform } from 'react-native';
import { CustomInput } from '../../components';
import { IUserInfo } from '../../redux/reducer/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerAndroid from '@react-native-community/datetimepicker';

interface IEditProfileProps {
    // profileInfo: IUserInfo;
    openModal: boolean;
    toggleModal: () => void;
}

const EditProfile = (props: IEditProfileProps) => {
    const [isFocus, setIsFocus] = useState(false);
    const [pickedDate, setPickedDate] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [date, setDate] = useState(new Date());

    const [fullname, setFullName] = useState<string>("");
    const [gender, setGender] = useState<string>();
    const [address, setAddress] = useState<string>("");
    const [identification, setIdentification] = useState<string>("");

    const info = useSelector((state: RootState) => state.user.info);

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    }

    const onChangeDate = ({ type }: any, selectedDate: any) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate);

            if (Platform.OS === "android") {
                toggleDatePicker();
                setPickedDate(currentDate.toDateString());
            }
        } else {
            toggleDatePicker();
        }
    }

    useEffect(() => {
        setFullName(info?.fullname!);
        // setDate(new Date(info?.dateOfBirth || ""))
        // setPickedDate(new Date(info?.dateOfBirth || "").toString())
        setGender(info?.gender!.toString());
        setAddress(info?.address!);
        setIdentification(info?.identification!);
    }, [])

    const genderOptions = [
        {
            value: "0",
            label: "Nam"
        },
        {
            value: "1",
            label: "Nữ"
        },
    ]

    const renderDatePicker = () => {
        return (
            <View>
                <Text>Ngày sinh </Text>
                {showPicker && (
                    <DateTimePickerAndroid
                        mode="date"
                        display="spinner"
                        value={date}
                        onChange={onChangeDate}
                    />
                )}
                <Pressable onPress={toggleDatePicker}>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            width: '100%',

                            borderColor: '#e8e8e8',
                            borderWidth: 1,
                            borderRadius: 5,

                            paddingHorizontal: 10,
                            marginVertical: 5,

                        }}
                    >
                        <TextInput
                            placeholder="Chọn ngày sinh"
                            value={pickedDate}
                            onChangeText={setPickedDate}
                            editable={false}
                            style={{
                                height: 42,
                                color: "black"
                            }}
                        />
                    </View>

                </Pressable>
            </View>
        )
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props?.openModal}
            onRequestClose={() => {
                props?.toggleModal?.();
                // Alert.alert('Modal has been closed.');
                // setModalVisible(!modalVisible);
            }}>
            <View style={{ height: deviceHeight, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={[styles.modalText, styles.titleText]}>Chỉnh sửa thông tin</Text>
                        <View>
                            <View>
                                <Text>Họ và tên</Text>
                                <CustomInput
                                    value={fullname}
                                />
                            </View>
                            {renderDatePicker()}
                            <View>
                                <Text>Giới tính</Text>
                                <Dropdown
                                    style={[DropdownStyles.dropdown, isFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={DropdownStyles.placeholderStyle}
                                    selectedTextStyle={DropdownStyles.selectedTextStyle}
                                    inputSearchStyle={DropdownStyles.inputSearchStyle}
                                    iconStyle={DropdownStyles.iconStyle}
                                    data={genderOptions}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={!isFocus ? 'Chọn Khoa' : '...'}
                                    searchPlaceholder="Search..."
                                    value={gender}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={(item: { value: string, label: string }) => {
                                        setGender(item.value);
                                        setIsFocus(false);
                                    }}
                                />
                            </View>
                            <View>
                                <Text>Địa chỉ</Text>
                                <CustomInput
                                    value={address}
                                />
                            </View>
                            <View>
                                <Text>Căn cước công dân: </Text>
                                <CustomInput
                                    value={identification}
                                />
                            </View>

                        </View>
                        <View style={{flexDirection: "row", gap: 40}}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => props?.toggleModal?.()}>
                                <Text style={styles.textStyle}>Hủy</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonOpen]}
                                onPress={() => props?.toggleModal?.()}>
                                <Text style={styles.textStyle}>Lưu</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default EditProfile;

const deviceWidth = Math.round(Dimensions.get('window').width);
const deviceHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: deviceWidth,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    titleText: {
        fontWeight: "600",
    }
});

const DropdownStyles = StyleSheet.create({
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