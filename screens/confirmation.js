import React from 'react';
import { View, Image, Text, Button, StyleSheet } from 'react-native';

const Confirmation = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/confirmation.png')} style={styles.image} />
      <Text style={styles.text}>Payment Successful</Text>
      <Button
        title="Back to Home Screen"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Confirmation;
