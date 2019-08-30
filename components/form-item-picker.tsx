import React from 'react';
import { Picker } from 'react-native';
import { FormItem } from './form-item';
import { PickerStyled, ButtonTouchableOpacityStyled } from './form-item-picker.component.style';

export interface FormItemPickerProps {
  label: string;
  options: string[];
  handleValueChange: (fieldName: string) => void;
}
export class FormItemPicker extends React.PureComponent<FormItemPickerProps> {
  render() {
    return (
      <FormItem label={this.props.label}>
        <ButtonTouchableOpacityStyled >
          <PickerStyled onValueChange={this.props.handleValueChange} >
            {this.props.options.map(option => {
              return <Picker.Item label={option} value={option} />;
            })}
          </PickerStyled>
        </ButtonTouchableOpacityStyled>
      </FormItem >
    );
  }
}


export default FormItemPicker;
