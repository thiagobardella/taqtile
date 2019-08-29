import { View, StyleSheet, Text } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import * as React from "react";
import { FormLabel } from "./TitleText";

const FORM_ITEM_STYLES = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 30,
    paddingVertical: 20
  },
  formItemError: {
    flex: 1,
    alignSelf: 'flex-start',
    height: '100%',
    color: 'red',
    margin: 5
  }
});

//TODO (how to allow only one item??)
interface FormItemProps {
  label: string,
  error?: string,
  children: Element
}

export const FormItem: React.FC<FormItemProps> = (props: FormItemProps) => (
  <View style={FORM_ITEM_STYLES.wrapper}>
    <FormLabel>{props.label}</FormLabel>
    {props.children}
    {props.error &&
      <Text style={FORM_ITEM_STYLES.formItemError}>{props.error}</Text>
    }
  </View>
);
