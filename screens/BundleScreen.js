import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import backgroundImage from '../assets/Background.png';
import Bundle from '../assets/data/bundledata';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }
  return dates;
};

const filterBundlesByDate = (bundles, date) => {
  const dayOfWeek = date.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // 0 is Sunday, 6 is Saturday
  const type = isWeekend? 'weekend' : 'weekday';
  return bundles.filter(bundle => bundle.type === type);
};

const BundleScreen = () => {
  const [quantities, setQuantities] = useState(Bundle.map(() => 0));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dates, setDates] = useState(generateDates());
  const [filteredBundles, setFilteredBundles] = useState(Bundle);
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [subtotal, setSubtotal] = useState(0); 

  useEffect(() => {
    setDates(generateDates());
  }, []);

  useEffect(() => {
    const updatedBundles = filterBundlesByDate(Bundle, selectedDate);
    setFilteredBundles(updatedBundles);
    setQuantities(updatedBundles.map(() => 0)); // Reset quantities sesuai dengan filteredBundles
  }, [selectedDate]);

  useEffect(() => {
    // Hitung subtotal setiap kali quantities berubah
    const newSubtotal = calculateSubtotal();
    setSubtotal(newSubtotal);
  }, [quantities]);

  const handleIncrement = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  };

  const handleDecrement = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 0) {
      newQuantities[index] -= 1;
    }
    setQuantities(newQuantities);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleAddToCart = async () => {
    const auth = getAuth(); 
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'You must be logged in to add to cart');
      return;
    }
    
    const db = getFirestore();
    const selectedBundles = filteredBundles
      .map((bundle, index) => ({
        name: bundle.name,
        quantity: quantities[index],
        price: bundle.price,
        date: selectedDate.toDateString(), // Format date to string without time
      }))
      .filter(bundle => bundle.quantity > 0);
  
    if (selectedBundles.length === 0) {
      Alert.alert('Warning', 'No bundles selected');
      return;
    }
  
    try {
      const cartRef = doc(collection(db, 'carts'), user.uid);
      const cartDoc = await getDoc(cartRef);
      if (cartDoc.exists()) {
        const existingBundles = cartDoc.data().bundle || []; // Default to empty array if bundle is undefined
        selectedBundles.forEach((newBundle) => {
          const existingBundleIndex = existingBundles.findIndex((bundle) => bundle.name === newBundle.name && bundle.date === newBundle.date);
          if (existingBundleIndex !== -1) {
            existingBundles[existingBundleIndex].quantity += newBundle.quantity;
          } else {
            existingBundles.push(newBundle);
          }
        });
        await setDoc(cartRef, { bundle: existingBundles }, { merge: true });
      } else {
        await setDoc(cartRef, { bundle: selectedBundles });
      }
      setCart([...cart, ...selectedBundles]);
      setQuantities(filteredBundles.map(() => 0)); // Reset quantities to 0
      Alert.alert("Bundles added to cart", `Selected bundles for ${selectedDate.toLocaleDateString()} have been added to the cart.`);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add to cart');
    }

    // Reset quantities dan subtotal setelah ditambahkan ke cart
    setQuantities(filteredBundles.map(() => 0));
    setSubtotal(0);
  };

  const handleResetQuantities = () => {
    setQuantities(filteredBundles.map(() => 0));
  };

  const calculateSubtotal = () => {
    return filteredBundles.reduce((total, bundle, index) => {
      return total + (bundle.price * quantities[index]);
    }, 0);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.bundleContainer}>
      <View style={styles.bundleDetails}>
        <Text style={styles.bundleName}>{item.name}</Text>
        <Text style={styles.bundleDesc}>{item.desc}</Text>
      </View>
      <View style={styles.bundleActions}>
        <Text style={styles.bundlePrice}>IDR {item.price.toLocaleString()}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={() => handleDecrement(index)}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityInput}>{quantities[index]}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={() => handleIncrement(index)}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.dateScrollContainer}>
          <Text style={styles.subtitle}>Select date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
            {dates.map((date) => (
              <TouchableOpacity
                key={date.toISOString()}
                style={[
                  styles.dateContainer,
                  selectedDate.toDateString() === date.toDateString() && styles.selectedDateContainer,
                ]}
                onPress={() => handleDateSelect(date)}
              >
                <Text
                  style={[
                    styles.dateText,
                    selectedDate.toDateString() === date.toDateString() && styles.selectedDateText,
                  ]}
                >
                  {date.getDate()}
                </Text>
                <Text
                  style={[
                    styles.dayText,
                    selectedDate.toDateString() === date.toDateString() && styles.selectedDayText,
                  ]}
                >
                  {days[date.getDay()]}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.bundleList}>
          <FlatList 
            showsVerticalScrollIndicator={false}
            data={filteredBundles}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
            ListFooterComponent={null}
          />
          {quantities.some(quantity => quantity > 0) && (
            <TouchableOpacity style={styles.resetButton} onPress={handleResetQuantities}>
              <Text style={styles.resetButtonText}>Reset All</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartButtonText}>Add To Cart - IDR {calculateSubtotal().toLocaleString()}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default BundleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  dateScrollContainer: {
    overflow: 'hidden',
    height: 120,
  },
  dateScroll: {
    width: '100%',
    marginBottom: 20,
    height: 0,
  },
  dateContainer: {
    alignItems: 'center',
    padding: 10,
    width: 70,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#B3E0F5',
  },
  selectedDateContainer: {
    backgroundColor: '#375A82',
  },
  subtitle: {
    fontFamily: 'MontserratBold',
    fontSize: 18,
    marginBottom: 10,
    marginHorizontal: 5,
    textAlign: 'left',
    color: '#375A82',
  },
  dayText: {
    fontSize: 16,
    fontFamily: 'MontserratMedium',
    color: '#375A82',
  },
  selectedDayText: {
    color: '#B3E0F5',
  },
  dateText: {
    fontSize: 16,
    fontFamily: 'MontserratBold',
    color: '#375A82',
  },
  selectedDateText: {
    color: '#B3E0F5',
  },
  bundleContainer: {
    backgroundColor: '#B3E0F5',
    borderRadius: 10,
    marginVertical: 5,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bundleList: {
    flex: 1,
  },
  bundleDetails: {
    flex: 1,
    marginRight: 10,
  },
  bundleName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#375A82',
  },
  bundleDesc: {
    fontSize: 12,
    color: '#375A82',
    marginTop: 5,
  },
  bundleActions: {
    flex: 1,
    alignItems: 'flex-end',
  },
  bundlePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#375A82',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: '#375A82',
    borderRadius: 8,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 18,
  },
  quantityInput: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: '#375A82',
    borderRadius: 16,
    padding: 15,
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    // display: 'flex',
    // flexDirection: 'row',
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#FF6347',
    borderRadius: 16,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtotalText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
});
