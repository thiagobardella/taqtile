// components/FormTextInput.tsx
import React from 'react';
import {StyleSheet, TextInput, Text, View} from 'react-native';

export interface FormTextInputProps {
    label: String
}

export class FormTextInput extends React.Component<FormTextInputProps> {
    constructor(props: FormTextInputProps) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.label}</Text>
                <TextInput style={styles.textInput} />
            </View>
        );
    }
}

// styles
const styles = StyleSheet.create({
    container: {
        width: "100%"
    },
    text: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 20,
        paddingVertical: 10
    },
    textInput: {
        width: "100%",
        color: 'black',
        borderColor: 'gray',
        borderRadius: 5,
        borderWidth: 2
    }

});

export default FormTextInput;