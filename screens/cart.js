import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, arrayRemove, collection, addDoc, setDoc, arrayUnion, onSnapshot, deleteDoc } from 'firebase/firestore';

const CartItem = ({ item, onIncrease, onDecrease }) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemDetails}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDetail}>Type: {item.type}</Text>
        <Text style={styles.itemDetail}>Size: {item.size}</Text>
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
      <TouchableOpacity style={styles.quantityButton} onPress={() => onDecrease(item.id)}>
        <Text style={styles.quantityButtonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantityInput}>{item.quantity}</Text>
      <TouchableOpacity style={styles.quantityButton} onPress={() => onIncrease(item.id)}>
        <Text style={styles.quantityButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [balance, setBalance] = useState(0);
  const [showEmptyCartButton, setShowEmptyCartButton] = useState(false);
  const navigation = useNavigation();
  const db = getFirestore();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const unsubscribe = onSnapshot(doc(db, `carts/${user.uid}`), (snapshot) => {
        const userData = snapshot.data();
        const bundleItems = userData?.bundle || [];
        const itemsInBundle = userData?.items || [];
        const tickets = userData?.tickets || [];
        const userBalance = userData?.balance || 10000000;

        const allItems = [...bundleItems, ...itemsInBundle, ...tickets].map((item, index) => ({
          id: `${item.name}-${index}`,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          date: item.date,
          type: item.type,
          size: item.size,
        }));

        setCartItems(allItems);
        setBalance(userBalance);
      });

      return () => unsubscribe();
    }
  }, [db]);

  const handleIncrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = async (id) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
      );

      const itemToDelete = updatedItems.find((item) => item.id === id && item.quantity === 0);

      if (itemToDelete) {
        deleteItemFromFirebase(itemToDelete);
      }

      return updatedItems;
    });
  };

  const deleteItemFromFirebase = async (itemToDelete) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const cartRef = doc(db, `carts/${user.uid}`);
      try {
        const cartSnapshot = await getDoc(cartRef);
        const cartData = cartSnapshot.data();
        
        // Filter items, bundles, and tickets
        const updatedItems = cartData.items.filter(item => item.name !== itemToDelete.name);
        const updatedBundles = cartData.bundle.filter(bundleItem => bundleItem.name !== itemToDelete.name);
        const updatedTickets = cartData.tickets.filter(ticket => ticket.name !== itemToDelete.name);
        
        await updateDoc(cartRef, { items: updatedItems, bundle: updatedBundles, tickets: updatedTickets });
      } catch (error) {
        console.error('Error deleting item from Firebase:', error);
      }
    }
  };

  const handleBuyNow = async () => {
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const applicationFee = 1000;
    const totalAmount = totalPrice + applicationFee;

    if (balance >= totalAmount) {
      const newBalance = balance - totalAmount;

      const getDayName = (date) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days[date.getDay()];
      };
      const today = new Date();
      const formattedDate = `${getDayName(today)} ${getMonthName(today)} ${today.getDate()} ${today.getFullYear()}`;

      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        try {
          const userHistoryRef = doc(db, `history/${user.uid}`);
          const purchaseData = {
            items: cartItems.map(item => ({
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              totalAmount: totalAmount,
              date: item.date || formattedDate,
              type: item.type,
              size: item.size,
            })),
          };

          const userHistoryDoc = await getDoc(userHistoryRef);

          if (userHistoryDoc.exists()) {
            await updateDoc(userHistoryRef, {
              purchases: arrayUnion(purchaseData),
            });
          } else {
            await setDoc(userHistoryRef, { purchases: [purchaseData] });
          }

          const userCartDocRef = doc(db, `carts/${user.uid}`);
          await updateDoc(userCartDocRef, {
            bundle: [],
            items: [],
            tickets: [],
            balance: newBalance,
          });

          // Calculate total points
          const totalPoints = cartItems.reduce((sum, item) => sum + item.points * item.quantity, 0);

          // Update points in Firestore
          const userPointsRef = doc(db, `points/${user.uid}`);
          const userPointsDoc = await getDoc(userPointsRef);

          if (userPointsDoc.exists()) {
            await updateDoc(userPointsRef, {
              points: userPointsDoc.data().points + totalPoints,
            });
          } else {
            await setDoc(userPointsRef, { points: totalPoints });
          }

          navigation.navigate('ConfirmationScreen');
        } catch (error) {
          console.error('Error processing purchase:', error);
        }
      }
    } else {
      Alert.alert('Insufficient Balance', 'You do not have enough balance to make this purchase.');
    }
  };

  const getDayName = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  const getMonthName = (date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[date.getMonth()];
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const applicationFee = 1000;
  const totalAmount = totalPrice + applicationFee;

  const handleEmptyCart = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const cartRef = doc(db, `carts/${user.uid}`);
      try {
        await deleteDoc(cartRef);
        setCartItems([]);
        setShowEmptyCartButton(false);
      } catch (error) {
        console.error('Error emptying cart:', error);
      }
    }
  };

  return (
    <ImageBackground source={require('../assets/Background.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Cart</Text>
        {cartItems.length > 0 ? (
          <>
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
            {showEmptyCartButton && (
              <TouchableOpacity style={styles.emptyCartButton} onPress={handleEmptyCart}>
                <Text style={styles.emptyCartButtonText}>Empty Cart</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>No items in cart</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  emptyCartButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  emptyCartButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'MontserratBold',
  },
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
  itemDetail: {
    fontSize: 14,
    color: '#757575',
    fontFamily: 'Montserrat',
  },
  itemQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    paddingHorizontal: 15,
    paddingVertical: 4,
    // borderWidth: 1,
    backgroundColor: '#375A82',
    borderColor: '#ddd',
    borderRadius: 8,
  },
  quantityButtonText: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Montserrat',
  },
  quantityInput: {
    width: 30,
    textAlign: 'center',
    borderColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 5,
    paddingVertical: 8,
    fontSize: 16,
    fontFamily: 'Montserrat',
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
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    fontFamily: 'Montserrat',
    color: '#757575',
  },
});

export default Cart;
