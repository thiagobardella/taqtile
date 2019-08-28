import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { FormItemText } from '../components/FormItemText';

import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

import * as constants from './screens.constants'
import * as graphQLconsts from './graphQL.constants'
import * as utils from './screens.utils'
import { Title } from '../components/TitleText';

interface LoginProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
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
        style={constants.SCREEN_STYLES.scrollView}>
        <Title title='Bem-vindo à Taqtile!'/>
        <View style={constants.SCREEN_STYLES.body}>
          <Spinner
            visible={this.state.isLoading}
            textStyle={constants.SCREEN_STYLES.spinnerTextStyle}
          />
          <FormItemText label="E-mail" error={emailError} onChangeText={this.handleChangeEmail} shouldHideText={false} />
          <FormItemText label="Senha" error={passwordError} onChangeText={this.handleChangePassword} shouldHideText={true} />
          {this.state.error && <Text style={constants.SCREEN_STYLES.error}>{this.state.error}</Text>}
          <Button label="Entrar" onPress={this.handleButtonPress} />
        </View>
      </ScrollView>
    );
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

  private handleChangeEmail = (email: string) => {
    let validEmail = utils.isValidEmail(email);
    if (email != this.state.email || validEmail != this.state.validEmail) {
      this.setState({
        email: email,
        validEmail: validEmail
      });
    }
  };

  private handleChangePassword = (password: string) => {
    let validPassword = utils.isValidPassword(password);
    if (password != this.state.password || validPassword != this.state.validPassword) {
      this.setState({
        password: password,
        validPassword: validPassword
      });
    }
  };

  private handleButtonPress = async () => {
    const email = this.state.email;
    const password = this.state.password;

    let validEmail = utils.isValidEmail(email);
    let validPassword = utils.isValidPassword(password);

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
        this.setState({ isLoading: true });

        const result = await graphQLconsts.APOLLO_CLIENT_FOR_AUTHENTICATION.mutate({
          variables: {
            loginInput: {
              email: this.state.email,
              password: this.state.password
            }
          },
          mutation: graphQLconsts.MUTATION_LOGIN_REQUEST
        });
        token = result.data.Login.token;
        this.setState({
          validEmail: validEmail,
          validPassword: validPassword,
          error: undefined,
          isLoading: false
        });
        this.props.navigation.navigate('UsersPage');
        this.storeToken(token);
      } catch (error) {
        this.setState({
          validEmail: validEmail,
          validPassword: validPassword,
          error: `${error.message}`,
          isLoading: false
        });
      }
    }

  }
}

export default Login;
