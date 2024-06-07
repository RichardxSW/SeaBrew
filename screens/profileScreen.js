import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ImageBackground source={require('../assets/profilebg.png')} style={styles.background}>
        <View style={styles.innerContainer}>

          <View style={styles.headerContainer}>
            <Text style={styles.titletext}>My Profile</Text>

            <TouchableOpacity 
              style={styles.logoutButton} 
              onPress={() => navigation.navigate('Login')}
            >
              <FontAwesome name="sign-out" size={30} color="#375A82" />
            </TouchableOpacity>
          </View>

          <View style={styles.avatarContainer}>
            <FontAwesome name="user" size={100} color="#375A82" style={styles.avatarIcon} />
          </View>
          
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={30} color="#375A82" style={styles.iconStyle} />
            <Text style={styles.text}>tanjaya123</Text>
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome name="address-card" size={21} color="#375A82" style={styles.ficonStyle} />
            <Text style={styles.text}>Tanjaya Jason Winata</Text>
          </View>

          <View style={styles.emailInputContainer}>
            <FontAwesome name="envelope" size={24} color="#375A82" style={styles.iconStyle} />
            <Text style={styles.emailtext}>tanjaya123@gmail.com</Text>
          </View>

          <TouchableOpacity style={styles.buttonEditContainer}
            // onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
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

  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 60, // half of width or height
    borderWidth: 8,
    borderColor: '#375A82',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    marginTop: -90,
  },

  avatarIcon: {
    fontSize: 60,
  },

  headerContainer: {
    position: 'absolute',
    top: 50, // Ubah nilai top di sini
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
},

  titletext: {
    fontSize: 24,
    fontWeight: '100',
    color: '#375A82',
    fontFamily: 'Montserrat',
  },

  logoutButton: {
    position: 'absolute',
    right: 20,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%', // Changed to 100%
    height: 60,
    marginVertical: 10,
    paddingLeft: 40,
    paddingHorizontal: 10,
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
    width: '100%', // Changed to 100%
    height: 60,
    marginVertical: 8,
    paddingLeft: 39,
    paddingHorizontal: 10,
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

  text: {
    flex: 1,
    color: '#375A82',
    fontFamily: 'Montserrat',
    fontSize: 15,
  },

  emailtext: {
    flex: 1,
    color: '#375A82',
    fontFamily: 'Montserrat',
    fontSize: 15,
    marginLeft: 2.5,
  },

  buttonEditContainer: {
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
    fontFamily: 'Montserrat',
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
    marginRight: 10,
    marginTop: 4,
  },
});
