import React, { useState , useMemo} from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import backgroundImage from '../assets/Background-putih.png';
import { FontAwesome } from 'react-native-vector-icons';
import Data from '../assets/data/sbuckdata.js';
// import Checkbox from 'react-native-elements';
import { RadioGroup } from 'react-native-radio-buttons-group';
import CurrencyInput from 'react-native-currency-input';

const StarbuckDetailPage = ({ route }) => {
  const { item } = route.params;
//   const item = Data.find((item) => item.id === id);

  const IceorHot = useMemo(() => ([
    {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Ice',
        value: 'Ice',
        borderColor: 'black',
        color: '#4DC3FC'
    },
    {
        id: '2',
        label: 'Hot',
        value: 'Hot',
        borderColor: 'black',
        color: '#4DC3FC'
    }
  ]), []);

  const Size = useMemo(() => ([
    {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Small',
        value: 'small',
        borderColor: 'black',
        color: '#4DC3FC'
    },
    {
        id: '2',
        label: 'Medium',
        value: 'medium',
        borderColor: 'black',
        color: '#4DC3FC'
    },
    {
        id: '3',
        label: 'Large',
        value: 'large',
        borderColor: 'black',
        color: '#4DC3FC'
    }
  ]), []);

  const [selectedIceorHot, setSelectedIceorHot] = useState();

  const [selectedSize, setSelectedSize] = useState();

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
        {/* <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <FontAwesome name="angle-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Detail</Text>
        </View> */}
        <View style={styles.product}>
          <Image
            source={item.image} // Use the image from the item object
            style={styles.productImage}
          />
          <View style={styles.productDetails}>
            <View style={styles.productNameContainer}>
            <Text style={styles.productName}>{item.name}</Text>
            <CurrencyInput 
              style={styles.productPrice}
              value={item.price}
              prefix="Rp "
              delimiter="."
              separator=","
              precision={2}
              editable={false}
            />
            </View>
            {/* <Text style={styles.productDescriptionTitle}>Description</Text> */}
            <Text style={styles.productDescription}>{item.desc}</Text>

            <View style={styles.grayLine} />

            {/* Ice / Hot options */}
      <View style={styles.productOptions}>
        <Text style={styles.productOptionTitle}>Ice / Hot</Text>
        <View style={styles.productOptionButtons}>
        <RadioGroup 
            radioButtons={IceorHot} 
            onPress={setSelectedIceorHot}
            selectedId={selectedIceorHot}
            layout='row'
        />
        </View>
      </View>

      <View style={styles.grayLine} />

      {/* Size options */}
      <View style={styles.productOptions}>
        <Text style={styles.productOptionTitle}>Size</Text>
        <View style={styles.productOptionButtons}>
        <RadioGroup 
            radioButtons={Size} 
            onPress={setSelectedSize}
            selectedId={selectedSize}
            layout='row'
        />
        </View>
      </View>

      <View style={styles.grayLine} />

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
    // backgroundColor: '#f0f0f0', // Light background color
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  // grayLine: {
  //   height: 1, // Set the height of the line
  //   backgroundColor: 'gray', // Gray color (you can customize this)
  //   width: '100%', // Make the line span the entire width of the container
  //   marginTop: 10, // Add some margin above the line (optional)
  //   marginBottom: 10, // Add some margin below the line (optional)
  // },
  // header: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   paddingHorizontal: 20,
  //   paddingTop: 20,
  //   // backgroundColor: '#f0f0f0', // Consistent background
  // },
  // backButton: {
  //   padding: 10,
  // },
  // headerText: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   marginLeft: 'auto',
  // },
  product: {
    flexDirection: 'column',
    alignItems: 'center',
    // paddingHorizontal: 20,
    // marginTop: 20,
  },
  productImage: {
    width: 170,
    height: 170,
    // resizeMode: 'cover',
    marginBottom: 20,
  },
  productDetails: {
    marginHorizontal: 20,
  },
  productNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    // color: '#222',
    color: '#4DC3FC',
    // marginBottom: 15,
  },
  productDescriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productDescription: {
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
    fontWeight: 'bold',
  },
  productOptionButtons: {
    flexDirection: 'row', // Adjust as needed (e.g., 'row')
    marginTop: 5,
  },
  productOptionButton: {
    // paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginRight: 10,
  },
  productOptionButtonText: {
    // fontSize: 14,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20
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
    // borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 10,
    paddingVertical: 8,
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