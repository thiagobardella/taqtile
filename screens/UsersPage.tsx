import React from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ApolloClient from 'apollo-boost';
import Spinner from 'react-native-loading-spinner-overlay';
import * as constants from './screens.constants'
import * as graphQLconsts from './graphQL.constants'
import * as utils from './screens.utils'
import Button from '../components/Button';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { Title } from '../components/TitleText';
import { Form } from '../components/Form';

interface UsersPageProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface UsersPageState {
  users: UserInfo[],
  isLoading: boolean,
  currentPage: number,
  client: ApolloClient<unknown>,
  hasNextPage: boolean
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
      hasNextPage: true
    }
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    const token = await AsyncStorage.getItem('token')

    const client = utils.APOLLO_CLIENT_AUTHENTICATED(token || '');

    const queryResult = await client.query({
      query: graphQLconsts.USERS_PAGINATED_QUERY,
      variables: {
        offset: (this.state.currentPage * graphQLconsts.USERS_PAGE_LIMIT)
      }
    })

    if (queryResult.data.Users) {
      this.setState({
        client: client,
        currentPage: (this.state.currentPage + 1),
        users: queryResult.data.Users.nodes,
        isLoading: false,
        hasNextPage: queryResult.data.Users.pageInfo.hasNextPage
      })
    }
  }

  render() {
    return (
      <Form isLoading={this.state.isLoading} title='Lista de usuários'>
        <Button label='Novo usuário' onPress={this.handleNewUserButtonPress} />
        <FlatList
            style={{ width: '100%' }}
            data={this.state.users}
            renderItem={this.renderItem}
            ItemSeparatorComponent={() => <View style={constants.SCREEN_STYLES.separator} />}
            ListFooterComponent={this.renderFooter.bind(this)}
          />
      </Form>
    );
  }

  private handleNewUserButtonPress = () => {
    this.props.navigation.navigate('NewUserPage');
  }

  private renderFooter = () => {
    return (
      <View style={constants.SCREEN_STYLES.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          disabled={!this.state.hasNextPage}
          onPress={this.loadMoreData}
          style={[constants.SCREEN_STYLES.loadMoreBtn, { backgroundColor: this.state.hasNextPage ? 'blue' : 'gray' }]}>
          <Text style={constants.SCREEN_STYLES.btnText}>Mais</Text>
        </TouchableOpacity>
      </View>
    );
  }

  private renderItem = ({ item }: { item: UserInfo }) => (
    <View style={constants.SCREEN_STYLES.wrapper}>
      <Text style={constants.SCREEN_STYLES.title}>{item.name}</Text>
      <Text style={constants.SCREEN_STYLES.detail}>{item.email}</Text>
    </View>
  )

  private loadMoreData = async () => {
    this.setState({ isLoading: true });

    const queryResult = await this.state.client.query({
      query: graphQLconsts.USERS_PAGINATED_QUERY,
      variables: {
        offset: (this.state.currentPage * graphQLconsts.USERS_PAGE_LIMIT)
      }
    })

    const previousUsers = this.state.users;
    const allUsers = previousUsers.concat(queryResult.data.Users.nodes);

    this.setState({
      currentPage: (this.state.currentPage + 1),
      users: allUsers,
      isLoading: false,
      hasNextPage: queryResult.data.Users.pageInfo.hasNextPage
    });
  };
}

export default UsersPage;
