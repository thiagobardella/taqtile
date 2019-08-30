import * as React from 'react';
import { StyleSheet, Text } from "react-native";
import Modal from "react-native-modal";

const MODAL_TEXT_STYLES = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50,
    marginBottom: 400,
    borderRadius: 10,
    borderColor: 'gray'
  }
});

interface TitleProps {
  isVisible: boolean;
  onBackDropPress: () => void;
  label: string;
}

export const ModalScreen: React.FC<TitleProps> = (props: TitleProps) => {
  return (
    <Modal style={MODAL_TEXT_STYLES.modal} isVisible={props.isVisible} onBackdropPress={props.onBackDropPress}>
      <Text>{props.label}</Text>
    </Modal>
  );
}
