import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { gql } from "apollo-boost";
import AsyncStorage from '@react-native-community/async-storage';
import { Query } from "react-apollo";
import { useQuery, ApolloProvider } from '@apollo/react-hooks';


interface UsersPageProps {
  navigation: any;
}

export interface UsersPageState {
  token: string;
}


const users = [
  {
    id: 1,
    userName: "John",
    email: "john@gmail.com"
  },
  {
    id: 2,
    userName: "Jane",
    email: "jane@gmail.com"
  },
  {
    id: 3,
    userName: "Mary",
    email: "mary@gmail.com"
  }
];

const usersQuery = gql`
  {
    Users {
      nodes {
        name
        email
      }
    }
  }
`;

import { createHttpLink } from "apollo-link-http";



// a query with apollo-client

function UsersList() {
  const { loading, error, data } = useQuery(usersQuery);

  // if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>`Error :( ${error.message}`</Text>;
  if (data) return <Text>Data retrieved</Text>




  return (
  // <Text>This is useQuery </Text>
    data.Users.nodes.sort((a, b) => (a.name > b.name) ? 1 : -1).map(
      user => {
        (
          <View style={styles.wrapper}>
            <Text style={styles.title}>{user.name}</Text>
            <Text style={styles.detail}>{user.email}</Text>
          </View>
        );
  }));
}

export class UsersPage extends React.Component<UsersPageProps, UsersPageState> {
  constructor (props: UsersPageProps) {
    super(props);

    this.state = {
        token: ""
              }
  }

  // private onLoad = (token: string) => {
  //   this.getToken();

  //   // const Dogs = ({ onDogSelected }) => (
  //   //   return <Query query={usersQuery}>
  //   //     {({ loading, error, data }) => {
  //   //       if (loading) return "Loading...";
  //   //       if (error) return `Error! ${error.message}`;

  //   //        <Text>dfsfdsdf</Text>
  //   //         // {data.sort((a, b) => (a.userName > b.userName) ? 1 : -1).map(user => {
  //   //         //   return (
  //   //         //     <View style={styles.wrapper}>
  //   //         //       <Text style={styles.title}>{user.name}</Text>
  //   //         //       <Text style={styles.detail}>{user.email}</Text>
  //   //         //     </View>
  //   //         //   );
  //   //         // })}
          
  //   //     }}
  //   // </Query>);



  //   const result = client.query({
  //     query: usersQuery,
  //     context: {
  //       headers: {
  //         Authorization: token
  //       }
  //     }
  //   });
  //   return <Text>LOOK. SUCCESSFUL QUERY </Text>;
  //   // .then(result => {
  //   //   // result.data.Users.nodes.sort((a, b) => (a.name > b.name) ? 1 : -1).map(
  //   //   //   user => {
  //   //   //     return (
  //   //   //       <View style={styles.wrapper}>
  //   //   //         <Text style={styles.title}>{user.userName}</Text>
  //   //   //         <Text style={styles.detail}>{user.email}</Text>
  //   //   //       </View>
  //   //   //     );
  //   //   //   }
  //   //   // )
  //   //   return <Text>LOOK. SUCCESSFUL QUERY</Text>
  //   // }).catch(err => this.setState({token : "FAILED QUERY"}));
  // }

  private getToken = () => {
    AsyncStorage.getItem('token')
      .then((value) => this.setState({ token: value || 'none' }))
      .catch(err => this.props.navigation.navigate('Home'));
      return this.state.token;
  }

  render() {
    const headers = {
      Authorization: this.getToken()
    }

    const link = createHttpLink({ uri: "https://tq-template-server-sample.herokuapp.com/graphql" , headers: headers});

    const client = new ApolloClient({
      link: link,
      cache: new InMemoryCache()
    });
    
    try {
      const result = client.query({
        query: usersQuery
      }); 
      // <Text>Query executed </Text>;
      return (
      <Text>This is useQuery {JSON.stringify(result)}</Text> );
        //   result.data.Users.nodes.sort((a, b) => (a.name > b.name) ? 1 : -1).map(
        //     user => {
        //       (
        //         <View style={styles.wrapper}>
        //           <Text style={styles.title}>{user.name}</Text>
        //           <Text style={styles.detail}>{user.email}</Text>
        //         </View>
        //       );
        // }));

    } catch(error) {
      return <Text>ERROR</Text>;
    }
    
    // return (<ApolloProvider client={client}>
    //   <UsersList />

    // </ApolloProvider>);
    
    // (<Query query={usersQuery}>
    //           {() => <Text>Here we are</Text>}
    //       </Query>);

    // return (
    //   <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={styles.scrollView}>
    //     <View style={styles.body}>
    //       {/* {users.sort((a, b) => (a.userName > b.userName) ? 1 : -1).map(user => {
    //         return (
    //           <View style={styles.wrapper}>
    //             <Text style={styles.title}>{user.userName}</Text>
    //             <Text style={styles.detail}>{user.email}</Text>
    //           </View>
    //         );
    //       })} */}
    //       {this.onLoad(this.state.token)}
    //       <Text>FIM - {this.state.token}</Text>
    //     </View>
    //   </ScrollView>
    // );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 22,
    fontWeight: Colors.bold,
    color: Colors.black,
    marginBottom: 10
  },
  detail: {
    fontSize: 18,
    fontWeight: Colors.bold,
    color: 'gray',
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

export default UsersPage;