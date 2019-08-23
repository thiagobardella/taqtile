import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { Button } from '../components/Button';
import { FormItem } from '../components/FormItem';

export interface LoginState {
  email: string;
  password: string;
  validEmail: boolean;
  validPassword: boolean;
}

const PasswordMinLength = 7;
const RegexPasswordMinLength = new RegExp(`.{${PasswordMinLength},}`);
const RegexPasswordAtLeastADigit = new RegExp(".*\\d.*");
const RegexPasswordAtLeastALetter = new RegExp(".*[a-zA-Z].*");
const RegexEmailFormat = new RegExp("\\w+@\\w+.com");

export class Login extends React.Component<{}, LoginState> {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      validEmail: true,
      validPassword: true
    };
  }

  private handleChangeEmail = (email: string) => {
    this.setState({ email: email });
  };

  private handleChangePassword = (password: string) => {
    this.setState({ password: password });
  };

  private handleButtonPress = () => {
    let validEmail = RegexEmailFormat.test(this.state.email);
    let validPassword = RegexPasswordMinLength.test(this.state.password)
      && RegexPasswordAtLeastADigit.test(this.state.password)
      && RegexPasswordAtLeastALetter.test(this.state.password);

    if (validEmail != this.state.validEmail || validPassword != this.state.validPassword)
      this.setState({
        validEmail: validEmail,
        validPassword: validPassword
      });
  };

  render() {
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