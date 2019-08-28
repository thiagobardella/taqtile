import React from 'react';
import { TouchableOpacity, Picker, Text, View, StyleSheet } from 'react-native';
import * as constants from './components.constants'
import { FormLabel } from './TitleText';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const FORM_ITEM_PICKER_STYLES = StyleSheet.create({
    wrapper: {
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: Colors.white,
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 5,
        paddingVertical: 5
    }
});

export interface FormItemPickerProps {
    label: string;
}
export class FormItemPicker extends React.PureComponent<FormItemPickerProps> {
    render() {
        return (
            <View style={constants.COMPONENTS_STYLES.wrapper}>
                <FormLabel>{this.props.label}</FormLabel>
                <TouchableOpacity style={FORM_ITEM_PICKER_STYLES.wrapper}>
                    <Picker
                        style={constants.COMPONENTS_STYLES.picker}>
                        <Picker.Item label="user" value="user" />
                        <Picker.Item label="admin" value="admin" />
                    </Picker>
                </TouchableOpacity>
            </View>
        );
    }
}


export default FormItemPicker;