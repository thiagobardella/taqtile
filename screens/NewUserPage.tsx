import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { FormItemText } from '../components/FormItemText';
import * as constants from './screens.constants'
import FormItemPicker from '../components/FormItemPicker';
import { Form } from '../components/Form';

interface NewUserPageState {
  id: number,
  name: string,
  cpf: string,
  birthDate: string,
  email: string,
  password: string,
  role: string,
  isLoading: boolean
}

export class NewUserPage extends React.Component<{}, NewUserPageState> {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      name: "",
      cpf: "",
      birthDate: "",
      email: "",
      password: "",
      role: "",
      isLoading: false
    }
  }

  render() {
    return (
      <Form isLoading={this.state.isLoading} title='Cadastro de usuário'>
        <FormItemText label="Nome" onChangeText={this.handleChangeField('name')} shouldHideText={false} />
        <FormItemText label="E-mail" onChangeText={this.handleChangeField('email')} shouldHideText={false} />
        <FormItemText label="CPF" onChangeText={this.handleChangeField('cpf')} shouldHideText={false} />
        <FormItemText label="Data de Nascimento" onChangeText={this.handleChangeField('birthDate')} shouldHideText={false} />
        {/* <DatePicker locale='en' mode='date' onDateChange={date => this.setState({ birthDate: date.toDateString })} /> */}
        <FormItemText label="Senha" onChangeText={this.handleChangeField('password')} shouldHideText={true} />
        <FormItemPicker label="Perfil" options={constants.USER_ROLES} handleValueChange={this.handleChangeField('role')} />
        <Button label="Confirmar" onPress={this.handleSubmitButtonPress} />
      </Form>
    );
  }

  private handleChangeField = (fieldName: string) => (fieldValue: string) => {
    const newState = {};
    newState[fieldName] = fieldValue;
    if (fieldValue != this.state[fieldName])
      this.setState(newState);
  }

  private handleSubmitButtonPress = () => {
    //TODO (not implemented yet)
  }
}

export default NewUserPage;
