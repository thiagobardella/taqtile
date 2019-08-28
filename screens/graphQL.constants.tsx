
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';

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

