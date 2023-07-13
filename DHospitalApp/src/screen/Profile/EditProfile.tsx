import React, { useState, useEffect } from 'react'
import { Modal, View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { CustomInput } from '../../components';
import { IUserInfo } from '../../redux/reducer/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface IEditProfileProps {
    // profileInfo: IUserInfo;
    openModal: boolean;
    toggleModal: () => void;
}

const EditProfile = (props: IEditProfileProps) => {
    const [fullname, setFullName] = useState<string>("");
    const [gender, setGender] = useState<number>(0);
    const [address, setAddress] = useState<string>("");
    const [identification, setIdentification] = useState<string>("");

    const info = useSelector((state: RootState) => state.user.info);

    useEffect(() => {
        setFullName(info?.fullname!);
        setGender(info?.gender!);
        setAddress(info?.address!);
        setIdentification(info?.identification!);
    }, [])

    const genderOptions = [
        {
            value: 0, 
            label: "Nam"
        },
        {
            value: 1, 
            label: "Nữ"
        },
    ]

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
                            <View>
                                <Text>Ngày sinh</Text>
                                <CustomInput
                                    value={''}
                                />
                            </View>
                            <View>
                                <Text>Giới tính</Text>
                                <CustomInput
                                    value={''}
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
                        <View>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => props?.toggleModal?.()}>
                                <Text style={styles.textStyle}>Hủy</Text>
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