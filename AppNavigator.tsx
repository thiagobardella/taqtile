import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './screens/Home';
import UserPage from './screens/UserPage';

const NavStack = createStackNavigator({
  Home: { screen: Home },
  UserPage: { screen: UserPage}
});

const AppNavigator = createAppContainer(NavStack);

export default AppNavigator;