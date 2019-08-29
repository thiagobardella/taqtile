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
import { Text, View } from 'react-native';


interface NewUserPageProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface NewUserPageState {
  id: number;
  name: string;
  cpf: string;
  birthDate: string,
  email: string;
  password: string;
  role: string;
  isLoading: boolean;
  fieldsValidStatus: Object;
  error: string;
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
      role: "",
      isLoading: false,
      fieldsValidStatus: {
        'name': true,
        'cpf': true,
        'birthDate': true,
        'email': true,
        'password': true
      },
      error: ""
    }
  }

  render() {
    return (
      <Form isLoading={this.state.isLoading} title='Cadastro de usuário' error={this.state.error}>
        <FormItemText label="Nome" onChangeText={this.handleChangeField('name')} shouldHideText={false} 
          error={(!this.isFieldValue('name') ? constants.REQUIRED_FIELD_ERROR : undefined)} />
        <FormItemText label="E-mail" onChangeText={this.handleChangeEmail} shouldHideText={false}
           error={(!this.isFieldValue('email') ? constants.INVALID_EMAIL_ERROR : undefined)}/>
         <FormItemText label="CPF" onChangeText={this.handleChangeField('cpf')} shouldHideText={false}
           error={(!this.isFieldValue('cpf') ? constants.REQUIRED_FIELD_ERROR : undefined)} />
         <FormItemText label="Data de Nascimento" onChangeText={this.handleChangeField('birthDate')} shouldHideText={false}
           error={(!this.isFieldValue('birthDate') ? constants.REQUIRED_FIELD_ERROR : undefined)} />
         <FormItemText label="Senha" onChangeText={this.handleChangePassword} shouldHideText={true}
           error={(!this.isFieldValue('password') ? constants.INVALID_PASSWORD_ERROR : undefined)} />  
         <FormItemPicker label="Perfil" options={constants.USER_ROLES} handleValueChange={this.handleChangeField('role')} />
         <Button label="Confirmar" onPress={this.handleSubmitButtonPress} />
      </Form> 
    );
  }

  private isFieldValue = (fieldName: string) => {
    return this.state.fieldsValidStatus[fieldName];
  }

  private handleChangeField = (fieldName: string) => (fieldValue: string) => {
    const newState = {};
    newState[fieldName] = fieldValue;
    const validStatus = {fieldName: (fieldValue ? true : false)}
    newState['fieldsValidStatus'] = validStatus;
    if (fieldValue != this.state[fieldName])
      this.setState(newState);
  }

  private handleChangeEmail = (email: string) => {
    let validEmail = utils.isValidEmail(email);
    if (email != this.state.email || validEmail != this.state.fieldsValidStatus['email']) {
      const newState = {};
      newState['email'] = email;
      const validStatus = {'email': (email ? validEmail : false)};
      newState['fieldsValidStatus'] = validStatus;
      this.setState(newState);
    }
  };

  private handleChangePassword = (password: string) => {
    let validPassword = utils.isValidPassword(password);
    if (password != this.state.password || validPassword != this.state.fieldsValidStatus['password']) {
      const newState = {};
      newState['password'] = password;
      const validStatus = {'password': (password ? validPassword : false)};
      newState['fieldsValidStatus'] = validStatus;
      this.setState(newState);
    }
  };

  private handleSubmitButtonPress = async () => {
    if (this.state.fieldsValidStatus['name'] 
        && this.state.fieldsValidStatus['cpf']
        && this.state.fieldsValidStatus['birthDate']
        && this.state.fieldsValidStatus['password']) {
     
      try {
        this.setState({ isLoading: true });

        const token = await AsyncStorage.getItem('token')

        const client = utils.APOLLO_CLIENT_AUTHENTICATED(token || '');

        const result = await client.mutate({
          variables: {
            userInput: {
              name: this.state.name,
              email: this.state.email,
              cpf: this.state.cpf,
              birthDate: this.state.birthDate,
              password: this.state.password,
              role: this.state.role
            }
          },
          mutation: graphQLconsts.MUTATION_CREATE_USER_REQUEST
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
