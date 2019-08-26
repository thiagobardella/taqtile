import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export class Home extends React.Component {
  render() {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Perfil</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  }
});

export default Home;