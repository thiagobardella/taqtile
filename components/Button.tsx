import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as constants from './components.constants'

export interface ButtonProps {
    label: string;
    onPress: () => void;
}

export class Button extends React.PureComponent<ButtonProps> {
    render() {
        return (
            <View style={constants.COMPONENTS_STYLES.wrapper}>
                <TouchableOpacity style={constants.COMPONENTS_STYLES.button} onPress={this.props.onPress}>
                    <Text style={constants.COMPONENTS_STYLES.buttonText}>{this.props.label}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Button;