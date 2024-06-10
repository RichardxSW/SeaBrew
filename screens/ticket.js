import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import backgroundImage from '../assets/Background.png';
import { FontAwesome } from 'react-native-vector-icons';
import { initializeApp } from 'firebase/app';
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

const weekdayTickets = [
  { name: 'Weekday Regular', description: 'Aquarium Tour (1x entry)\nIncludes all animal and Mermaid Show', price: 120500 },
  { name: 'Weekday Premium', description: 'Aquarium Tour (Multiple Entry within the first 4 hours)\nFast lane ticket redemption\nIncludes all animal and Mermaid Show\nCustomized hand fan', price: 196000 },
];

const weekendTickets = [
  { name: 'Weekend Regular', description: 'Aquarium Tour (1x entry)\nIncludes all animal and Mermaid Show', price: 150500 },
  { name: 'Weekend Premium', description: 'Aquarium Tour (Multiple Entry within the first 4 hours)\nFast lane ticket redemption\nIncludes all animal and Mermaid Show\nCustomized hand fan', price: 226000 },
  { name: 'Weekend Premium Family', description: '3 to 6 Person\nAquarium Tour (Multiple Entry within the first 4 hours)\nFast lane ticket redemption\nIncludes all animal and Mermaid Show\nCustomized hand fan', price: 900000 },
];

const { width, height } = Dimensions.get('window');

const Ticket = () => {
  const navigation = useNavigation();
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [lastSelectedDate, setLastSelectedDate] = useState(new Date());
  const [dates, setDates] = useState(generateDates());
  const [ticketCounts, setTicketCounts] = useState({});
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    setDates(generateDates());
  }, []);

  useEffect(() => {
    calculateSubtotal();
  }, [ticketCounts]);

  useEffect(() => {
    if (selectedDate.toISOString() !== lastSelectedDate.toISOString()) {
      setLastSelectedDate(selectedDate);
      resetAllTicketCounts();
    }
  }, [selectedDate, lastSelectedDate]);

  const increaseTicketCount = (ticketName) => {
    setTicketCounts((prevCounts) => ({
      ...prevCounts,
      [selectedDate.toISOString()]: {
        ...(prevCounts[selectedDate.toISOString()] || {}),
        [ticketName]: (prevCounts[selectedDate.toISOString()]?.[ticketName] || 0) + 1,
      },
    }));
  };

  const decreaseTicketCount = (ticketName) => {
    setTicketCounts((prevCounts) => ({
      ...prevCounts,
      [selectedDate.toISOString()]: {
        ...(prevCounts[selectedDate.toISOString()] || {}),
        [ticketName]: Math.max((prevCounts[selectedDate.toISOString()]?.[ticketName] || 0) - 1, 0),
      },
    }));
  };

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const calculateSubtotal = () => {
    const tickets = isWeekend(selectedDate) ? weekendTickets : weekdayTickets;
    const ticketCountForDate = ticketCounts[selectedDate.toISOString()] || {};
    const total = tickets.reduce((sum, ticket) => {
      return sum + (ticketCountForDate[ticket.name] || 0) * ticket.price;
    }, 0);
    setSubtotal(total);
  };

  const resetAllTicketCounts = () => {
    setTicketCounts({});
  };

  const addToCart = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert('You need to be logged in to add tickets to the cart');
      return;
    }
  
    const db = getFirestore();
    const ticketCountForDate = ticketCounts[selectedDate.toISOString()] || {};
  
    // Prepare tickets to add to the cart, excluding those with 0 quantity
    const tickets = Object.keys(ticketCountForDate)
      .filter(ticketName => ticketCountForDate[ticketName] > 0)
      .map(ticketName => ({
        name: ticketName,
        quantity: ticketCountForDate[ticketName],
        price: (isWeekend(selectedDate) ? weekendTickets : weekdayTickets).find(ticket => ticket.name === ticketName).price,
        date: selectedDate.toDateString(),
      }));
  
      try {
        // Check if there are existing tickets for the selected date
        const cartRef = doc(db, 'carts', user.uid);
        const cartSnapshot = await getDoc(cartRef);
        let cartData = { tickets: [], ...cartSnapshot.data() }; // Merge existing data with an empty array if 'tickets' doesn't exist
      
        const existingTickets = cartData.tickets || [];
      
        // Update ticket counts
        tickets.forEach(newTicket => {
          const existingTicketIndex = existingTickets.findIndex(ticket => ticket.date === newTicket.date && ticket.name === newTicket.name);
          if (existingTicketIndex !== -1) {
            // If ticket already exists for the same date, update its count
            existingTickets[existingTicketIndex].count += newTicket.count;
          } else {
            // If ticket doesn't exist for the same date, add it to existing tickets
            existingTickets.push(newTicket);
          }
        });
      
        cartData.tickets = existingTickets; // Update the tickets array in cartData
      
        // Set updated ticket data in Firestore, along with other existing data
        await setDoc(cartRef, cartData);
      
        alert('Tickets added to cart successfully!');
        resetAllTicketCounts(); // Reset all ticket counts to 0
      } catch (error) {
        console.error('Error adding tickets to cart: ', error);
        alert('Error adding tickets to cart: ' + error.message);
      }      
  };


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.content}>
          <View style={styles.allDateContainer}>
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
          <View style={styles.ticketContainer}>
            {isWeekend(selectedDate)
              ? weekendTickets.map((ticket, index) => (
                  <View key={index} style={styles.ticketInfo}>
                    <Text style={styles.ticketName}>{ticket.name}</Text>
                    <Text style={styles.ticketDescription}>{ticket.description}</Text>
                    <View style={styles.ticketCounter}>
                      <TouchableOpacity onPress={() => decreaseTicketCount(ticket.name)} style={styles.counterButton}>
                        <FontAwesome name="minus" size={16} color="#fff" />
                      </TouchableOpacity>
                      <Text style={styles.ticketCount}>{ticketCounts[selectedDate.toISOString()]?.[ticket.name] || 0}</Text>
                      <TouchableOpacity onPress={() => increaseTicketCount(ticket.name)} style={styles.counterButton}>
                        <FontAwesome name="plus" size={16} color="#fff" />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.ticketPrice}>IDR {ticket.price.toLocaleString()}</Text>
                  </View>
                ))
              : weekdayTickets.map((ticket, index) => (
                  <View key={index} style={styles.ticketInfo}>
                    <Text style={styles.ticketName}>{ticket.name}</Text>
                    <Text style={styles.ticketDescription}>{ticket.description}</Text>
                    <View style={styles.ticketCounter}>
                      <TouchableOpacity onPress={() => decreaseTicketCount(ticket.name)} style={styles.counterButton}>
                        <FontAwesome name="minus" size={16} color="#fff" />
                      </TouchableOpacity>
                      <Text style={styles.ticketCount}>{ticketCounts[selectedDate.toISOString()]?.[ticket.name] || 0}</Text>
                      <TouchableOpacity onPress={() => increaseTicketCount(ticket.name)} style={styles.counterButton}>
                        <FontAwesome name="plus" size={16} color="#fff" />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.ticketPrice}>IDR {ticket.price.toLocaleString()}</Text>
                  </View>
                ))}
          </View>
          {subtotal >= 0 && (
            <View>
              <Text style={styles.subtotalText}>Subtotal: IDR {subtotal.toLocaleString()}</Text>
            </View>
          )}

          {/* Tampilkan tombol reset hanya jika ada tiket yang dipilih */}
          {Object.keys(ticketCounts).length > 0 && (ticketCounts[selectedDate.toISOString()] && Object.values(ticketCounts[selectedDate.toISOString()]).some(count => count > 0)) && (
            <TouchableOpacity onPress={resetAllTicketCounts} style={styles.resetButton}>
              <Text style={styles.resetButtonText}>Reset All</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.ticketButton} onPress={addToCart}>
            <FontAwesome name="shopping-basket" size={24} marginRight={10} color="white" />
            <Text style={styles.ticketButtonText}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  dateScroll: {
    width: '100%',
    marginBottom: 20,
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
  subtitle: {
    fontFamily: 'MontserratBold',
    fontSize: 18,
    marginVertical: 14,
    marginHorizontal: 5,
    textAlign: 'left',
    color: '#375A82',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  showContainer: {
    width: '48%',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    alignItems: 'center',
  },
  showImage: {
    width: '100%',
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkness: {
    backgroundColor: 'rgba(0,0,0,0.27)',
    width: '100%',
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showName: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 13,
    color: 'white',
    width: '80%',
    textAlign: 'center',
    opacity: 1.1,
  },
  allDateContainer: {
    width: '100%',
  },
  ticketContainer: {
    width: '100%',
    marginTop: 5,
  },
  ticketTitle: {
    fontSize: 18,
    fontFamily: 'MontserratBold',
    marginBottom: 10,
    textAlign: 'center',
  },
  ticketInfo: {
    backgroundColor: '#B3E0F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  ticketName: {
    fontSize: 16,
    fontFamily: 'MontserratBold',
    color: '#375A82',
    marginBottom: 5,
    textAlign: 'center',
  },
  ticketDescription: {
    fontSize: 13,
    fontFamily: 'MontserratMedium',
    color: '#375A82',
    textAlign: 'center',
  },
  ticketPrice: {
    fontSize: 19,
    fontFamily: 'MontserratBold',
    color: '#375A82',
    textAlign: 'center',
  },
  ticketCounter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  counterButton: {
    backgroundColor: '#375A82',
    paddingHorizontal: 15 ,
    paddingVertical: 10,
    borderRadius: 15,
  },
  ticketCount: {
    fontSize: 16,
    width: 40,
    fontFamily: 'MontserratBold',
    textAlign: 'center',
  },
  subtotalText: {
    fontSize: 18,
    fontFamily: 'MontserratBold',
    color: '#375A82',
    textAlign: 'center',
    marginVertical: 20,
  },
  ticketButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 40,
    borderRadius: 20,
    backgroundColor: '#375A82',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  ticketButtonText: {
    fontFamily: 'MontserratSemiBold',
    color: 'white',
    fontSize: 16,
  },
  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: 48,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resetButtonText: {
    fontFamily: 'MontserratSemiBold',
    color: 'white',
    fontSize: 16,
  },
});

export default Ticket;