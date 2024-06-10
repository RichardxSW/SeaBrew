import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDoc, doc } from 'firebase/firestore';

const CartItem = ({ item, onIncrease, onDecrease }) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemDetails}>
      {/* <View style={styles.itemImagePlaceholder}></View> */}
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <CurrencyInput
          style={styles.itemPrice}
          value={item.price}
          prefix="IDR "
          delimiter="."
          separator=","
          precision={0}
          editable={false}
        />
      </View>
    </View>
    <View style={styles.itemQuantity}>
      <Button title="-" onPress={() => onDecrease(item.id)} />
      <Text style={styles.quantityText}>{item.quantity}</Text>
      <Button title="+" onPress={() => onIncrease(item.id)} />
    </View>
  </View>
);

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0); // Initialize with 0 and fetch from Firestore

  useEffect(() => {
    const fetchCartItems = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (user) {
        try {
          const db = getFirestore();
          const userCartDocRef = doc(db, `carts/${user.uid}`);
          const userCartDocSnap = await getDoc(userCartDocRef);
  
          if (userCartDocSnap.exists()) {
            const userData = userCartDocSnap.data();
            const bundleItems = userData.bundle || [];
            const itemsInBundle = userData.items || [];
            const tickets = userData.tickets || [];
            const userBalance = userData.balance || 10000000; // Default to 10,000,000 if no balance is saved
  
            const allItems = [...bundleItems, ...itemsInBundle, ...tickets].map((item, index) => ({
              id: `${item.name}-${index}`,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              date: item.date,
            }));
  
            setCartItems(allItems);
            setBalance(userBalance);
            setLoading(false);
          } else {
            console.log("User cart does not exist");
            setLoading(false);
          }
        } catch (error) {
          console.error('Error fetching cart items:', error);
          setLoading(false);
        }
      }
    };
  
    fetchCartItems();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const handleIncrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const handleBuyNow = async () => {
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const applicationFee = 1000;
    const totalAmount = totalPrice + applicationFee;

    if (balance >= totalAmount) {
      const newBalance = balance - totalAmount;
      setBalance(newBalance);
      Alert.alert('Purchase Successful', `Your new balance is IDR ${newBalance.toLocaleString()}`);

      // Clear the cart in Firestore and update the balance
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        try {
          const db = getFirestore();
          const userCartDocRef = doc(db, `carts/${user.uid}`);
          await updateDoc(userCartDocRef, {
            bundle: [],
            items: [],
            tickets: [],
            balance: newBalance, // Save the updated balance
          });
          setCartItems([]); // Clear the cart items locally
        } catch (error) {
          console.error('Error clearing cart items:', error);
        }
      }
    } else {
      Alert.alert('Insufficient Balance', 'You do not have enough balance to make this purchase.');
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const applicationFee = 1000;
  const totalAmount = totalPrice + applicationFee;

  return (
    <ImageBackground source={require('../assets/Background.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Cart</Text>
        <FlatList
          data={cartItems}
          renderItem={({ item }) => (
            <CartItem 
              key={item.id}
              item={item} 
              onIncrease={handleIncrease} 
              onDecrease={handleDecrease} 
            />
          )}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.metodeContainer}>
          <Text style={styles.summaryText}>Payment Method:{'\n'}Gopay (IDR {balance.toLocaleString()})</Text>
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>Total Price ({totalItems} Items): IDR {totalPrice.toLocaleString()}</Text>
          <Text style={styles.summaryText}>Application Fee: IDR {applicationFee.toLocaleString()}</Text>
          <Text style={styles.totalAmount}>Total Amount: IDR {totalAmount.toLocaleString()}</Text>

          <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
            <Text style={styles.buyButtonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  title: {
    fontSize: 24,
    fontFamily: 'MontserratBold',
    marginTop: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    flex: 1,
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemImagePlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#DDDDDD',
    borderRadius: 8,
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  itemPrice: {
    fontSize: 14,
    color: '#757575',
    fontFamily: 'Montserrat',
  },
  itemQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
  metodeContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
  },
  summaryContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 55,
  },
  summaryText: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'Montserrat',
  },
  totalAmount: {
    fontSize: 16,
    fontFamily: 'MontserratBold',
    marginBottom: 16,
  },
  buyButton: {
    backgroundColor: '#375A82',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'MontserratBold',
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default Cart;
