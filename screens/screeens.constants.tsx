import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';

export const GRAPHQL_SERVER = "https://tq-template-server-sample.herokuapp.com/graphql";

export const APOLLO_CLIENT_FOR_AUTHENTICATION = new ApolloClient({ uri: GRAPHQL_SERVER });

export const USERS_PAGINATED_QUERY = gql`
  query($offset: Int){
    Users(offset: $offset, orderBy: [{sort: name, direction: ASC}]) {
      count
      nodes {
        id
        name
        email
      }
    }
  }
`;