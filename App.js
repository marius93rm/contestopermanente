import React, { useContext, createContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CounterContext = createContext(0);

const CounterProvider = ({ children }) => {
  const [counter, setCounter] = useState(0);

  const test = () => {
    Alert.alert('test');
  };
  const increment = () => setCounter((c) => c + 1);
  const decrement = () => setCounter((c) => c - 1);

  useEffect(() => {
    AsyncStorage.setItem('counter', counter.toString());
  }, [counter]); // only run when counter changes

  useEffect(() => {
    AsyncStorage.getItem('counter').then((counter) => {
      if (counter) {
        setCounter(parseInt(counter));
      }
    });
  }, []); // <-- empty array means "run this only once"

  return (
    <CounterContext.Provider value={{ counter, increment, decrement, test }}>
      {children}
    </CounterContext.Provider>
  );
}

export default function App() {
  const { counter, increment, decrement, test } = useContext(CounterContext);

  return (
    <CounterProvider>
      <View style={styles.container}>
        <Text>{counter} -</Text>
        <Button title="Increment" onPress={increment} />
        <Button title="Decrement" onPress={decrement} />
        <Button title="Test" onPress={test} />
      </View>
    </CounterProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems : 'center',
    justifyContent: 'center',
  },
});
