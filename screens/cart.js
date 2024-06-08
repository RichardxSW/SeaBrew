import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const CartItem = ({ item, onIncrease, onDecrease }) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemDetails}>
      <View style={styles.itemImagePlaceholder}></View>
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

  useEffect(() => {
    const fetchCartItems = async () => {
      const db = getFirestore();
      const cartsCollection = collection(db, 'carts');
      const querySnapshot = await getDocs(cartsCollection);
  
      const items = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const bundle = data.bundle;
        const itemsInBundle = data.items;
        const tickets = data.tickets;
  
        // Process bundle data
        bundle.forEach((bundleItem) => {
          items.push({
            id: bundleItem.id,
            name: bundleItem.name,
            price: bundleItem.price,
            quantity: bundleItem.quantity,
            date: bundleItem.date,
          });
        });
  
        // Process items data
        itemsInBundle.forEach((item) => {
          items.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            date: item.date,
          });
        });
  
        // Process tickets data
        tickets.forEach((ticket) => {
          items.push({
            id: ticket.id,
            name: ticket.name,
            price: ticket.price,
            quantity: ticket.quantity, // Assuming ticket count is the quantity
            date: ticket.date,
          });
        });
      });
  
      setCartItems(items);
      setLoading(false);
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
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
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
              item={item} 
              onIncrease={handleIncrease} 
              onDecrease={handleDecrease} // Menyertakan fungsi handleDecrease sebagai prop
            />
          )}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.metodeContainer}>
          <Text style={styles.summaryText}>Payment Method:{'\n'}Gopay (IDR 2.500.000)</Text>
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>Total Price ({totalItems} Items): IDR {totalPrice.toLocaleString()}</Text>
          <Text style={styles.summaryText}>Application Fee: IDR {applicationFee.toLocaleString()}</Text>
          <Text style={styles.totalAmount}>Total Amount: IDR {totalAmount.toLocaleString()}</Text>

          <TouchableOpacity style={styles.buyButton}>
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
    fontWeight: 'bold',
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
  },
  itemPrice: {
    fontSize: 14,
    color: '#757575',
  },
  itemQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  metodeContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20
  },
  summaryContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 55
  },
  summaryText: {
    fontSize: 14,
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});


export default Cart;
