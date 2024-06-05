import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ImageBackground source={require('../assets/Background.png')} style={styles.background}>
        <View style={styles.innerContainer}>
          <Text style={styles.titletext}>Login</Text>

          <View style={styles.inputContainer}>
            <Image source={require('../assets/usericon.png')} style={styles.iconStyle} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="rgba(55, 90, 130, 0.5)"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Image source={require('../assets/passwordicon.png')} style={styles.iconStyle} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="rgba(55, 90, 130, 0.5)"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.buttonLoginContainer}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.text}>
            Or Sign In With
          </Text>

          <TouchableOpacity style={styles.buttonGoogleContainer}>
            <Image
              source={require('../assets/googleicon.png')} // Ubah path gambar sesuai dengan lokasi dan nama file gambar Anda
              style={styles.iconStyle} // Style untuk mengatur ukuran dan posisi ikon
            />
            <Text style={styles.buttonText}>Google</Text>
          </TouchableOpacity>

          <StatusBar style="auto" />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },

  container: {
    flex: 1,
  },

  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  titletext: {
    position: 'absolute',
    top: 120,
    textAlign: 'center',
    fontSize: 40,
    fontWeight: '100',
    color: '#375A82',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    height: 50,
    marginVertical: 10,
    paddingLeft: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  input: {
    flex: 1,
    color: '#375A82',
  },

  buttonLoginContainer: {
    width: '70%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 50,
    marginBottom: 20,
    paddingVertical: 10,
    backgroundColor: '#70B5F9',
  },

  buttonText: {
    textAlign: 'center',
    color: '#375A82',
    fontSize: 16,
  },

  buttonGoogleContainer: {
    flexDirection: 'row', // Mengatur layout menjadi horizontal
    alignItems: 'center', // Mengatur agar ikon dan teks berada di tengah secara vertikal
    justifyContent: 'center',
    width: '40%',
    overflow: 'hidden',
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  iconStyle: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 10,
  },
  
  text: {
    textAlign: 'center',
    color: '#375A82',
    fontSize: 14,
  }
});
