import React from 'react';
import { TouchableOpacity, Picker, Text, View, StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { FormItem } from './FormItem';

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
  },
  picker: {
      width: '100%',
      color: 'black',
      fontWeight: 'bold',
      fontSize: 20
  }
});

export interface FormItemPickerProps {
  label: string;
  options: string[];
  handleValueChange: (fieldName: string) => void;
}
export class FormItemPicker extends React.PureComponent<FormItemPickerProps> {
  render() {
    return (
      // <View style={constants.COMPONENTS_STYLES.wrapper}>
      //   <FormLabel>{this.props.label}</FormLabel>
      //   <TouchableOpacity style={FORM_ITEM_PICKER_STYLES.wrapper}>
      //     <Picker style={constants.COMPONENTS_STYLES.picker}>
      //       {this.props.options.map(option => {
      //         return <Picker.Item label={option} value={option} />;
      //       })}
      //     </Picker>
      //   </TouchableOpacity>
      // </View>
      <FormItem label={this.props.label}>
        <TouchableOpacity style={FORM_ITEM_PICKER_STYLES.wrapper}>
          <Picker onValueChange={this.props.handleValueChange} style={FORM_ITEM_PICKER_STYLES.picker}>
            {this.props.options.map(option => {
              return <Picker.Item label={option} value={option} />;
            })}
          </Picker>
        </TouchableOpacity>
      </FormItem >
    );
  }
}


export default FormItemPicker;
