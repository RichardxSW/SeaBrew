import React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen({ navigation }) {
  return (
    // <ImageBackground source={require('../assets/Background.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.text}>Login</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Login"
            // onPress={() => navigation.navigate('Main')}
            color="#375A82"
          />
        </View>
        <StatusBar style="auto" />
      </View>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    position: 'absolute',
    top: 110,  // Adjust this value to position the text vertically
    textAlign: 'center',
    fontSize: 40,
    fontWeight: '100',
    color: '#375A82',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20, // tambahkan margin atas agar tombol tidak terlalu dekat dengan teks
    paddingVertical: 10, // tambahkan padding vertikal agar tombol lebih terlihat
  },
});
