import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, ImageBackground, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import MerchandiseData from '../assets/data/merchandisedata';

const MerchandisePage = () => {
  const [points, setPoints] = useState(0);
  const [rewards, setRewards] = useState([]);
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [category, setCategory] = useState('Plushies');
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  const filteredData = MerchandiseData.filter(item => {
    if (inputValue) {
      // Jika ada nilai di kolom pencarian
      if (category === 'All' || category === '') {
        // Jika kategori adalah 'All', periksa semua item
        return item.name.toLowerCase().includes(inputValue.toLowerCase());
      } else {
        // Jika kategori tertentu dipilih, periksa nama item dan kategori
        return (
          item.name.toLowerCase().includes(inputValue.toLowerCase()) &&
          (
            (category === 'Plushies' && item.id <= 4) ||
            (category === 'Keychains' && item.id >= 5 && item.id <= 8) ||
            (category === 'Pins' && item.id >= 9)
          )
        );
      }
    } else {
      // Jika tidak ada nilai di kolom pencarian
      if (category === 'All' || category === '') return true; // Menambahkan kategori kosong sebagai "All"
      if (category === 'Plushies' && item.id <= 4) return true;
      if (category === 'Keychains' && item.id >= 5 && item.id <= 8) return true;
      if (category === 'Pins' && item.id >= 9) return true;
    }
    return false;
  });

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsTitle}>Your Points</Text>
          <Text style={styles.pointsValue}>{points} Seabrew Points</Text>
        </View>
        <View style={styles.categoryContainer}>
          <TouchableOpacity onPress={() => setCategory('Plushies')}>
            <Text style={category === 'Plushies' ? styles.categoryTextActive : styles.categoryText}>Plushies</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCategory('Keychains')}>
            <Text style={category === 'Keychains' ? styles.categoryTextActive : styles.categoryText}>Keychains</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCategory('Pins')}>
            <Text style={category === 'Pins' ? styles.categoryTextActive : styles.categoryText}>Pins</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.merchandiseContainer}>
          {filteredData.map((item) => (
            <TouchableOpacity key={item.id} style={styles.merchandiseItem} onPress={() => handlePress(item)}>
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.brandName}>Seabrew</Text>
              </View>
              <Text style={styles.mercName}>{item.name}</Text>
              <Text style={styles.mercPoint}>{item.points} Points</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 80,
    marginBottom: 10,
    paddingTop: 15,
  },
  pointsContainer: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#375A82',
    padding: 20,
    borderRadius: 10,
  },
  pointsTitle: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'MontserratBold',
  },
  pointsValue: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'MontserratSemiBold',
    marginTop: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 14,
    color: '#375A82',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: '#B3E0F5',
    borderRadius: 20,
    marginRight: 10,
    fontFamily: 'MontserratSemiBold',
  },
  categoryTextActive: {
    fontSize: 14,
    color: '#B3E0F5',
    marginRight: 10,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 20,
    backgroundColor: '#375A82',
    fontFamily: 'MontserratBold',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  brandName: {
    position: 'absolute',
    bottom: 5,
    left: 3,
    fontSize: 13,
    color: '#375A82',
    fontFamily: 'BigShouldersStencilBold',
  },
  merchandiseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  merchandiseItem: {
    width: '48%',
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  mercName: {
    fontFamily: 'MontserratBold',
    fontSize: 13,
    color: '#375A82',
    marginBottom: 5,
    textAlign: 'left'
  },
  mercPoint: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 12,
    color: '#375A82',
    textAlign: 'left'
  },
});

export default MerchandisePage;