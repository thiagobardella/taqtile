import React from 'react';
// import { ScrollView, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import { Button } from '../components/Button';
import { FormItem } from '../components/FormItem';

import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache, CachePersistor } from 'apollo-cache-persist';

import AsyncStorage from '@react-native-community/async-storage';

import { gql } from "apollo-boost";
import console from 'console';

// const cache = new InMemoryCache();

// const persistor = new CachePersistor({
// // persistCache({
//   cache,
//   storage: AsyncStorage as any
// });

const client = new ApolloClient({
  // cache,
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql'
});

// persistor.restore();

export interface LoginState {
  email: string;
  password: string;
  validEmail: boolean;
  validPassword: boolean;
  validLogin: boolean;
  token: string;
}

const PasswordMinLength = 7;
const RegexPasswordMinLength = new RegExp(`.{${PasswordMinLength},}`);
const RegexPasswordAtLeastADigit = new RegExp(".*\\d.*");
const RegexPasswordAtLeastALetter = new RegExp(".*[a-zA-Z].*");
const RegexEmailFormat = new RegExp("\\w+@\\w+.com");




// client
//   .mutate({
//     mutation: LOGIN_USER,
    
//   })
  
//   .then(result => console.log(`Printing result: ${result.data.Login.token}`));

  

export class Login extends React.Component<{}, LoginState> {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      validEmail: true,
      validPassword: true,
      validLogin: false,
      token: `${this.getToken}`
    };
  }

  private storeToken = async (token: string) => {
    try {
      await AsyncStorage.setItem('@token', token)
    } catch (e) {
      console.log(`Failed inserting data on local storage`);
    }
  }

  private getToken = async () => {
    console.log("inside getData");
    try {
      const value = await AsyncStorage.getItem('@token');
      return value;

    } catch (e) {
      console.log(`Failed getting data on local storage`);
      return undefined;
    }
  }

  private handleChangeEmail = (email: string) => {
    this.setState({ email: email });
  };

  private handleChangePassword = (password: string) => {
    this.setState({ password: password });
  };

  private handleButtonPress = () => {
      // console.error(`Printing pressing button`);

      const LOGIN_USER = gql`
      mutation {
          Login(data: {
                        email: "${this.state.email}",
                        password: "${this.state.password}"
                      }) 
          {
            user {
              name
              cpf
              email
            }
            token
          }
        }
    `;

    let validEmail = RegexEmailFormat.test(this.state.email);
    let validPassword = RegexPasswordMinLength.test(this.state.password)
      && RegexPasswordAtLeastADigit.test(this.state.password)
      && RegexPasswordAtLeastALetter.test(this.state.password);

    const email = this.state.email;
    const password = this.state.password;
    if (validEmail != this.state.validEmail || validPassword != this.state.validPassword) {

      if (validEmail && validPassword) {
        // const query = gql`
        //   query ReadData {
        //     data (email: ${email}, password: ${password})
        //     {
        //       email
        //       password
        //       token
        //     }
        //   }
        // `;

        // const newToken = {
        //   data : { 
        //     email: email,
        //     password: password,
        //     token: result.data.Login.token
        //   }
        // };

        console.log(`Printing valid email and passwords`);
        client
        .mutate({
          mutation: LOGIN_USER
          // update: (proxy, { data: { createTodo } }) => {
          //   const tokenData = client.readQuery({ query });
          //   tokenData.data.push()
          //   proxy.writeQuery({ query, tokenData })
          // }
        })
        .then(result => {
            console.log(`Printing token ${result.data.Login.token}`);
            if (result.data.Login.token) {
              this.setState({
                validEmail: validEmail,
                validPassword: validPassword,
                validLogin: true
              });
              
              // const newToken = {
              //   data : { 
              //     email: email,
              //     password: password,
              //     token: result.data.Login.token
              //   }
              // };

              // client.writeQuery({
              //   query,
              //   data: {
              //     todos: [...todo, newToken],
              //   },
              // }

              // )
              // client.writeData({
              //   data : { 
              //     email: email,
              //     password: password,
              //     token: result.data.Login.token }
              // });

              
              this.storeToken(result.data.Login.token);
            }
            else {
              this.setState({
                validEmail: validEmail,
                validPassword: validPassword,
                validLogin: false
              });
            }
          }
        )
      }
      else {
        this.setState({
          validEmail: validEmail,
          validPassword: validPassword
        });
      }
      
    }
    
  };

  render() {
    const loginError = 
      this.state.validLogin 
      ? "Successful login"
      : "Fail" ;

    const emailError =
      !this.state.validEmail
        ? "Invalid email! Your email must have the format ###@###.com"
        : undefined;

    const passwordError =
      !this.state.validPassword
        ? "Invalid password! Your password: \n * must contain at least 7 characters \n * should have at least 1 digit and 1 letter"
        : undefined;

    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Bem vindo(a) à Taqtile!</Text>
        </View>
        <View style={styles.body}>
          <FormItem label="E-mail" error={emailError} onChangeText={this.handleChangeEmail} />
          <FormItem label="Senha" error={passwordError} onChangeText={this.handleChangePassword} />
          <Button label="Entrar" onPress={this.handleButtonPress} />
          {loginError && <Text>{loginError}</Text>}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionHeader: {
    alignSelf: 'center',
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: Colors.bold,
    color: Colors.black,
    marginBottom: 10
  }
});

export default Login;