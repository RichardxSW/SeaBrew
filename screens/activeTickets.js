import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useFonts, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import QRCode from "react-native-qrcode-svg";
import { collection, query, where, getDocs, doc, getDoc, getFirestore, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const ActiveTicketsScreen = () => {
  const [fontsLoaded] = useFonts({
    Montserrat_700Bold,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        try {
          const db = getFirestore();
          const userHistoryRef = doc(db, `history/${user.uid}`);

          const unsubscribe = onSnapshot(userHistoryRef, (snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.data();
              const purchases = userData.purchases || [];
              
              // Filter transactions with today's date
              const today = new Date();
              const formattedToday = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
              const todayTransactions = purchases.flatMap((purchase) => purchase.items)
                .filter((item) => {
                  const transactionDate = new Date(item.date);
                  const formattedTransactionDate = `${transactionDate.getFullYear()}-${transactionDate.getMonth() + 1}-${transactionDate.getDate()}`;
                  return formattedTransactionDate === formattedToday;
                });
              todayTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
              setTransactions(todayTransactions);
            } else {
              console.log("User history does not exist");
            }
            setLoading(false);
          });

          return () => unsubscribe(); // Cleanup function to unsubscribe from real-time updates
        } catch (error) {
          console.error('Error fetching transaction history:', error);
        }
      }
    };

    fetchTransactions();
  }, []);

  const handlePress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  if (!fontsLoaded || loading) {
    return null;
  }

  return (
    <ImageBackground source={require('../assets/Background.png')} style={styles.container}>
    <ScrollView>
      <View style={styles.historyPage}>
        <Text style={styles.title}>Active Tickets</Text>
        <View style={styles.bundleContainer}>
          {transactions.length === 0 ? (
            <Text style={[styles.noTicketsText, { textAlign: 'center' }]}>No Active Tickets</Text>
          ) : (
            transactions.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.bundleRow}
                onPress={() => handlePress(item)}
              >
                <View style={styles.textContainer}>
                  <Text style={styles.itemName}>{item.name} - ({item.quantity}x) </Text>
                  <Text style={styles.visitDate}>
                    Visit date: {item.date}
                  </Text>
                </View>
                <View style={styles.groupContainer}>
                  <Text style={styles.itemPrice}>IDR {item.price * item.quantity}</Text>
                  <Text style={styles.paidText}>Paid</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </View>
      {selectedItem && (
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <QRCode value={JSON.stringify(selectedItem)} size={200} />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeModal}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  historyPage: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
    paddingTop: 30,
    paddingHorizontal: 15, // Add horizontal padding here
  },
  title: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 30,
    color: "#375A82",
    marginBottom: 20,
  },
  bundleContainer: {
    width: "100%",
    padding: 14,
    borderRadius: 20,
    backgroundColor: "#B3E0F5",
    marginBottom: 40,
    alignItems: 'center', // Center the content inside
  },
  bundleRow: {
    flexDirection: "row",
    paddingVertical: 6,
  },
  textContainer: {
    flex: 1,
    paddingBottom: 40,
  },
  itemName: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 15,
    color: "#375A82",
    marginBottom: 5,
  },
  visitDate: {
    fontFamily: "Montserrat",
    fontSize: 12,
    color: "#375A82",
    marginBottom: 10,
  },
  groupContainer: {
    alignItems: "center",
    marginRight: 10,
  },
  itemPrice: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 12,
    color: "#375A82",
    marginBottom: 5,
  },
  paidText: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 12,
    color: "#375A82",
  },
  noTicketsText: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 15,
    color: "#375A82",
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#375A82",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontFamily: "Montserrat_700Bold",
  },
});

export default ActiveTicketsScreen;