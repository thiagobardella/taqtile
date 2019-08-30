import React from 'react';
import { ButtonTextStyled, ButtonTouchableOpacityStyled, ButtonViewWrapperStyled } from './button.component.style';

export interface ButtonProps {
  label: string;
  onPress: () => void;
}

export class Button extends React.PureComponent<ButtonProps> {
  render() {
    return (
      <ButtonViewWrapperStyled >
        <ButtonTouchableOpacityStyled onPress={this.props.onPress}>
          <ButtonTextStyled >{this.props.label}</ButtonTextStyled>
        </ButtonTouchableOpacityStyled>
      </ButtonViewWrapperStyled>
    );
  }
}

export default Button;
