/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Button} from './components/Button';
import {FormTextInput} from './components/FormTextInput';

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Bem vindo(a) à Taqtile!</Text>
          </View>
          <View style={styles.body}>
            <View style={styles.container}>
              <FormTextInput label="E-mail" />
            </View>
            <View style={styles.container}>
              <FormTextInput label="Senha" />
            </View>
            <View style={styles.container}>
              <Button label="Entrar"/>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  container: {
    width: "100%",
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 30,
    paddingVertical: 20
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
  }
});

export default App;
