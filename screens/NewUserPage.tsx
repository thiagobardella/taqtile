import React from 'react';
import { Button } from '../components/Button';
import { FormItemText } from '../components/FormItemText';
import * as constants from './screens.constants'
import * as graphQLconsts from './graphQL.constants'
import * as utils from './screens.utils'
import FormItemPicker from '../components/FormItemPicker';
import { Form } from '../components/Form';

import AsyncStorage from '@react-native-community/async-storage';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

interface NewUserPageProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface NewUserPageState {
  id: number;
  name: string;
  cpf: string;
  birthDate: string;
  email: string;
  password: string;
  role: string;
  isLoading: boolean;
  fieldsValidStatus: Object;
  error?: string
}

export class NewUserPage extends React.Component<NewUserPageProps, NewUserPageState> {
  constructor(props: NewUserPageProps) {
    super(props);

    this.state = {
      id: 0,
      name: "",
      cpf: "",
      birthDate: "",
      email: "",
      password: "",
      role: "user",
      isLoading: false,
      fieldsValidStatus: {
        'name': true,
        'cpf': true,
        'birthDate': true,
        'email': true,
        'password': true
      }
    }
  }

  render() {
    return (
      <Form isLoading={this.state.isLoading} title='Cadastro de usuário' error={this.state.error}>
        <FormItemText label="Nome" onChangeText={this.handleChangeField('name')} shouldHideText={false}
          error={(!this.isFieldValid('name') ? constants.REQUIRED_FIELD_ERROR : undefined)} />
        <FormItemText label="E-mail" onChangeText={this.handleChangeField('email')} shouldHideText={false}
          error={(!this.isFieldValid('email') ? constants.INVALID_EMAIL_ERROR : undefined)} />
        <FormItemText label="CPF" onChangeText={this.handleChangeField('cpf')} shouldHideText={false}
          error={(!this.isFieldValid('cpf') ? constants.INVALID_CPF_ERROR : undefined)} />
        <FormItemText label="Data de Nascimento" onChangeText={this.handleChangeField('birthDate')} shouldHideText={false}
          error={(!this.isFieldValid('birthDate') ? constants.INVALID_DATE_ERROR : undefined)} />
        <FormItemText label="Senha" onChangeText={this.handleChangeField('password')} shouldHideText={true}
          error={(!this.isFieldValid('password') ? constants.INVALID_PASSWORD_ERROR : undefined)} />
        <FormItemPicker label="Perfil" options={constants.USER_ROLES} handleValueChange={this.handleChangeField('role')} />
        <Button label="Confirmar" onPress={this.handleSubmitButtonPress} />
      </Form>
    );
  }

  private isFieldValid = (fieldName: string) => {
    return this.state.fieldsValidStatus[fieldName];
  }

  private validateField = (fieldName: string, fieldValue: string) => {
    const isFieldEmpty = (fieldValue === "")
    let validField = false;
    switch (fieldName) {
      case 'email':
        validField = utils.isValidEmail(fieldValue);
        break;
      case 'password':
        validField = utils.isValidPassword(fieldValue);
        break;
      case 'birthDate':
        validField = utils.isValidDate(fieldValue);
        break;
      case 'cpf':
        validField = utils.isValidCPF(fieldValue);
        break;
      default:
        validField = !isFieldEmpty;
    }
    if (fieldValue != this.state[fieldName] || isFieldEmpty) {
      const newState = { ...this.state };
      newState[fieldName] = fieldValue;
      const fieldsValidStatus = { ...this.state.fieldsValidStatus }
      fieldsValidStatus[fieldName] = validField;
      newState.fieldsValidStatus = fieldsValidStatus;
      this.setState(newState);
    }
  }

  private handleChangeField = (fieldName: string) => (fieldValue: string) => {
    this.validateField(fieldName, fieldValue);
  }

  private validateAllFields() {
    this.validateField('name', this.state.name);
    this.validateField('cpf', this.state.cpf);
    this.validateField('email', this.state.email);
    this.validateField('birthDate', this.state.birthDate);
    this.validateField('password', this.state.password);
  }

  private handleSubmitButtonPress = async () => {
    this.validateAllFields();

    if (this.state.fieldsValidStatus['name'] && this.state.email
      && this.state.fieldsValidStatus['cpf'] && this.state.cpf
      && this.state.fieldsValidStatus['email'] && this.state.email
      && this.state.fieldsValidStatus['birthDate'] && this.state.birthDate
      && this.state.fieldsValidStatus['password'] && this.state.password
      && this.state.fieldsValidStatus['email'] && this.state.email
    ) {
      try {
        this.setState({
          isLoading: true
        });

        const token = await AsyncStorage.getItem('token')

        const client = utils.APOLLO_CLIENT_AUTHENTICATED(token || '');

        await client.mutate({
          mutation: graphQLconsts.MUTATION_CREATE_USER_REQUEST,
          variables: {
            userInput: {
              name: this.state.name,
              email: this.state.email,
              cpf: this.state.cpf,
              birthDate: this.state.birthDate,
              password: this.state.password,
              role: this.state.role
            }
          }
        });
        this.props.navigation.navigate('UsersPage');
      } catch (error) {
        this.setState({
          error: `${error.message}`,
          isLoading: false
        });
      }
    }
  }
}

export default NewUserPage;
