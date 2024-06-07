import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';

export default function EditProfileScreen({ navigation }) {
  const [username, setUsername] = useState('tanjaya123');
  const [email, setEmail] = useState('tanjaya123@gmail.com');
  const [fullname, setFullName] = useState('Tanjaya Jason Winata');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ImageBackground source={require('../assets/profilebg.png')} style={styles.background}>
        <View style={styles.innerContainer}>

          <Text style={styles.titletext}>Edit Profile</Text>

          <View style={styles.avatarContainer}>
            <FontAwesome name="user" size={100} color="#375A82" style={styles.avatarIcon} />
          </View>
          
          <Text style={styles.labelText}>Username</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              defaultValue={username}
              placeholder='Username'
              placeholderTextColor="rgba(55, 90, 130, 0.5)"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
          </View>

          <Text style={styles.labelText}>Full Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              defaultValue={fullname}
              placeholder='Full Name'
              placeholderTextColor="rgba(55, 90, 130, 0.5)"
              value={fullname}
              onChangeText={(text) => setFullName(text)}
            />
          </View>

          <Text style={styles.labelText}>Email</Text>
          <View style={styles.emailInputContainer}>
            <TextInput
              style={styles.input}
              defaultValue={email}
              placeholder='Email'
              placeholderTextColor="rgba(55, 90, 130, 0.5)"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />
          </View>

          <TouchableOpacity style={styles.buttonContainer}
            // onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonContainer}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.buttonText}>Cancel</Text>
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
    marginBottom: 50,
    marginTop: -10,
  },

  avatarIcon: {
    fontSize: 60,
  },

  titletext: {
    position: 'relative',
    marginBottom: 50,
    marginTop: -100,
    fontSize: 24,
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

  labelText: {
    alignSelf: 'flex-start', // Rata kiri agar sejajar dengan sisi kiri input box password
    marginLeft: '15%',
    color: '#375A82',
    fontFamily: 'Montserrat',
    marginTop: 10,
    marginBottom: -7,
  },

  input: {
    flex: 1,
    color: '#375A82',
    fontFamily: 'Montserrat',
  },

  buttonContainer: {
    width: '70%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 30,
    marginBottom: 5,
    paddingVertical: 10,
    backgroundColor: '#70B5F9',
  },

  buttonText: {
    textAlign: 'center',
    color: '#375A82',
    fontSize: 14,
    fontFamily: 'Montserrat',
  },
});
