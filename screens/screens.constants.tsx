import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const USER_ROLES = ["user", "admin"]
export const REQUIRED_FIELD_ERROR = "Campo obrigatório!";
export const INVALID_EMAIL_ERROR = "E-mail inválido! O e-mail deve estar no formato ###@###.com";
export const INVALID_PASSWORD_ERROR = "Senha inválida! Sua senha: \n * deve ter no mínimo 7 caracteres \n * e deve ter, no mínimo, 1 letra e 1 dígito"
export const INVALID_DATE_ERROR = "Data inválida! Este campo deve estar no formato YYYY-MM-DD"
export const INVALID_CPF_ERROR = "CPF inválido! Insira apenas os 11 dígitos de seu cpf"


//TODO (remove this const)
export const SCREEN_STYLES = StyleSheet.create({
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  detail: {
    fontSize: 18,
    fontWeight: Colors.bold,
    color: 'gray',
    marginBottom: 10
  },
  error: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: Colors.bold,
    color: 'red'
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: 'blue',
    borderColor: Colors.black,
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 10,
    margin: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  separator: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    fontSize: 22,
    fontWeight: Colors.bold,
    color: Colors.black,
    marginBottom: 10
  },
  wrapper: {
    width: '100%',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    paddingHorizontal: 30,
    paddingVertical: 20
  }
});
