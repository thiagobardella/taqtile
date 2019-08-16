// components/Hello.tsx
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export interface HelloProps {
  name: string;
  enthusiasmLevel?: number;
}

interface State {
  enthusiasmLevel: number;
}

export class Hello extends React.Component<HelloProps, State> {
  constructor(props: HelloProps) {
    super(props);

    this.state = {
      enthusiasmLevel: props.enthusiasmLevel || 1,
    };
  }

  private onIncrement = () =>
    this.setState({enthusiasmLevel: this.state.enthusiasmLevel + 1});
  private onDecrement = () => {
    if ((this.state.enthusiasmLevel || 0) > 0)
        this.setState({enthusiasmLevel: this.state.enthusiasmLevel - 1});
  }
  private getExclamationMarks = () => Array(this.state.enthusiasmLevel + 1).join('!');

  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.greeting}>
          {`Hello ${this.props.name}${this.getExclamationMarks()}`}
        </Text>

        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button
              title="-"
              onPress={this.onDecrement}
              accessibilityLabel="decrement"
              color="red"
            />
          </View>

          <View style={styles.button}>
            <Button
              title="+"
              onPress={this.onIncrement}
              accessibilityLabel="increment"
              color="blue"
            />
          </View>
        </View>
      </View>
    );
  }
}

// styles
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttons: {
    flexDirection: 'row',
    minHeight: 70,
    alignItems: 'stretch',
    alignSelf: 'center',
    borderWidth: 5,
  },
  button: {
    flex: 1,
    paddingVertical: 0,
  },
  greeting: {
    color: '#999',
    fontWeight: 'bold',
  },
});