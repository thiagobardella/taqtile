import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const GRAPHQL_SERVER = "https://tq-template-server-sample.herokuapp.com/graphql";

export const APOLLO_CLIENT_FOR_AUTHENTICATION = new ApolloClient({ uri: GRAPHQL_SERVER });

export const USERS_PAGE_LIMIT = 10

export const USERS_PAGINATED_QUERY = gql`
  query($offset: Int){
    Users(offset: $offset, limit: ${USERS_PAGE_LIMIT}, orderBy: [{sort: name, direction: ASC}]) {
      count
      nodes {
        id
        name
        email
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

export const MUTATION_LOGIN_REQUEST = gql`
  mutation($loginInput: LoginInput!) {
      Login(data: $loginInput) 
      {
        user {
          name
          cpf
          email
        }
        token
      }
    }
`;

export const MUTATION_CREATE_USER_REQUEST = gql`
  mutation($loginInput: LoginInput!) {
      Login(data: $loginInput) 
      {
        user {
          name
          cpf
          email
        }
        token
      }
    }
`;

export const PASSWORD_MIN_LENGTH = 7;
export const REGEX_PASSWORD_MIN_LENGTH = new RegExp(`.{${PASSWORD_MIN_LENGTH},}`);
export const REGEX_PASSWORD_AT_LEAST_1_DIGIT = new RegExp(".*\\d.*");
export const REGEX_PASSWORD_AT_LEAST_1_LETTER = new RegExp(".*[a-zA-Z].*");
export const REGEX_EMAIL_FORMAT = new RegExp("\\w+@\\w+.com$");

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