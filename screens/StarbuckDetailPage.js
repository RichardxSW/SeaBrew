import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import backgroundImage from '../assets/bgSbuck.png';
import { FontAwesome } from 'react-native-vector-icons';
import Data from '../assets/data/sbuckdata.js';

const StarbuckDetailPage = ({ route }) => {
  const { item } = route.params;
//   const item = Data.find((item) => item.id === id);

  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <FontAwesome name="angle-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Detail</Text>
        </View>
        <View style={styles.product}>
          <Image
            source={item.image} // Use the image from the item object
            style={styles.productImage}
          />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <View style={styles.productOptions}>
              <Text style={styles.productOptionTitle}>Ice / Hot</Text>
              <View style={styles.productOptionButtons}>
                <TouchableOpacity style={styles.productOptionButton}>
                  <Text style={styles.productOptionButtonText}>Ice</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.productOptionButton}>
                  <Text style={styles.productOptionButtonText}>Hot</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.productOptions}>
              <Text style={styles.productOptionTitle}>Size</Text>
              <View style={styles.productOptionButtons}>
                <TouchableOpacity style={styles.productOptionButton}>
                  <Text style={styles.productOptionButtonText}>S</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.productOptionButton}>
                  <Text style={styles.productOptionButtonText}>M</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.productOptionButton}>
                  <Text style={styles.productOptionButtonText}>L</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity style={styles.quantityButton} onPress={handleDecrement}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityInput}>{quantity}</Text>
              <TouchableOpacity style={styles.quantityButton} onPress={handleIncrement}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.addToCartButton}>
              <Text style={styles.addToCartButtonText}>Add To Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#f0f0f0',
  },
  backButton: {
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
  product: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productDetails: {
    marginLeft: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#333',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  productOptions: {
    marginTop: 15,
  },
  productOptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productOptionButtons: {
    flexDirection: 'row',
    marginTop: 5,
},
  productOptionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginRight: 10,
  },
  productOptionButtonText: {
    fontSize: 14,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 16,
  },
  quantityInput: {
    width: 40,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default StarbuckDetailPage;