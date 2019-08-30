import React from 'react';
import { FormItem } from './form-item';
import {FormItemTextInputStyled } from './form-item-text.component.style';

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
      <FormItem label={this.props.label} error={this.props.error}>
        <FormItemTextInputStyled secureTextEntry={this.props.shouldHideText} onChangeText={this.props.onChangeText} />
      </FormItem>
    );
  }
}

export default FormItemText;
