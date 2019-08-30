import styled from 'styled-components/native';

export const FormItemWrapperStyled = styled.View`
  width: 100%;
  alignItems: center;
  alignSelf: center;
  backgroundColor: white;
  paddingHorizontal: 30;
  paddingVertical: 20;
`;
export const FormItemErrorMessageStyled = styled.Text`
  fontSize: 12;
  fontWeight: normal;
  color: red;
  marginTop: 8;
  flex: 1;
  alignSelf: flex-start;
  height: 100%;
`;

export const FormItemLabelValidStyled = styled.Text`
  alignSelf: flex-start;
  color: gray;
  fontWeight: normal;
  fontSize: 12;
  marginBottom: 12;
  paddingVertical: 10;
  marginLeft: 5;
`;

export const FormItemLabelInvalidStyled = styled.Text`
  alignSelf: flex-start;
  color: red;
  fontWeight: normal;
  fontSize: 12;
  marginBottom: 12;
  paddingVertical: 10;
  marginLeft: 5;
`;

