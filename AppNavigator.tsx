import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './screens/Home';
import UsersPage from './screens/UsersPage';
import NewUserPage from './screens/NewUserPage';

const NavStack = createStackNavigator({
  // Home: { screen: Home },
  // UsersPage: { screen: UsersPage},
  NewUserPage: { screen: NewUserPage}
});

const AppNavigator = createAppContainer(NavStack);

export default AppNavigator;
