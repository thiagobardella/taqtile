import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const PASSWORD_MIN_LENGTH = 7;
export const REGEX_PASSWORD_MIN_LENGTH = new RegExp(`.{${PASSWORD_MIN_LENGTH},}`);
export const REGEX_PASSWORD_AT_LEAST_1_DIGIT = new RegExp(".*\\d.*");
export const REGEX_PASSWORD_AT_LEAST_1_LETTER = new RegExp(".*[a-zA-Z].*");
export const REGEX_EMAIL_FORMAT = new RegExp("\\w+@\\w+.com$");

export const USER_ROLES = ["user", "admin"]

export const SCREEN_STYLES = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
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
