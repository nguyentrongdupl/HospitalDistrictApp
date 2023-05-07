import * as React from 'react'
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
// import Logo from '../../../assets/images/logobenhvien.png'
import Logo from '../../../assets/images/logobenhvien.png'
import { CustomInput } from '../../components/CustomInput/CustomInput';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { validateUserName } from '../../utils/validate';

export const LoginScreen = () => {
    const {height} = useWindowDimensions();

    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [errorMessage, setErrorMessage] = React.useState<string>('');

    const loginStyle = StyleSheet.create(
        {
            root:{
                // flex:1,
                alignItems: 'center',
                padding: 20,
                marginTop: 80,
                backgroundColor: '#111827',
            },
            logo: {
                width: '100%',
                maxWidth: 500,
                maxHeight: 300
            },
            errorMessage: {
                color: 'red',
                height: 30
            },

        }
    )

    React.useEffect(() => {
        setUsername('');
        setPassword('');
        setErrorMessage('')
    },[])

    const onSignInPress = () => {
       
        setErrorMessage('');
        if(username.length === 0 || password.length === 0){
            setErrorMessage('Hãy điền tên đăng nhập/ mật khẩu');
            return;
        }
        if (!validateUserName(username)){
            setErrorMessage("Tên đăng nhập không đúng");
            return;
        }
        
        if (password.length <8){
            setErrorMessage('Mật khẩu có độ dài lớn hơn 8 ký tự');
            return;
        }
        console.warn('Log in');
    }

    const onForgotPassword = () => {
        console.warn('Forgot')
    }

    return(
        <View style={loginStyle.root}>
            <Image style={[loginStyle.logo, {height: height * 0.3}]} 
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
    )
}