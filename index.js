/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import ApolloClient from 'apollo-boost';

import { gql } from "apollo-boost";

import React, { Fragment } from 'react';

import { ApolloProvider } from '@apollo/react-hooks';
import { StyleSheet, TextInput, Text, View } from 'react-native';

import { useMutation } from '@apollo/react-hooks';



import { useQuery } from '@apollo/react-hooks';


const LOGIN_USER = gql`
    mutation {
      Login(data: {
                    email: "admin@taqtile.com",
                    password: "1234qwer"
                  }) 
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

const POKEMON_QUERY = gql`
{
  pokemon(name: "Pikachu") {
    id
    number
    name
    attacks {
      special {
        name
        type
        damage
      }
    }
    evolutions {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      attacks {
        fast {
          name
          type
          damage
        }
      }
    }
  }
}
`


function AddTodo() {
  // client
  // .mutate({
  //   mutation: LOGIN_USER
  // })
  // .then(result => console.log(`Printing AddTodo: ${result.data.Login.token}`));

  const { loading, error, data } = useMutation(LOGIN_USER);
  // const { loading, error, data } = useQuery(POKEMON_QUERY);

  if (loading) return <Text>Loading...</Text>;
  if (error) return  <Text>`Error! ${error.message}`</Text>;

  console.log(`Printing data: ${error.message} ${JSON.stringify(data)}`);

  return <Text>`Error! ${error.message}`</Text>;


  
  // return (
  //   <Text>
  //     {/* `${JSON.stringify(data)}` */}
  //     ${data.token}
  //   </Text>

  // );
}


function ExchangeRates() {
  const { loading, error, data } = useQuery(gql`
  {
    pokemon(name: "Pikachu") {
      id
      number
      name
      attacks {
        special {
          name
          type
          damage
        }
      }
      evolutions {
        id
        number
        name
        weight {
          minimum
          maximum
        }
        attacks {
          fast {
            name
            type
            damage
          }
        }
      }
    }
  }
  `);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  return <Text>`${data.pokemon.id}`</Text>
}

export const client = new ApolloClient({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql'
  // uri: 'https://graphql-pokemon.now.sh/',
});

// client
//   .query({
//     query: gql`
//     {
//       pokemon(name: "Pikachu") {
//         id
//         number
//         name
//         attacks {
//           special {
//             name
//             type
//             damage
//           }
//         }
//         evolutions {
//           id
//           number
//           name
//           weight {
//             minimum
//             maximum
//           }
//           attacks {
//             fast {
//               name
//               type
//               damage
//             }
//           }
//         }
//       }
//     }
//     `
//   })
//   .then(result => console.log(result));

  // client
  // .mutate({
  //   mutation: LOGIN_USER
  // })
  // .then(result => console.log(`Printing result: ${result.data.Login.token}`));


const App2 = () => (
  <ApolloProvider client={client}>
    
      <Text>result</Text>
      {/* <ExchangeRates /> */}
      <AddTodo />
  </ApolloProvider>
);

// render(<App2 />, document.getElementById('root'));

AppRegistry.registerComponent(appName, () => App);
