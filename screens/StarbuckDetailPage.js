import React, { useState , useMemo} from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import backgroundImage from '../assets/Background-putih.png';
import { FontAwesome } from 'react-native-vector-icons';
import Data from '../assets/data/sbuckdata.js';
// import Checkbox from 'react-native-elements';
import { RadioGroup } from 'react-native-radio-buttons-group';
import CurrencyInput from 'react-native-currency-input';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';

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

  const addToCart = async (item, selectedSize, quantity) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert('You need to be logged in to add items to the cart');
      return;
    }
    
    const db = getFirestore();
    
    try {
      // Dokumen cart untuk pengguna saat ini
      const cartRef = doc(db, 'carts', user.uid);
      
      // Mengambil data keranjang dari Firestore
      const cartSnapshot = await getDoc(cartRef);
      let cartData;
      
      if (cartSnapshot.exists()) {
        // Jika dokumen keranjang sudah ada, gunakan data yang ada
        cartData = cartSnapshot.data();
      } else {
        // Jika dokumen keranjang belum ada, inisialisasi dengan objek kosong
        cartData = {};
      }
      
      // Pastikan bahwa cartData memiliki properti 'items' dan inisialisasi jika belum ada
      if (!cartData.hasOwnProperty('items')) {
        cartData.items = [];
      }
      
      // Menentukan tanggal hari ini dalam format yang sesuai
      const currentDate = new Date().toDateString(); // Sat Jun 08 2024
      
      // Mencari apakah item yang sama sudah ada dalam keranjang pada tanggal hari ini
      const existingItemIndex = cartData.items.findIndex(
        (cartItem) =>
        cartItem.name === item.name && cartItem.dateAdded === currentDate
      );
      
      if (existingItemIndex !== -1) {
        // Jika item sudah ada dalam keranjang pada tanggal yang sama, tambahkan jumlah yang baru
        cartData.items[existingItemIndex].quantity += quantity;
      } else {
        // Jika item belum ada dalam keranjang pada tanggal hari ini, tambahkan item baru
        const newItem = {
          name: item.name || null,
          price: item.price || null,
          quantity: quantity || null,
          dateAdded: currentDate,
        };
        cartData.items.push(newItem);
      }
      
      // Mengatur kembali dokumen keranjang dengan data yang telah diperbarui
      await setDoc(cartRef, cartData);
      
      // Mengatur ulang nilai selectedIceorHot, selectedSize, dan quantity menjadi nilai default
      setSelectedIceorHot(); // Mengosongkan radio button
      setSelectedSize(); // Mengosongkan radio button
      setQuantity(0); // Mengatur quantity menjadi 0
      
      alert('Item added to cart successfully!');
    } catch (error) {
      console.error('Error adding item to cart: ', error);
      alert('Error adding item to cart: ' + error.message);
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
              prefix="IDR "
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
            <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item, selectedSize, quantity)}>
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