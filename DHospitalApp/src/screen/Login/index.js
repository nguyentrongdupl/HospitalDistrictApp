import * as React from 'react'
import { StyleSheet, Text, View, Image, useWindowDimensions, StatusBar } from 'react-native';
// import Logo from '../../../assets/images/logobenhvien.png'
import Logo from '../../../assets/images/logobenhvien.png'
import { CustomInput } from '../../components/CustomInput/CustomInput';
import { validateUserName } from '../../utils/validate';
import { CustomButton } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import Api from '../../api';

const LoginScreen = ({navigation}) => {
    const { height } = useWindowDimensions();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');

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

    const onSignInPress = () => {
        //validate
        // setErrorMessage('');
        // if (username.length === 0 || password.length === 0) {
        //     setErrorMessage('Hãy điền tên đăng nhập/ mật khẩu');
        //     return;
        // }
        // if (!validateUserName(username)) {
        //     setErrorMessage("Tên đăng nhập không đúng");
        //     return;
        // }

        // if (password.length < 8) {
        //     setErrorMessage('Mật khẩu có độ dài lớn hơn 8 ký tự');
        //     return;
        // }

        //  console.warn('Log in');
        // const reqbody = {
        //     username: username,
        //     password: password
        // }
        // Api.authApi.login(reqbody).then(data => {
        //     console.log(data)
        //     const {accessToken, refreshToken, role, username } = data.data.data;
        //     localStorage.setItem("accessToken", accessToken);
        //     localStorage.setItem("refreshToken", refreshToken);
        //     localStorage.setItem("username", username);
        //     // dispatch(setRole(role));
        //     // dispatch(setUsername(username));
            
            navigation.navigate('Home');
        // }).catch(err => {
        //     const { message } = err.response.data;
        //     setErrorMessage(message)
        // }).finally()
        
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
                    <CustomInput
                        value={username}
                        onChange={setUsername}
                        placeholder='Tên đăng nhập'
                    />
                    <CustomInput
                        value={password}
                        onChange={setPassword}
                        placeholder='Mật khẩu'
                        secureTextEntry={true}
                    />
                    <Text style={loginStyle.errorMessage}>{errorMessage}</Text>
                    <CustomButton
                        text='Đăng nhập'
                        onPress={onSignInPress}
                        type='PRIMARY'
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