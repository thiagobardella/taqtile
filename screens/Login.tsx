import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Button } from '../components/Button';
import { FormItem } from '../components/FormItem';
import { gql } from 'apollo-boost';

import ApolloClient from 'apollo-boost';
import AsyncStorage from '@react-native-community/async-storage';

const client = new ApolloClient({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql'
});

interface LoginProps {
  navigation: any;
}

export interface LoginState {
  email: string;
  password: string;
  validEmail: boolean;
  validPassword: boolean;
  loginNeedsValidation: boolean,
  error?: string,
  token: string;
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
      loginNeedsValidation: false,
      error: undefined,
      token: ""
    };
  }

  private storeToken = (token: string) => {
    AsyncStorage.setItem('token', token)
      .then(value => this.setState({ token: token }))
      .catch(err => this.setState({
        email: "",
        password: "",
        error: "Erro ao tentar armazenar token. Realize o login novamente"
      }));
  }

  private getToken = () => {
    AsyncStorage.getItem('token')
      .then((value) => this.setState({ token: value || 'none' }))
      .catch(err => this.setState({
        email: "",
        password: "",
        error: "Erro ao tentar recuperar token. Realize o login novamente"
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
    if (email != this.state.email || validEmail != this.state.validEmail) {
      this.setState({
        email: email,
        validEmail: validEmail,
        loginNeedsValidation: true
      });
    }
  };

  private handleChangePassword = (password: string) => {
    let validPassword = this.isValidPassword(password);
    if (password != this.state.password || validPassword != this.state.validPassword) {
      this.setState({
        password: password,
        validPassword: validPassword,
        loginNeedsValidation: true
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

    if (validEmail != this.state.validEmail || validPassword != this.state.validPassword || this.state.loginNeedsValidation) {
      if (validEmail && validPassword) {
        let token = '';
        try {
          const result = await client.mutate({
            variables: {
              loginInput: {
                "email": this.state.email,
                "password": this.state.password
              }
            },
            mutation: MutationRequest
          });
          token = result.data.Login.token;
          this.setState({
            validEmail: validEmail,
            validPassword: validPassword,
            loginNeedsValidation: false,
            error: undefined
          });
          this.props.navigation.navigate('UserPage');
        } catch (error) {
          this.setState({
            validEmail: validEmail,
            validPassword: validPassword,
            loginNeedsValidation: true,
            error: `${error.message}`
          });
        } finally {
          this.storeToken(token);
        }
      }
    }
  }

  render() {

    const emailError =
      !this.state.validEmail
        ? "Invalid email! Your email must have the format ###@###.com"
        : undefined;

    const passwordError =
      !this.state.validPassword
        ? "Invalid password! Your password: \n * must contain at least 7 characters \n * should have at least 1 digit and 1 letter"
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