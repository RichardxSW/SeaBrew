import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';

export default function CustomSplashScreen() {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500, // Durasi animasi dalam milidetik
      useNativeDriver: true, // Menggunakan native driver untuk meningkatkan performa
    }).start(); // Memulai animasi
  }, []);

  const circleScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 3], // Memperbesar lingkaran dari skala 1 menjadi skala 2
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, { transform: [{ scale: circleScale }] }]}>
      </Animated.View>
      <Image
          source={require('../assets/tes.png')}
          style={styles.image}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 330,
    height: 330,
    borderRadius: 165,
    backgroundColor: '#92DBFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 240,
    height: 240,
    resizeMode: 'contain',
    position: 'absolute',
  },
});
