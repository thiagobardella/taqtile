import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';
import ApolloClient from 'apollo-boost';
import * as ScreensConstants from './screeens.constants'
import Spinner from 'react-native-loading-spinner-overlay';

interface UsersPageProps {
  navigation: any;
}

interface UsersPageState {
  result: any,
  isLoading: boolean
}

export class UsersPage extends React.Component<UsersPageProps, UsersPageState> {
  constructor(props: UsersPageProps) {
    super(props);

    this.state = {
      result: "",
      isLoading: false
    }
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    const token = await AsyncStorage.getItem('token')

    const client = new ApolloClient({
      uri: ScreensConstants.GRAPHQL_SERVER,
      request: operation => {
        operation.setContext({
          headers: {
            Authorization: `${token}`
          },
        });
      }
    });

    client.query({
      query: ScreensConstants.USERS_QUERY
    }).then(result => {
      this.setState({
        result: result,
        isLoading: false
      });
    })
  }

  render() {
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.body}>
          <Spinner
            visible={this.state.isLoading}
          />
          {this.state.result.data &&
            this.state.result.data.Users.nodes.sort((a, b) => (a.name > b.name) ? 1 : -1).map(user => {
              return (
                <View style={styles.wrapper}>
                  <Text style={styles.title}>{user.name}</Text>
                  <Text style={styles.detail}>{user.email}</Text>
                </View>
              )
            })
          }
        </View>
      </ScrollView>
    );
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