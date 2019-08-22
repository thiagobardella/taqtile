import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { StyleSheet, TextInput, Text, View } from 'react-native';

export interface FormItemProps {
    label: String
}

export class FormItem extends React.PureComponent<FormItemProps> {
    render() {
        return (
            <View style={styles.wrapper}>
                <Text style={styles.formItemLabel}>{this.props.label}</Text>
                <TextInput style={styles.formItemTextInput} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        alignItems: 'flex-start',
        backgroundColor: Colors.white,
        paddingHorizontal: 30,
        paddingVertical: 20
    },
    formItemLabel: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 20,
        paddingVertical: 10
    },
    formItemTextInput: {
        width: '100%',
        color: 'black',
        borderColor: 'gray',
        borderRadius: 5,
        borderWidth: 2
    }
});

export default FormItem;