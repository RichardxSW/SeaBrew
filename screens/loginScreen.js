import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, TextInput, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from 'react-native-vector-icons';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email && !password) {
      Alert.alert('Error', 'Please enter both email and password.');
    } else if (!email) {
      Alert.alert('Error', 'Please enter your email.');
    } else if (!password) {
      Alert.alert('Error', 'Please enter your password.');
    } else {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          // console.log('Logged in with user:', user);
          navigation.navigate('Navbar');
        })
        .catch((error) => {
          Alert.alert('Error', error.message);
        });
    }
  };

  const forgetPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email to reset password.');
    } else {
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          Alert.alert('Password reset email sent.');
        })
        .catch((error) => {
          Alert.alert('Error', error.message);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ImageBackground source={require('../assets/Background.png')} style={styles.background}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.titletext}>Login</Text>

            <View style={styles.inputContainer}>
              <FontAwesome name="envelope" size={24} color="#375A82" style={styles.ficonStyle} />
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

            <TouchableOpacity onPress={forgetPassword} 
              style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonLoginContainer} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* <Text style={styles.text}>Or Sign In With</Text>

            <TouchableOpacity style={styles.buttonGoogleContainer}>
              <Image
                source={require('../assets/googleicon.png')}
                style={styles.iconStyle}
              />
              <Text style={styles.buttonText}>Google</Text>
            </TouchableOpacity> */}

            <Text style={styles.bottomtext}>Don't have an account?</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
          </View>
        </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titletext: {
    position: 'relative',
    marginTop: 20,
    marginBottom: 80,
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
    fontFamily: 'Montserrat',
  },
  buttonLoginContainer: {
    width: '70%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 30,
    marginBottom: 60,
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
    flexDirection: 'row',
    alignItems: 'center',
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
  ficonStyle: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 14,
    marginLeft: -4,
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
  registerText: {
    marginTop: 5,
    textAlign: 'center',
    color: '#375A82',
    fontFamily: 'Montserrat',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-start',
    marginLeft: '15%',
  },
  forgotPasswordText: {
    color: '#375A82',
    fontSize: 14,
    fontFamily: 'Montserrat',
    textDecorationLine: 'underline',
  },
});
