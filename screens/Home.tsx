import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StatusBar
} from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

 export const client = new ApolloClient({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
});

import { Login } from './Login';

const Home = (props) => {

  return (
    <ApolloProvider client={client}>    
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Login navigation={props.navigation}/>
        </SafeAreaView>
      </Fragment>
    </ApolloProvider>

  );
};

export default Home;