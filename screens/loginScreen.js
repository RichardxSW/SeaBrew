import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen({ navigation }) {
  return (
    <ImageBackground source={require('../assets/Background.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.titletext}>Login</Text>

        <TouchableOpacity style={styles.buttonLoginContainer}
          // onPress={() => navigation.navigate('Main')}
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
  titletext: {
    position: 'absolute',
    top: 110,
    textAlign: 'center',
    fontSize: 40,
    fontWeight: '100',
    color: '#375A82',
    marginBottom: 20,
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
