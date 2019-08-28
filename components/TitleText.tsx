import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const TITLE_TEXT_STYLES = StyleSheet.create({
    sectionHeader: {
      alignSelf: 'center',
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 30,
      fontWeight: Colors.bold,
      color: Colors.black,
      marginBottom: 10
    },
});

interface TitleProps {
    title: string;
}

export const Title: React.FC<TitleProps> = (props: TitleProps) => {
    return (
        <View style={TITLE_TEXT_STYLES.sectionHeader}>
            <Text style={TITLE_TEXT_STYLES.sectionTitle}>{props.title}</Text>
        </View>
    ); 
} 

const FORM_LABEL_STYLES = StyleSheet.create({
    formItemLabel: {
        alignSelf: 'flex-start',
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 20,
        paddingVertical: 10,
        marginLeft: 5
    },
});

interface FormLabelProps {
    children: string;
}

export const FormLabel: React.FC<FormLabelProps> = (props: FormLabelProps) => (
    <Text style={FORM_LABEL_STYLES.formItemLabel}>{props.children}</Text>
);

const FORM_ERROR_LABEL_STYLES = StyleSheet.create({
    formItemError: {
        flex: 1,
        height: '100%',
        color: 'red'
    }
});

interface FormErrorLabelProps {
    children: string;
}

export const FormErrorLabel: React.FC<FormErrorLabelProps> = (props: FormErrorLabelProps) => (
    <Text style={FORM_ERROR_LABEL_STYLES.formItemError}>{props.children}</Text>
);