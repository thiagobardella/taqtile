import React from 'react';
import { Button } from '../components/Button';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';
import ApolloClient from 'apollo-boost';
import * as ScreensConstants from './screeens.constants'
import Spinner from 'react-native-loading-spinner-overlay';
import { NavigationScreenProps } from 'react-navigation';


interface UsersPageProps {
  navigation: any;
}

interface UsersPageState {
  users: UserInfo[],
  isLoading: boolean,
  currentPage: number,
  client: ApolloClient<unknown>,
  endReached: boolean
}

interface UserInfo {
  id: number,
  name: string,
  email: string
}

export class UsersPage extends React.Component<UsersPageProps, UsersPageState> {
  constructor(props: UsersPageProps) {
    super(props);

    this.state = {
      users: [],
      isLoading: false,
      currentPage: 1,
      client: new ApolloClient(),
      endReached: false
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

    this.setState({ client: client });

    client.query({
      query: ScreensConstants.USERS_PAGINATED_QUERY,
      variables: {
        offset: (this.state.currentPage * 10)
      }
    }).then(result => {
      this.setState({
        currentPage: (this.state.currentPage + 1),
        users: result.data.Users.nodes,
        isLoading: false,
        endReached: (this.state.currentPage * 10 >= result.data.Users.count)
      });
    })
  }

  loadMoreData = () => {
    this.setState({ isLoading: true });

    const previousUsers = this.state.users;

    this.state.client.query({
      query: ScreensConstants.USERS_PAGINATED_QUERY,
      variables: {
        offset: (this.state.currentPage * 10)
      }
    }).then(result => {
      const allUsers = previousUsers.concat(result.data.Users.nodes);

      this.setState({
        currentPage: (this.state.currentPage + 1),
        users: allUsers,
        isLoading: false,
        endReached: (this.state.currentPage * 10 >= result.data.Users.count)
      });
    });

  };

  renderFooter() {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          disabled={this.state.endReached}
          onPress={this.loadMoreData}
          style={[styles.loadMoreBtn, {backgroundColor: this.state.endReached ? 'gray' : 'blue'}]}>
          <Text style={styles.btnText}>Mais</Text>
        </TouchableOpacity>
      </View>
    );
  }

  private renderItem = ({ item }: { item: UserInfo }) => (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.detail}>{item.email}</Text>
    </View>
  )

  private handleButtonPress = () => {
    this.props.navigation.navigate('NewUserPage');
  }

  render() {
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Lista de usuários</Text>
        </View>
        <Button label="Novo usuário" onPress={this.handleButtonPress} />
        <View style={styles.body}>
          <Spinner visible={this.state.isLoading}/>
          <FlatList
            style={{ width: '100%' }}
            data={this.state.users}
            renderItem={this.renderItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListFooterComponent={this.renderFooter.bind(this)}
          />
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
  separator: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  detail: {
    fontSize: 18,
    fontWeight: Colors.bold,
    color: 'gray',
    marginBottom: 10
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
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
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