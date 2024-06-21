import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native';
import backgroundImage from '../assets/Background-putih.png';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import CurrencyInput from 'react-native-currency-input';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const StarbuckDetailPage = ({ route }) => {
  const { item } = route.params;

  const Type = [
    { label: 'Ice     ', value: 'Ice' },
    { label: 'Hot', value: 'Hot' }
  ];

  const Size = [
    { label: 'Small', value: 'Small' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Large', value: 'Large' }
  ];

  const [selectedType, setSelectedType] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [hasAddedToCart, setHasAddedToCart] = useState(false);

  // Calculate discounted price per item (handling the case where item.disc is not defined)
  const discountedPrice = item.disc ? item.price - item.price * 0.3 : item.price;

  // Calculate subtotal based on discounted price and quantity
  const subtotalPrice = discountedPrice * quantity;

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert('You need to be logged in to add items to the cart');
      return;
    }
  
    const db = getFirestore();
  
    try {
      const cartRef = doc(db, 'carts', user.uid);
      const cartSnapshot = await getDoc(cartRef);
      let cartData;
  
      if (cartSnapshot.exists()) {
        cartData = cartSnapshot.data();
      } else {
        cartData = {};
      }
  
      if (!cartData.hasOwnProperty('items')) {
        cartData.items = [];
      }
  
      const currentDate = new Date().toDateString();
      const existingItemIndex = cartData.items.findIndex(
        (cartItem) =>
          cartItem.name === item.name &&
          cartItem.dateAdded === currentDate &&
          cartItem.type === selectedType &&
          cartItem.size === selectedSize
      );
  
      if (existingItemIndex !== -1) {
        cartData.items[existingItemIndex].quantity += quantity;
      } else {
        const newItem = {
          name: item.name || null,
          price: discountedPrice || null,
          quantity: quantity || null,
          dateAdded: currentDate,
          size: selectedSize || null,
          type: selectedType || null,
          points: item.points || null,
        };
        cartData.items.push(newItem);
      }
  
      await setDoc(cartRef, cartData);
      resetForm();
      setHasAddedToCart(true);
  
      setSelectedType('');
      setSelectedSize('');
      setQuantity(0);
  
      alert('Item added to cart successfully!');
    } catch (error) {
      console.error('Error adding item to cart: ', error);
      alert('Error adding item to cart: ' + error.message);
    }
  };  

  const resetForm = () => {
    setSelectedType('');
    setSelectedSize('');
  };

  const resetAll = () => {
    setQuantity(0);
    setSelectedType('');
    setSelectedSize('');
    setHasAddedToCart(false);
  };

  const hasDiscount = (item) => {
    return item.disc === true; // Check the 'disc' property instead of comparing 'originalPrice' and 'price'
  };

  const isFormValid = () => {
    return (selectedType && selectedSize && quantity > 0) || (hasAddedToCart && quantity > 0);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.product}>
            <Image
              source={item.image}
              style={styles.productImage}
            />
            <View style={styles.productDetails}>
              <View style={styles.productNameContainer}>
                <Text style={styles.productName}>{item.name}</Text>
                <View style={styles.productPriceContainer}>
                {hasDiscount(item) ? (
                <>
                  <Text style={[styles.itemPriceOriginal, styles.strikethrough]}>
                    IDR {item.price.toLocaleString()}
                  </Text>
                  <CurrencyInput
                    style={styles.productPrice}
                    value={item.price - item.price * 0.3} // Assuming a 10% discount
                    prefix="IDR "
                    delimiter="."
                    separator=","
                    precision={0}
                    editable={false}
                  />
                </>
              ) : (
                <CurrencyInput
                  style={styles.productPrice}
                  value={item.price}
                  prefix="IDR "
                  delimiter="."
                  separator=","
                  precision={0}
                  editable={false}
                />
              )}
              </View>
              </View>
              <Text style={styles.productDescription}>{item.desc}</Text>
              <View style={styles.grayLine} />

              {/* Ice / Hot options */}
              <View style={styles.productOptions}>
                <Text style={styles.productOptionTitle}>Ice / Hot</Text>
                <RadioForm
                  radio_props={Type}
                  initial={-1}
                  onPress={(value) => {
                    setSelectedType(value);
                    setHasAddedToCart(false);
                  }}
                  formHorizontal={true} // Set to true for horizontal layout
                  labelHorizontal={true}
                  buttonColor={'#4DC3FC'}
                  selectedButtonColor={'#4DC3FC'}
                  animation = {true}
                  style={styles.radioForm}
                />
              </View>

              <View style={styles.grayLine} />

              {/* Size options */}
              <View style={styles.productOptions}>
                <Text style={styles.productOptionTitle}>Size</Text>
                <RadioForm
                  radio_props={Size}
                  initial={-1}
                  onPress={(value) => {
                    setSelectedSize(value);
                    setHasAddedToCart(false);
                  }}
                  formHorizontal={true} // Set to true for horizontal layout
                  labelHorizontal={true}
                  buttonColor={'#4DC3FC'}
                  selectedButtonColor={'#4DC3FC'}
                  style={styles.radioForm}
                />
              </View>

              <View style={styles.grayLine} />

              {/* Quantity and Add to Cart */}
              <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.quantityButton} onPress={handleDecrement}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityInput}>{quantity}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={handleIncrement}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </ScrollView>

        {/* Reset Button */}
        {quantity > 0 && (
          <TouchableOpacity style={styles.resetButton} onPress={resetAll}>
            <Text style={styles.resetButtonText}>Reset All</Text>
          </TouchableOpacity>
        )}

        {/* Add to Cart Button */}
        <TouchableOpacity style={[styles.addToCartButton, { backgroundColor: isFormValid() ? '#375A82' : '#ccc' }]} 
          disabled={!isFormValid()} 
          onPress={addToCart}
        >
          <Text style={styles.addToCartButtonText}>
            Add to Cart - IDR { (subtotalPrice).toLocaleString('id-ID') }
          </Text>
        </TouchableOpacity>

      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 140, // Adjust this value as needed
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  product: {
    marginTop: 60,
    flexDirection: 'column',
    alignItems: 'center',
  },
  productImage: {
    width: 170,
    height: 170,
    marginBottom: 20,
  },
  productDetails: {
    marginHorizontal: 20,
  },
  productNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 20,
    fontFamily: 'MontserratBold',
  },
  productPriceContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 18,
    fontFamily: 'MontserratSemiBold',
    color: '#4DC3FC',
  },
  itemPriceOriginal: {
    fontSize: 18,
    color: '#4DC3FC',
    textAlign: 'left',
    textDecorationLine: 'line-through',
    // marginBottom: 20,
    fontFamily: 'MontserratBold',
  },
  strikethrough: {
    textDecorationStyle: 'solid',
  },
  productDescription: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    color: '#999',
    marginTop: 10,
    marginBottom: 15,
  },
  productOptions: {
    marginTop: 15,
    paddingBottom: 10,
    borderBottomColor: '#999',
    borderBottomWidth: 1,
  },
  productOptionTitle: {
    fontSize: 16,
    fontFamily: 'MontserratBold',
  },
  productOptionButtons: {
    flexDirection: 'row',
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  radioForm: {
    marginTop: 10, // Adjust as needed
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    gap: 20,
  },  
  quantityButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    backgroundColor: '#375A82',
    // borderColor: '#ddd',
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 16,
    color: 'white',
  },
  quantityInput: {
    width: 40,
    textAlign: 'center',
    borderColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
  resetButton: {
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 5,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'MontserratSemiBold',
  },
  addToCartButton: {
    backgroundColor: '#375A82',
    padding: 15,
    borderRadius: 5,
    alignSelf: 'stretch',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'MontserratSemiBold',
  },
});

export default StarbuckDetailPage;
