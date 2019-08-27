import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StatusBar
} from 'react-native';

import { Login } from './Login';

const Home = (props) => {

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Login navigation={props.navigation}/>
      </SafeAreaView>
    </Fragment>
  );
};

export default Home;