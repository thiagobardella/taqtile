import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

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

export class UsersPage extends React.Component {
  render() {
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.body}>
          {users.sort((a, b) => (a.userName > b.userName) ? 1 : -1).map(user => {
            return (
              <View style={styles.wrapper}>
                <Text style={styles.title}>{user.userName}</Text>
                <Text style={styles.detail}>{user.email}</Text>
              </View>
            );
          })}
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