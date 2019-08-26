import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StatusBar
} from 'react-native';

import { Login } from './screens/Login';

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
});

  
const App = () => {

  return (
    <ApolloProvider client={client}>
        <Fragment>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <Login />
          </SafeAreaView>
        </Fragment>
    </ApolloProvider>
    
  );
};

export default App;
