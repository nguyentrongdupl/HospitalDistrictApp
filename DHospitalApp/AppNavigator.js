import { createStackNavigator } from 'react-navigation';
import { LoginScreen } from './src/screen/Login';
// import Home from './Home';

const AppNavigator = createStackNavigator({
    Login: { screen: LoginScreen},
//   Home: { screen: Home },
});

export default AppNavigator;
