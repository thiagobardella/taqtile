import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Title } from './TitleText';
import Spinner from 'react-native-loading-spinner-overlay';

const FORM_STYLES = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  error: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: Colors.bold,
    color: 'red'
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
      {props.error && <Text style={FORM_STYLES.error}>{props.error}</Text>}
      {props.children}
    </View>
  </ScrollView>
);
