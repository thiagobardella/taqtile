import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { StyleSheet, TextInput, Text, View } from 'react-native';
import * as constants from './components.constants'
import { FormLabel } from './TitleText';
import { FormItem } from './FormItem';

export interface FormItemTextProps {
  label: string;
  error?: string;
  onChangeText?: (text: string) => void;
  shouldHideText: boolean;
}

export class FormItemText extends React.PureComponent<FormItemTextProps> {
  constructor(props: FormItemTextProps) {
    super(props);
  }

  render() {
    return (
      // <View style={constants.COMPONENTS_STYLES.wrapper}>
      //     <FormLabel>{this.props.label}</FormLabel>
      //     <TextInput secureTextEntry={this.props.shouldHideText} onChangeText={this.props.onChangeText} style={styles.formItemInput} />
      //     {this.props.error &&
      //         <Text style={constants.COMPONENTS_STYLES.formItemError}>{this.props.error}</Text>
      //     }
      // </View>
      <FormItem label={this.props.label} error={this.props.error}>
        <TextInput secureTextEntry={this.props.shouldHideText} onChangeText={this.props.onChangeText} style={styles.formItemInput} />
      </FormItem>
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
  formItemInput: {
    width: '100%',
    color: 'black',
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 2
  },
});

export default FormItemText;
