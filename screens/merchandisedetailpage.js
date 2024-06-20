import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { arrayUnion, getFirestore, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const MerchandiseDetailPage = ({ route }) => {
  const { item } = route.params;
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [quantity, setQuantity] = useState(0);
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    const fetchUserPoints = async () => {
      if (!user) return;
      const db = getFirestore();
      const userPointsRef = doc(db, `points/${user.uid}`);
      const userPointsSnap = await getDoc(userPointsRef);
      const userData = userPointsSnap.data();
      if (userData) {
        setUserPoints(userData.points);
      }
    };
    fetchUserPoints();
  }, [user]);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleExchange = async () => {
    if (!user) {
      console.error('User not authenticated');
      return;
    }
  
    const db = getFirestore();
    const userPointsRef = doc(db, `points/${user.uid}`);
  
    try {
      // Get the current user points
      const userPointsSnap = await getDoc(userPointsRef);
      const userData = userPointsSnap.data();
      const currentPoints = userData.points;
  
      // Calculate total points needed for the exchange
      const totalPoints = item.points * quantity;
  
      // Check if user has enough points
      if (currentPoints >= totalPoints) {
        // Calculate new points after exchange
        const newPoints = currentPoints - totalPoints;
  
        // Update user points
        await updateDoc(userPointsRef, { points: newPoints });
  
        // Save exchanged item info to rewards collection
        const rewardsRef = doc(db, `rewards/${user.uid}`);
        const rewardsSnap = await getDoc(rewardsRef);
  
        if (rewardsSnap.exists()) {
          // If rewards document exists, check if the item already exists in rewards
          const rewardsData = rewardsSnap.data();
          const existingItem = rewardsData.rewards.find(reward => reward.id === item.id);
  
          if (existingItem) {
            // If item already exists, update its quantity
            const updatedRewards = rewardsData.rewards.map(reward =>
              reward.id === item.id
                ? { ...reward, quantity: reward.quantity + quantity }
                : reward
            );
            await updateDoc(rewardsRef, {
              rewards: updatedRewards,
            });
          } else {
            // If item does not exist, add new item to rewards
            await updateDoc(rewardsRef, {
              rewards: arrayUnion({
                id: item.id,
                name: item.name,
                image: item.image,
                quantity: quantity,
              }),
            });
          }
        } else {
          // If rewards document does not exist, create it with initial reward
          await setDoc(rewardsRef, {
            rewards: [{
              id: item.id,
              name: item.name,
              image: item.image,
              quantity: quantity,
            }],
          });
        }
  
        // Reset the quantity after successful exchange
        setQuantity(0);
  
        // Show success alert
        Alert.alert('Exchange Successful', `You have successfully exchanged ${quantity} ${item.name}(s)`);
      } else {
        console.log('Insufficient points');
      }
    } catch (error) {
      console.error('Error exchanging item:', error);
    }
  };  

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.brandName}>Seabrew</Text>
        </View>
        <Text style={styles.merchandiseName}>{item.name}</Text>
        <Text style={styles.detailText}>{item.desc}</Text>
        <Text style={styles.sizeText}>Size: {item.size}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={[styles.quantityButton, quantity === 0 && styles.disabledButton]}
            onPress={handleDecreaseQuantity}
            disabled={quantity === 0}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={handleIncreaseQuantity}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      {userPoints < item.points * quantity ? (
        <View style={[styles.exchangeButton, styles.insufficientPointsButton]}>
          <Text style={styles.insufficientPointsText}>Seabrew points not enough</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.exchangeButton, quantity === 0 && styles.disabledButton]}
          onPress={handleExchange}
          disabled={quantity === 0}>
          <Text style={styles.exchangeButtonText}>Exchange now - {item.points * quantity} Pts</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  brandName: {
    position: 'absolute',
    bottom: 10,
    left: 50,
    fontSize: 20,
    color: '#375A82',
    fontFamily: 'BigShouldersStencilBold',
  },
  merchandiseName: {
    fontSize: 24,
    fontFamily: 'MontserratBold',
    textAlign: 'left',
    marginVertical: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    textAlign: 'left',
    fontFamily: 'Montserrat',
  },
  sizeText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'left',
    fontFamily: 'MontserratSemiBold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    alignItems: 'center',
    verticalAlign: 'center',
    backgroundColor: '#375A82',
    padding: 5, // Decreased padding
    borderRadius: 5,
    width: 30, // Added width
    height: 30, // Added height
  },
  quantityButtonText: {
    color: '#fff',
    marginTop: -4,
    fontSize: 20,
    fontFamily: 'MontserratBold',
  },
  quantityText: {
    fontSize: 20,
    fontFamily: 'MontserratBold',
    marginHorizontal: 20,
  },
  exchangeButton: {
    backgroundColor: '#375A82',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  exchangeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'MontserratBold',
  },
  disabledButton: {
    backgroundColor: '#ddd',
  },
  insufficientPointsButton: {
    backgroundColor: '#ccc',
  },
  insufficientPointsText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'MontserratBold',
  },
});

export default MerchandiseDetailPage;