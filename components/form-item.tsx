import * as React from "react";
import { FormItemErrorMessageStyled, FormItemLabelValidStyled, FormItemWrapperStyled, FormItemLabelInvalidStyled } from "./form-item.component.style";

export interface FormItemProps {
  label: string,
  error?: string,
  children: Element
}

export const FormItem: React.FC<FormItemProps> = (props: FormItemProps) => (
  <FormItemWrapperStyled >
    {props.error
      ? <FormItemLabelInvalidStyled >{props.label}</FormItemLabelInvalidStyled>
      : <FormItemLabelValidStyled >{props.label}</FormItemLabelValidStyled>
    }
    {props.children}
    {props.error &&
      <FormItemErrorMessageStyled >{props.error}</FormItemErrorMessageStyled>
    }
  </FormItemWrapperStyled>
);
