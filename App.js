import React, { useContext, createContext, useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CounterContext = createContext(0);

const useCounter = () => {
  useContext(CounterContext);
};

const CounterProvider = ({ children }) => {
  const [counter, setCounter] = useState(0);

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
    <CounterContext.Provider value={{ counter, increment, decrement }}>
      {children}
    </CounterContext.Provider>
  );
}


export default function App() {
  const { counter, increment, decrement } = useCounter();

  return (
    <CounterProvider>
      <View>
        <Text>{counter}</Text>
        <Button title="Increment" onPress={increment} />
        <Button title="Decrement" onPress={decrement} />
      </View>
    </CounterProvider>
  );
}
