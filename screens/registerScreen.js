// screens/RegisterScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, TextInput, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from 'react-native-vector-icons';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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
      const auth = getAuth();
      const db = getFirestore();

      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          // Save user data to Firestore
          try {
            await setDoc(doc(db, "users", user.uid), {
              fullName,
              email,
              username,
            });
            Alert.alert('Success', 'User registered successfully!');
            navigation.navigate('Login');
          } catch (error) {
            console.error('Error saving user data:', error);
            Alert.alert('Error', 'Failed to save user data.');
          }
        })
        .catch((error) => {
          console.error('Error creating user:', error);
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
          <Text style={styles.titletext}>Register</Text>

          <View style={styles.inputContainer}>
            <FontAwesome name="address-card" size={21} color="#375A82" style={styles.ficonStyle} />
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

          <TouchableOpacity style={styles.buttonRegisContainer} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <Text style={styles.bottomtext}>Already have an account?</Text>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Login</Text>
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
    marginTop: 25,
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
    marginRight: 12,
    marginTop: 3,
    marginLeft: -2,
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
    alignSelf: 'flex-start',
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
    borderColor: '#70B5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 12,
    color: '#375A82',
    fontFamily: 'Montserrat',
  },
});
