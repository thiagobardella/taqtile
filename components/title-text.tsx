import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { H1, TitleWrapperStyled } from './titletext.component.style';

interface TitleProps {
    children: string;
}

export const Title: React.FC<TitleProps> = (props: TitleProps) => {
    return (
        <TitleWrapperStyled >
          <H1 {...props}>{props.children}</H1>
        </TitleWrapperStyled>
    );
}

