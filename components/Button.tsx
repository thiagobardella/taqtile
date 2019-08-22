import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export interface ButtonProps {
    label: string;
    onPress: () => void;
}

export class Button extends React.PureComponent<ButtonProps> {
    render() {
        return (
<<<<<<< HEAD
            <View style={styles.wrapper}>
                <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
                    <Text style={styles.buttonText}>{this.props.label}</Text>
                </TouchableOpacity>
            </View>
=======
            <TouchableOpacity 
                style={styles.button}
                onPress={this.props.onPress}>
                <Text style={styles.text}>{this.props.label}</Text>
            </TouchableOpacity>
>>>>>>> Substituting FormTextInput for FormItem
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: Colors.white,
        paddingHorizontal: 30,
        paddingVertical: 20
    },
    button: {
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'blue',
        borderColor: Colors.black,
        borderWidth: 2,
        borderRadius: 5,
        paddingVertical: 10,
        margin: 30
    },
<<<<<<< HEAD
    buttonText: {
=======
    text: {
>>>>>>> Substituting FormTextInput for FormItem
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 20,
    }
});

export default Button;