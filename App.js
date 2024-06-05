import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SplashScreen from './screen/splashScreen';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load any resources or data that you need prior to rendering the app
        await new Promise(resolve => setTimeout(resolve, 2100)); // Simulating a delay
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Welcome to SeaBrew!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
