import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { Button } from '../components/Button';
<<<<<<< HEAD
import { FormItem } from '../components/FormItem';
=======
import { FormTextInput } from '../components/FormTextInput';
import FormItem from '../components/FormItem';
>>>>>>> Substituting FormTextInput for FormItem

export interface LoginState {
  email: string;
  password: string;
  validEmail: boolean;
  validPassword: boolean;
}

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
    var emailRegex = new RegExp("\\w+@\\w+.com");
    this.setState({ validEmail: emailRegex.test(this.state.email) });

<<<<<<< HEAD
    let regexMinLength = new RegExp(".{7,}");
    let regexAtLeastADigit = new RegExp(".*\\d.*");
    let regexAtLeastALetter = new RegExp(".*[a-zA-Z].*");
=======
    let regexMinLength = new RegExp("\\w{7,}");
    let regexAtLeastADigit = new RegExp("\\D*\\d.*");
    let regexAtLeastALetter = new RegExp("\\d*[a-zA-Z].*");
>>>>>>> Substituting FormTextInput for FormItem
    let validPassword = regexMinLength.test(this.state.password)
      && regexAtLeastADigit.test(this.state.password)
      && regexAtLeastALetter.test(this.state.password);
    this.setState({ validPassword: validPassword });
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
  container: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 30,
    paddingVertical: 20
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