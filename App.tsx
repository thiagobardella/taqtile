import React, { Fragment } from 'react';
import AppNavigator from './AppNavigator';

import {
  SafeAreaView,
  StatusBar
} from 'react-native';

import { Login } from './screens/Login';

const App = () => {
  return (
    <AppNavigator/>
  );
};

export default App;
