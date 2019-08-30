import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Title } from './titletext';
import Spinner from 'react-native-loading-spinner-overlay';
import { FormErrorTextStyled } from './form.component.style';

const FORM_STYLES = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  }
});

//TODO (should I allow only FormItems as children?)
interface FormProps {
  title: string;
  isLoading: boolean;
  error?: string;
  children: Element;
}

export const Form: React.FC<FormProps> = (props: FormProps) => (
  <ScrollView
    contentInsetAdjustmentBehavior="automatic"
    style={FORM_STYLES.scrollView}>
    <Title>{props.title}</Title>
    <View style={FORM_STYLES.body}>
      <Spinner visible={props.isLoading} />
      {props.error && <FormErrorTextStyled >{props.error}</FormErrorTextStyled>}
      {props.children}
    </View>
  </ScrollView>
);
