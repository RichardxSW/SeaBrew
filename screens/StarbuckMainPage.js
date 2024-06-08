import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView,
  TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Data from '../assets/data/sbuckdata.js';
import CurrencyInput from 'react-native-currency-input';

const StarbuckMainPage = () => {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [category, setCategory] = useState('All');
  const handleBlur = () => {
    setIsFocused(false);
    // Optional: Dismiss keyboard when input is blurred
    Keyboard.dismiss();
    };

const filteredData = Data.filter(item => {
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
          (category === 'Coffee' && item.id <= 4) ||
          (category === 'Non Coffee' && item.id >= 5 && item.id <= 8) ||
          (category === 'Food' && item.id >= 9)
        )
      );
    }
  } else {
    // Jika tidak ada nilai di kolom pencarian
    if (category === 'All' || category === '') return true; // Menambahkan kategori kosong sebagai "All"
    if (category === 'Coffee' && item.id <= 4) return true;
    if (category === 'Non Coffee' && item.id >= 5 && item.id <= 8) return true;
    if (category === 'Food' && item.id >= 9) return true;
  }
  return false;
});

return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
        <View style={styles.wallpaperContainer} />
        {/* <View style={styles.inputContainer}> */}
                {/* {!isFocused && !inputValue && (
                    <Text style={styles.placeholder}>
                        Search what do you want..
                    </Text>
                )} */}
                <TextInput 
                    placeholder='Search what do you want..'
                    style={styles.searchBar}
                    onFocus={() => setIsFocused(true)}
                    onBlur= {handleBlur}
                    onChangeText={text => setInputValue(text)}
                    value={inputValue}
                />
            {/* </View> */}
            
        <Text style={styles.headerText}>SeaBrew's Coffee</Text>

        <View style={styles.bannerContainer}>
            <Text style={styles.bannerText}>Bundles</Text>
            <Image source={require('../assets/imgStarbuck/bannerSbuck.webp')} style={styles.bannerImage} />
    </View>  

      <View style={styles.categoryContainer}>
        <TouchableOpacity onPress={() => setCategory('All')}>
          <Text style={category === 'All' ? styles.categoryTextActive : styles.categoryText}>For You</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCategory('Coffee')}>
          <Text style={category === 'Coffee' ? styles.categoryTextActive : styles.categoryText}>Coffee</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCategory('Non Coffee')}>
          <Text style={category === 'Non Coffee' ? styles.categoryTextActive : styles.categoryText}>Non Coffee</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => setCategory('Food')}>
          <Text style={category === 'Food' ? styles.categoryTextActive : styles.categoryText}>Food</Text>
        </TouchableOpacity> */}
      </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
          {filteredData.map(item => (
            <TouchableOpacity key={item.id} style={styles.itemContainer} onPress={() => navigation.navigate('StarbuckDetail' , {item})}>
              <Image source={item.image} style={styles.image} resizeMode="cover" />
              <Text style={styles.itemName}>{item.name}</Text>
              <CurrencyInput 
              style={styles.itemPrice}
              value={item.price}
              prefix="IDR "
              delimiter="."
              separator=","
              precision={2}
              editable={false}
              />
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    // marginTop: 20,
    marginBottom: 10,
  },
  wallpaperContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: '#ABE4FC',
    zIndex: -5,
  },
  inputContainer: {
    // position: 'absolute',
    height: 40,
    // width: '80%',
    justifyContent: 'center',
    marginTop: 20,
},
  searchBar: {
    height: 40,
    // borderColor: 'gray',
    // borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
    marginTop: 25,
    backgroundColor: '#375A82',
    color: 'white',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    fontFamily: 'MontserratBold',
    textAlign: 'center',
  },
  bannerContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  bannerText: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    zIndex: 1,
    backgroundColor: '#ED5151',
    padding: 8,
    borderRadius: 16,
    fontFamily: 'MontserratBold',
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
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
  },
  categoryTextActive: {
    fontSize: 14,
    color: '#B3E0F5',
    // fontWeight: 'bold',
    marginRight: 10,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 20,
    backgroundColor: '#375A82',
  },
  itemContainer: {
    width: '47%',
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    padding: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  scrollViewContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // paddingHorizontal: 5, // Menambahkan padding horizontal untuk item
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    maxWidth: '80%',
    textAlign: 'left',
    marginBottom: 20,
  },
  itemPrice: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'left',
    position: 'absolute',
    bottom: 10,
    left: 10, // Sesuaikan dengan posisi addButton
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#375A82',
    borderRadius: 8,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StarbuckMainPage;
