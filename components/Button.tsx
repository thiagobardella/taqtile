// components/Hello.tsx
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export interface ButtonProps {
    label: String
}

export class Button extends React.Component<ButtonProps> {
    constructor(props: ButtonProps) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>{this.props.label}</Text>
            </TouchableOpacity>
        );
    }
}

// styles
const styles = StyleSheet.create({
    button: {
        width: "100%",
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'blue',
        borderColor: Colors.black,
        borderWidth: 2,
        borderRadius: 5,
        paddingVertical: 10,
        margin: 30
    },
    text: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 20,
    }
});

export default Button;