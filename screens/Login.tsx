import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Button } from '../components/Button';
import { FormItem } from '../components/FormItem';
import { gql } from 'apollo-boost';

import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { NavigationScreenProps } from 'react-navigation';


import * as ScreensConstants from './screeens.constants'

interface LoginProps {
  navigation: NavigationScreenProps;
}

export interface LoginState {
  email: string;
  password: string;
  validEmail: boolean;
  validPassword: boolean;
  error?: string,
  token: string;
  isLoading: boolean,
}

const PasswordMinLength = 7;
const RegexPasswordMinLength = new RegExp(`.{${PasswordMinLength},}`);
const RegexPasswordAtLeastADigit = new RegExp(".*\\d.*");
const RegexPasswordAtLeastALetter = new RegExp(".*[a-zA-Z].*");
const RegexEmailFormat = new RegExp("\\w+@\\w+.com$");

const MutationRequest = gql`
  mutation($loginInput: LoginInput!) {
      Login(data: $loginInput) 
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

export class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);

    this.state = {
      email: "",
      password: "",
      validEmail: true,
      validPassword: true,
      error: undefined,
      token: "",
      isLoading: false,
    };
  }

  private storeToken = (token: string) => {
    AsyncStorage.setItem('token', token)
      .then((value) => this.setState({ token: token }))
      .catch(err => this.setState({
        email: "",
        password: "",
        error: "Ops, ocorreu um erro durante o login. Tente novamente"
      }));
  }

  private getToken = () => {
    AsyncStorage.getItem('token')
      .then((value) => this.setState({ token: value || 'none' }))
      .catch(err => this.setState({
        email: "",
        password: "",
        error: "Ops, ocorreu um erro durante o login. Tente novamente"
      }));
  }

  private isValidEmail = (email: string) => {
    return RegexEmailFormat.test(email);
  }

  private isValidPassword = (password: string) => {
    return RegexPasswordMinLength.test(password)
      && RegexPasswordAtLeastADigit.test(password)
      && RegexPasswordAtLeastALetter.test(password);
  }

  private handleChangeEmail = (email: string) => {
    let validEmail = this.isValidEmail(email);
    if (email !== this.state.email || validEmail !== this.state.validEmail) {
      this.setState({
        email: email,
        validEmail: validEmail
      });
    }
  };

  private handleChangePassword = (password: string) => {
    let validPassword = this.isValidPassword(password);
    if (password !== this.state.password || validPassword !== this.state.validPassword) {
      this.setState({
        password: password,
        validPassword: validPassword
      });
    }
  };

  private handleButtonPress = async () => {
    const email = this.state.email;
    const password = this.state.password;

    let validEmail = this.isValidEmail(email);
    let validPassword = this.isValidPassword(password);

    if (!validEmail || !validPassword) {
      this.setState({
        validEmail: validEmail,
        validPassword: validPassword
      });
      return;
    }
    
    if (validEmail && validPassword) {
      let token = '';
      try {
        const result = await client.mutate({
          variables: {
            loginInput: {
              email: this.state.email,
              password: this.state.password
            }
          },
          mutation: MutationRequest
        });
        token = result.data.Login.token;
        this.setState({
          validEmail: validEmail,
          validPassword: validPassword,
          error: undefined
        });
        this.props.navigation.navigate('UserPage');
        this.storeToken(token);
      } catch (error) {
        this.setState({
          validEmail: validEmail,
          validPassword: validPassword,
          error: `${error.message}`
        });
      }
    }

  }

  render() {
    const emailError =
      !this.state.validEmail
        ? "E-mail inválido! O e-mail deve estar no formato ###@###.com"
        : undefined;

    const passwordError =
      !this.state.validPassword
        ? "Senha inválida! Sua senha: \n * deve ter no mínimo 7 caracteres \n * e deve ter, no mínimo, 1 letra e 1 dígito"
        : undefined;

    this.getToken();

    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Bem vindo(a) à Taqtile!</Text>
        </View>
        <View style={styles.body}>
          <Spinner
            visible={this.state.isLoading}
            textStyle={styles.spinnerTextStyle}
          />
          <FormItem label="E-mail" error={emailError} onChangeText={this.handleChangeEmail} shouldHideText={false} />
          <FormItem label="Senha" error={passwordError} onChangeText={this.handleChangePassword} shouldHideText={true} />
          {this.state.error && <Text style={styles.error}>{this.state.error}</Text>}
          <Button label="Entrar" onPress={this.handleButtonPress} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
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
  },
  error: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: Colors.bold,
    color: 'red'
  }
});

export default Login;