import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Confirmation = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/confirm.gif')} style={styles.image} />
      <Text style={styles.text}>Payment Successful</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Back to Home Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Set background color to #375A82
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'MontserratBold',
    marginBottom: 20,
    color: '#375A82', // Set text color to white
  },
  button: {
    backgroundColor: '#375A82', // Set button background color to transparent
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff', // Set text color to white
    fontSize: 16,
    fontFamily: 'MontserratSemiBold', // Set font family to Montserrat
  },
});

export default Confirmation;