import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from 'react-native-vector-icons';

export default function RegisterScreen({ navigation }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);

  const handleRegister = () => {
    if (!username || !password || !fullName || !email || !agreeTerms) {
      Alert.alert('Error', 'Please fill in all required fields and agree to the terms and conditions.');
    } else {
      // Lakukan proses login jika keduanya sudah terisi
      navigation.navigate('Login');
    }
  };
  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ImageBackground source={require('../assets/Background.png')} style={styles.background}>
        <View style={styles.innerContainer}>
          <Text style={styles.titletext}>Register</Text>

          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={24} color="#375A82" style={styles.iconStyle} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="rgba(55, 90, 130, 0.5)"
              value={fullName}
              onChangeText={(text) => setFullName(text)}
            />
          </View>

          <View style={styles.emailInputContainer}>
            <FontAwesome name="envelope" size={20} color="#375A82" style={styles.iconStyle} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="rgba(55, 90, 130, 0.5)"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={24} color="#375A82" style={styles.iconStyle} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="rgba(55, 90, 130, 0.5)"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={24} color="#375A82" style={styles.iconStyle} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="rgba(55, 90, 130, 0.5)"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
          </View>

          <View style={styles.checkboxContainer}>
            <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setAgreeTerms(!agreeTerms)}
            >
                {agreeTerms && <FontAwesome name="check" size={16} color="#375A82" />}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>I agree to terms and conditions</Text>
            </View>

          <TouchableOpacity style={styles.buttonRegisContainer}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <Text style={styles.text}>
            Or Sign Up With
          </Text>

          <TouchableOpacity style={styles.buttonGoogleContainer}>
            <Image
              source={require('../assets/googleicon.png')} // Ubah path gambar sesuai dengan lokasi dan nama file gambar Anda
              style={styles.iconStyle} // Style untuk mengatur ukuran dan posisi ikon
            />
            <Text style={styles.buttonText}>Google</Text>
          </TouchableOpacity>

          <Text style={styles.bottomtext}>
            Already have an account?
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Login</Text>
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
    position: 'relative',
    marginBottom: 65,
    textAlign: 'center',
    fontSize: 40,
    fontWeight: '100',
    color: '#375A82',
    fontFamily: 'Montserrat',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    height: 50,
    marginVertical: 8,
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

  emailInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    height: 50,
    marginVertical: 8,
    paddingLeft: 19,
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
    fontFamily: 'Montserrat',
  },

  buttonRegisContainer: {
    width: '70%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 10,
    backgroundColor: '#70B5F9',
  },

  buttonText: {
    textAlign: 'center',
    color: '#375A82',
    fontSize: 16,
    fontFamily: 'Montserrat',
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
    fontFamily: 'Montserrat',
  },

  bottomtext: {
    marginTop: 70,
    textAlign: 'center',
    color: '#375A82',
    fontSize: 14,
    fontFamily: 'Montserrat',
  },

  loginText: {
    marginTop: 5,
    textAlign: 'center',
    color: '#375A82',
    fontSize: 14,
    textDecorationLine: 'underline',
    fontFamily: 'Montserrat',
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start', // Rata kiri agar sejajar dengan sisi kiri input box password
    marginLeft: '15%',
    alignItems: 'center',
    marginTop: 10,
},

checkbox: {
    width: 25,
    height: 25,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#70B5F9', // Garis border berwarna biru sesuai tema
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
},

checkboxLabel: {
    fontSize: 12,
    color: '#375A82', // Warna teks sesuai tema
    fontFamily: 'Montserrat',
},
});
