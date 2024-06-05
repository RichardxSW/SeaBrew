import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import History from './screens/history';

export default function App() {
  return (
    <View style={styles.container}>
      <History />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});