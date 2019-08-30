import * as React from "react";
import { FormItemErrorMessageStyled, FormItemLabelStyled, FormItemWrapperStyled } from "./form-item.component.style";

export interface FormItemProps {
  label: string,
  error?: string,
  children: Element
}

export const FormItem: React.FC<FormItemProps> = (props: FormItemProps) => (
  <FormItemWrapperStyled >
    <FormItemLabelStyled errorMode={Boolean(props.error)}>{props.label}</FormItemLabelStyled>
    {props.children}
    {props.error &&
      <FormItemErrorMessageStyled >{props.error}</FormItemErrorMessageStyled>
    }
  </FormItemWrapperStyled>
);
