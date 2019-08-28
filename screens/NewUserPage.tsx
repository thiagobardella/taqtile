import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { FormItemText } from '../components/FormItemText';
import * as constants from './screens.constants'
import Spinner from 'react-native-loading-spinner-overlay';
import FormItemPicker from '../components/FormItemPicker';
import { Title } from '../components/TitleText';

interface UserPageState {
    id: number,
    name: string,
    cpf: string,
    birthDate: string,
    email: string,
    password: string,
    role: string,
    isLoading: boolean
}

export class NewUserPage extends React.Component<{}, UserPageState> {
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
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={constants.SCREEN_STYLES.scrollView}>
                <Title title='Cadastro de usuário' />
                <View style={constants.SCREEN_STYLES.body}>
                    <Spinner
                        visible={this.state.isLoading}
                        textStyle={constants.SCREEN_STYLES.spinnerTextStyle}
                    />
                    <FormItemText label="Nome" onChangeText={this.handleChangeField} shouldHideText={false} />
                    <FormItemText label="E-mail" onChangeText={this.handleChangeField} shouldHideText={false} />
                    <FormItemText label="CPF" onChangeText={this.handleChangeField} shouldHideText={false} />
                    <FormItemText label="Data de Nascimento" onChangeText={this.handleChangeField} shouldHideText={false} />
                    <FormItemText label="Senha" onChangeText={this.handleChangeField} shouldHideText={true} />
                    <FormItemPicker label="Perfil" />
                    <Button label="Confirmar" onPress={this.handleSubmitButtonPress} />
                </View>
            </ScrollView>
        );
    }

    private handleChangeField = (field: string) => {
        //TODO (not implemented yet)
    }

    private handleSubmitButtonPress() {
        //TODO (not implemented yet)
    }
}

export default NewUserPage;