import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './screens/Home';
import UsersPage from './screens/UsersPage';

const NavStack = createStackNavigator({
  Home: { screen: Home },
  UsersPage: { screen: UsersPage}
});

const AppNavigator = createAppContainer(NavStack);

export default AppNavigator;