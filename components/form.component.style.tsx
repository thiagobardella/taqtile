import styled from 'styled-components/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const FormErrorTextStyled = styled.Text`
  alignSelf: center;
  fontSize: 25;
  fontWeight: bold;
  color: red;
`;

export const FormBodyStyled = styled.View`
  backgroundColor: white;
`;

export const FormScrollViewStyled = styled.ScrollView`
  backgroundColor: ${Colors.lighter};
`;
