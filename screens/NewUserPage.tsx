import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';
import ApolloClient from 'apollo-boost';
import * as ScreensConstants from './screeens.constants'
import Spinner from 'react-native-loading-spinner-overlay';
import { NavigationScreenProps } from 'react-navigation';


interface NewUserPageProps {
  navigation: NavigationScreenProps;
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

export class NewUserPage extends React.Component<NewUserPageProps, UsersPageState> {
  constructor(props: NewUserPageProps) {
    super(props);

    this.state = {
      users: [],
      isLoading: false,
      currentPage: 1,
      client: new ApolloClient(),
      endReached: false
    }
  }

  
  render() {
    return (
          <Text style={styles.sectionTitle}>Novo usuário</Text>
    );
  }
}

const styles = StyleSheet.create({
  
  sectionTitle: {
    fontSize: 30,
    fontWeight: Colors.bold,
    color: Colors.black,
    marginBottom: 10
  }
});

export default NewUserPage;