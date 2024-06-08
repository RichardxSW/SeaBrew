import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';

const QuantitySelector = ({ quantity, onIncrease, onDecrease }) => (
  <View style={styles.quantitySelector}>
    <TouchableOpacity style={styles.quantityButton} onPress={onDecrease}>
      <Text style={styles.quantityButtonText}>-</Text>
    </TouchableOpacity>
    <View style={styles.quantityBox}>
      <Text style={styles.quantityText}>{quantity}</Text>
    </View>
    <TouchableOpacity style={styles.quantityButton} onPress={onIncrease}>
      <Text style={styles.quantityButtonText}>+</Text>
    </TouchableOpacity>
  </View>
);

const CartItem = ({ item, onIncrease, onDecrease }) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemDetails}>
      <View style={styles.itemImagePlaceholder}></View>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Rp. {item.price}</Text>
      </View>
    </View>
    <QuantitySelector
      quantity={item.quantity}
      onIncrease={() => onIncrease(item.id)}
      onDecrease={() => onDecrease(item.id)}
    />
  </View>
);

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Americano', price: 38000, quantity: 3 },
    { id: '2', name: 'Frappuccino', price: 47000, quantity: 2 },
    { id: '3', name: 'Choco Cappuccino Set', price: 190000, quantity: 2 },
    { id: '4', name: 'Weekday Regular', price: 120500, quantity: 6 },
  ]);

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
            <CartItem item={item} onIncrease={handleIncrease} onDecrease={handleDecrease} />
          )}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.metodeContainer}>
          <Text style={styles.summaryText}>Metode Pembayaran: Gopay (Rp2.500.000)</Text>
        </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>Total Harga ({totalItems} Barang): Rp. {totalPrice}</Text>
          <Text style={styles.summaryText}>Biaya Aplikasi: Rp. {applicationFee}</Text>
          <Text style={styles.totalAmount}>Total Tagihan: Rp. {totalAmount}</Text>
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
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'MontserratMedium',
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
    fontFamily: 'MontserratMedium',
  },
  itemPrice: {
    fontSize: 14,
    color: '#757575',
    fontFamily: 'MontserratMedium',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 4,
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  quantityButtonText: {
    fontSize: 20,
    color: '#1E90FF',
  },
  quantityBox: {
    width: 40,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    marginHorizontal: 8,
  },
  quantityText: {
    fontSize: 16,
    color: '#000000',
  },
  metodeContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginTop: 16,
  },
  summaryContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginTop: 16,
  },
  summaryText: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'MontserratMedium',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    fontFamily: 'MontserratMedium',
  },
  buyButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'MontserratMedium',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default Cart;
