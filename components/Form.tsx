import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Spinner from 'react-native-loading-spinner-overlay';
import { FormErrorTextStyled, FormBodyStyled, FormScrollViewStyled } from './form.component.style';
import { H1 } from './typography.component.style';

interface FormProps {
  title: string;
  isLoading: boolean;
  error?: string;
  children: Element;
}

export const Form: React.FC<FormProps> = (props: FormProps) => (
  <FormScrollViewStyled contentInsetAdjustmentBehavior="automatic" >
    <H1>{props.title}</H1>
    <FormBodyStyled >
      <Spinner visible={props.isLoading} />
      {props.error && <FormErrorTextStyled >{props.error}</FormErrorTextStyled>}
      {props.children}
    </FormBodyStyled>
  </FormScrollViewStyled>
);
