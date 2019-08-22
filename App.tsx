import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StatusBar
} from 'react-native';

import { Login } from './screens/Login';

const App = () => {

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Login />
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
