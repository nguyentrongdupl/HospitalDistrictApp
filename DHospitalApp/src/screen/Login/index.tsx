import * as React from 'react';
import { Image, StatusBar, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../../assets/images/logo.png';
import { CustomButton } from '../../components';
import { CustomInput } from '../../components/CustomInput/CustomInput';
import { getLoginInfo, setStatus } from '../../redux/reducer';
import { AppDispatch, RootState } from '../../redux/store';
import { AccountRole, ApiStatus } from '../../utils/enum';
import { validateUserName } from '../../utils/validate';

const LoginScreen = ({navigation}: {navigation: any}) => {
    const { height } = useWindowDimensions();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');

    const dispatch = useDispatch<AppDispatch>();
    const { status, role } = useSelector((state: RootState) => state.user)

    const loginStyle = StyleSheet.create(
        {
            root: {
                flex: 1,
                padding: 40,
                backgroundColor: '#111827',
            },
            content: {
                height: '100%',
                width: '100%',
                alignItems: 'center',

            },
            logo: {
                width: '100%',
                maxWidth: 500,
                maxHeight: 300
            },
            errorMessage: {
                color: 'red',
                height: 30,
            },

        }
    )

    React.useEffect(() => {
        setUsername('');
        setPassword('');
        setErrorMessage('')
    }, [])

    React.useEffect(() => {
        if(status === ApiStatus.Success){
            if (role === AccountRole.Patient){
                dispatch(setStatus(ApiStatus.None));
                navigation.navigate('Home');
            } else {
                setErrorMessage("Hãy đăng nhập bằng tài khoản bệnh nhân");
            }
        }
    }, [status])

    const onSignInPress = () => {
        //validate
        setErrorMessage('');
        if (username.length === 0 || password.length === 0) {
            setErrorMessage('Hãy điền tên đăng nhập/ mật khẩu');
            return;
        }
        if (!validateUserName(username)) {
            setErrorMessage("Tên đăng nhập không đúng");
            return;
        }

        if (password.length < 8) {
            setErrorMessage('Mật khẩu có độ dài lớn hơn 8 ký tự');
            return;
        }

        const reqbody = {
            username: username,
            password: password,
        }

        dispatch(getLoginInfo(reqbody));

    }

    const onForgotPassword = () => {
        console.warn('Forgot')
    }

    return (
        <View style={loginStyle.root}>
            <StatusBar barStyle='light-content' />
            <SafeAreaView style={{flex: 1}}>
                <View style={loginStyle.content}>
                    <Image style={[loginStyle.logo, { height: height * 0.3 }]}
                        source={Logo}
                        resizeMode='contain'
                    />
                    <Text style={{color: '#fff', marginBottom: 16}}>Ứng dụng dành riêng cho người bệnh</Text>
                    <CustomInput
                        value={username}
                        onChange={setUsername}
                        placeholder='Tên đăng nhập'
                        showInput={true}
                        secureTextEntry={false}
                    />
                    <CustomInput
                        value={password}
                        onChange={setPassword}
                        placeholder='Mật khẩu'
                        showInput
                        secureTextEntry
                    />
                    <Text style={loginStyle.errorMessage}>{errorMessage}</Text>
                    <CustomButton
                        text='Đăng nhập'
                        onPress={onSignInPress}
                        type='PRIMARY'
                        isLoading={status === ApiStatus.Loading}
                        loadingColor='white'
                    />

                    <CustomButton
                        text='Quên mật khẩu?'
                        onPress={onForgotPassword}
                        type='TERTIARY'
                    />
                </View>
            </SafeAreaView>
        </View>
    )
}

export default LoginScreen;