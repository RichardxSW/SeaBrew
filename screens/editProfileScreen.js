import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, TextInput, KeyboardAvoidingView, Platform, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function EditProfileScreen({ navigation }) {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const db = getFirestore();
        const userDoc = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUsername(data.username);
          setFullName(data.fullName);
          setEmail(data.email);
          if (data.profileImageUrl) {
            setProfileImage(data.profileImageUrl);
          }
        }
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleSaveChanges = async () => {
    if (!username || !fullname || !email) {
      Alert.alert('Error', 'Please fill in all required fields.');
    } else {
      const db = getFirestore();
      const userDoc = doc(db, 'users', user.uid);
      const newData = {
        username: username,
        email: email,
        fullName: fullname,
      };

      if (profileImage) {
        const storage = getStorage();
        const response = await fetch(profileImage);
        const blob = await response.blob();
        const storageRef = ref(storage, `profileImages/${user.uid}`);
        await uploadBytes(storageRef, blob);
        const profileImageUrl = await getDownloadURL(storageRef);
        newData.profileImageUrl = profileImageUrl;
      }

      await setDoc(userDoc, newData, { merge: true });
      Alert.alert('Success', 'Changes have been saved successfully.');
    }
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera access is required to take profile pictures.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ImageBackground source={require('../assets/profilebg.png')} style={styles.background}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.innerContainer}>

            <View style={styles.avatarContainer}>
              <View style={styles.avatarBorder}>
                {profileImage ? (
                  <Image source={{ uri: profileImage }} style={styles.avatarIcon} />
                ) : (
                  <Image source={require('../assets/profilepic.jpg')} style={styles.avatarIcon} />
                )}
              </View>
              <TouchableOpacity style={styles.editIconContainer} onPress={openCamera}>
                <FontAwesome name="pencil" size={18} color="#FFFFFF" style={styles.editIcon} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.labelText}>Username</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
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
                placeholder='Email'
                placeholderTextColor="rgba(55, 90, 130, 0.5)"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
              />
            </View>

            <TouchableOpacity style={styles.buttonContainer} onPress={handleSaveChanges}>
              <Text style={styles.buttonText}>Save Changes</Text>
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
    // alignItems: 'center',
  },

  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },

  avatarContainer: {
    width: 100,
    height: 100,
    position: 'relative',
    marginBottom: 50,
    marginTop: -60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarBorder: {
    width: 116,
    height: 116,
    borderRadius: 58,
    borderWidth: 8,
    borderColor: '#375A82',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  editIconContainer: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    backgroundColor: '#70B5F9',
    borderRadius: 20,
    width: 24,
    height: 24,
    padding: 5,
  },

  editIcon: {
    fontSize: 15,
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
    alignSelf: 'flex-start',
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
    marginBottom: 70,
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
