import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useFocusEffect } from '@react-navigation/native';

export default function ProfileScreen({ navigation, route }) {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const fetchUserData = async () => {
    if (user) {
      const db = getFirestore();
      const userDoc = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData(data);
        if (data.profileImageUrl) {
          setProfileImage(data.profileImageUrl);
        }
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [user])
  );

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
            <View style={styles.avatarBorder}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.avatarIcon} />
              ) : (
                <Image source={require('../assets/profilepic.jpg')} style={styles.avatarIcon} />
              )}
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={30} color="#375A82" style={styles.iconStyle} />
            <Text style={styles.text}>{userData ? userData.username : 'Loading...'}</Text>
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome name="address-card" size={21} color="#375A82" style={styles.ficonStyle} />
            <Text style={styles.text}>{userData ? userData.fullName : 'Loading...'}</Text>
          </View>

          <View style={styles.emailInputContainer}>
            <FontAwesome name="envelope" size={24} color="#375A82" style={styles.iconStyle} />
            <Text style={styles.emailtext}>{userData ? userData.email : 'Loading...'}</Text>
          </View>

          <TouchableOpacity style={styles.buttonEditContainer}
            onPress={() => navigation.navigate('EditProfile')}
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
    position: 'relative',
    marginBottom: 50,
    marginTop: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarBorder: {
    width: 70,
    height: 70,
    borderRadius: 58,
    borderWidth: 8,
    borderColor: '#375A82',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarIcon: {
    width: 62,
    height: 62,
    borderRadius: 50,
  },

  headerContainer: {
    position: 'absolute',
    top: 40, // Ubah nilai top di sini
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
    marginBottom: 80,
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
    marginRight: 11,
    marginTop: 4,
    marginLeft: -2,
  },

  successMessage: {
    marginTop: 20,
    color: 'green',
    fontSize: 18,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
  },
});
