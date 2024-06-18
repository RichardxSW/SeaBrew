import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground, Alert } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, onSnapshot, updateDoc } from 'firebase/firestore';

const MerchandisePage = () => {
  const [points, setPoints] = useState(0);
  const [rewards, setRewards] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const userPointsRef = doc(db, `points/${user.uid}`);
      const unsubscribe = onSnapshot(userPointsRef, (doc) => {
        if (doc.exists()) {
          setPoints(doc.data().points);
        }
      });

      return () => unsubscribe();
    }
  }, [db, user]);

  useEffect(() => {
    if (isFocused && user) {
      const userPointsRef = doc(db, `points/${user.uid}`);
      const updatePoints = async () => {
        try {
          await updateDoc(userPointsRef, { points });
        } catch (error) {
          console.error('Error updating points:', error);
        }
      };

      updatePoints();
    }
  }, [isFocused, points, db, user]);

  const merchandise = [
    { id: 1, name: 'Merchandise 1', points: 500, image: require('../assets/merchandise/hiu1.png') },
    { id: 2, name: 'Merchandise 2', points: 500, image: require('../assets/merchandise/hiu1.png') },
    { id: 3, name: 'Merchandise 3', points: 500, image: require('../assets/merchandise/hiu2.png') },
    { id: 4, name: 'Merchandise 4', points: 500, image: require('../assets/merchandise/hiu2.png') },
    { id: 5, name: 'Merchandise 5', points: 500, image: require('../assets/merchandise/paus.png') },
    { id: 6, name: 'Merchandise 6', points: 500, image: require('../assets/merchandise/paus.png') },
  ];

  const handleExchange = (itemPoints, item) => {
    if (points >= itemPoints) {
      setPoints(points - itemPoints);
      setRewards([...rewards, item]);
      alert('Exchange successful!');
    } else {
      alert('Not enough points!');
    }
  };

  const handlePress = (item) => {
    navigation.navigate('MerchandiseDetail', { item, points, onExchange: handleExchange });
  };

  return (
    <ImageBackground source={require('../assets/Background.png')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.title}>Points Exchange</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.buttonText}>Points Exchange</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MerchandiseReward', { rewards })}>
              <Text style={styles.buttonText}>My Reward</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.totalPoints}>Total Points: {points} Points</Text>
          <View style={styles.merchandiseContainer}>
            {merchandise.map((item) => (
              <TouchableOpacity key={item.id} style={styles.merchandiseItem} onPress={() => handlePress(item)}>
                <Image source={item.image} style={styles.image} />
                <Text>{item.name}</Text>
                <Text>{item.points} Points</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPoints: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  merchandiseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  merchandiseItem: {
    width: '45%',
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default MerchandisePage;
