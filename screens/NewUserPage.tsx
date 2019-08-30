import React, { Component } from 'react';
import { Button } from '../components/button';
import { FormItemText } from '../components/form-item-text';
import * as constants from './screens.constants'
import * as graphQLconsts from './graphQL.constants'
import * as utils from './screens.utils'
import FormItemPicker from '../components/form-item-picker';
import { Form } from '../components/form';

import AsyncStorage from '@react-native-community/async-storage';

import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { ModalScreen } from './ModalScreen';

enum UserRole {
  user = 'user',
  admin = 'admin',
}

interface NewUserPageProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface NewUserPageState {
  id: number;
  name: string;
  validName: boolean;
  cpf: string;
  validCPF: boolean;
  birthDate: string;
  validBirthDate: boolean;
  email: string;
  validEmail: boolean;
  password: string;
  validPassword: boolean;
  role: UserRole;
  isLoading: boolean;
  error?: string;
  modalVisible: boolean;
}

export class NewUserPage extends React.Component<NewUserPageProps, NewUserPageState> {
  constructor(props: NewUserPageProps) {
    super(props);

    this.state = {
      id: 0,
      name: "",
      validName: true,
      cpf: "",
      validCPF: true,
      birthDate: "",
      validBirthDate: true,
      email: "",
      validEmail: true,
      password: "",
      validPassword: true,
      role: UserRole.user,
      isLoading: false,
      modalVisible: false
    }
  }

  render() {
    return (
      <Form isLoading={this.state.isLoading} title='Cadastro de usuário' error={this.state.error}>
        <ModalScreen label='Usuário criado com sucesso' isVisible={this.state.modalVisible} onBackDropPress={this.toggleModal} />
        <FormItemText label="Nome" onChangeText={this.handleChangeName} shouldHideText={false}
          error={(!this.state.validName ? constants.REQUIRED_FIELD_ERROR : undefined)} />
        <FormItemText label="E-mail" onChangeText={this.handleChangeEmail} shouldHideText={false}
          error={(!this.state.validEmail ? constants.INVALID_EMAIL_ERROR : undefined)} />
        <FormItemText label="CPF" onChangeText={this.handleChangeCPF} shouldHideText={false}
          error={(!this.state.validCPF ? constants.INVALID_CPF_ERROR : undefined)} />
        <FormItemText label="Data de Nascimento" onChangeText={this.handleChangeBirthDate} shouldHideText={false}
          error={(!this.state.validBirthDate ? constants.INVALID_DATE_ERROR : undefined)} />
        <FormItemText label="Senha" onChangeText={this.handleChangePassword} shouldHideText={true}
          error={(!this.state.validPassword ? constants.INVALID_PASSWORD_ERROR : undefined)} />
        <FormItemPicker label="Perfil" options={constants.USER_ROLES} handleValueChange={this.handleChangeRole} />
        <Button label="Confirmar" onPress={this.handleSubmitButtonPress} />
      </Form>
    );
  }

  private toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
    this.props.navigation.navigate('UsersPage');
  }

  private handleChangeRole = (role: string) => {
    if (role != this.state.role) {
      this.setState({ role: UserRole[role] })
    }
  }

  private handleChangeEmail = (email: string) => {
    const validEmail = utils.isValidEmail(email);
    if (validEmail != this.state.validEmail || email != this.state.email) {
      this.setState({
        email: email,
        validEmail: validEmail
      })
    }
  }

  private handleChangeName = (name: string) => {
    const validName = !(name === "");
    if (validName != this.state.validName || name != this.state.name) {
      this.setState({
        name: name,
        validName: validName
      })
    }
  }

  private handleChangeCPF = (cpf: string) => {
    const validCPF = utils.isValidCPF(cpf);
    if (validCPF != this.state.validCPF || cpf != this.state.cpf) {
      this.setState({
        cpf: cpf,
        validCPF: validCPF
      })
    }
  }

  private handleChangePassword = (password: string) => {
    const validPassword = utils.isValidPassword(password);
    if (validPassword != this.state.validPassword || password != this.state.password) {
      this.setState({
        password: password,
        validPassword: validPassword
      })
    }
  }

  private handleChangeBirthDate = (birthDate: string) => {
    const validBirthDate = utils.isValidDate(birthDate);
    if (validBirthDate != this.state.validBirthDate || birthDate != this.state.birthDate) {
      this.setState({
        birthDate: birthDate,
        validBirthDate: validBirthDate
      })
    }
  }

  private validateAllFields() {
    const validName = !(this.state.name === "");
    const validEmail = utils.isValidEmail(this.state.email);
    const validCPF = utils.isValidCPF(this.state.cpf);
    const validPassword = utils.isValidPassword(this.state.password);
    const validBirthDate = utils.isValidDate(this.state.birthDate);
    this.setState({
      validName: validName,
      validEmail: validEmail,
      validCPF: validCPF,
      validBirthDate: validBirthDate,
      validPassword: validPassword
    });
  }

  private handleSubmitButtonPress = async () => {
    await this.validateAllFields();

    if (this.state.validEmail
      && this.state.validName
      && this.state.validCPF
      && this.state.validBirthDate
      && this.state.validPassword
    ) {
      try {
        this.setState({ isLoading: true });

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
        this.setState({
          modalVisible: true,
          isLoading: false
         });
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
