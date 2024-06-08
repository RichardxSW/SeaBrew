import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, TextInput, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfileScreen({ navigation }) {
  const [username, setUsername] = useState('tanjaya123');
  const [email, setEmail] = useState('tanjaya123@gmail.com');
  const [fullname, setFullName] = useState('Tanjaya Jason Winata');
  const [profileImage, setProfileImage] = useState(null);

  const handleSaveChanges = () => {
    if (!username || !fullname || !email) {
      Alert.alert('Error', 'Please fill in all required fields.');
    } else {
      const newData = { newUsername: username, newEmail: email, newFullname: fullname };
      // Simulate data sending
      // console.log('Data to be sent:', newData);
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
      console.log('Image URI:', result.assets[0].uri); // Log the URI
      setProfileImage(result.assets[0].uri);
    } else {
      console.log('Image picking canceled');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ImageBackground source={require('../assets/profilebg.png')} style={styles.background}>
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

          <TouchableOpacity style={styles.buttonContainer} onPress={handleSaveChanges}>
            <Text style={styles.buttonText}>Save Changes</Text>
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
