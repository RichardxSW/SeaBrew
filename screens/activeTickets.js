import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useFonts, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import QRCode from "react-native-qrcode-svg";

const ActiveTicketsScreen = () => {
  const [fontsLoaded] = useFonts({
    Montserrat_700Bold,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const tickets = [
    {
      id: 1,
      name: "Cappuccino & Americano Combo",
      date: "7 June 2024",
      price: "Rp.150.000",
    },
    {
      id: 2,
      name: "Green Macchiato Delight",
      date: "7 June 2024",
      price: "Rp.210.000",
    },
    {
      id: 3,
      name: "Choco Cappuccino Set",
      date: "7 June 2024",
      price: "Rp.190.000",
    },
  ];

  const handlePress = (item) => {
    console.log("Item pressed:", item);
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground source={require("../assets/Background.png")}>
      <ScrollView>
        <View style={styles.historyPage}>
          <Text style={styles.title}>Active Tickets</Text>
          <View style={styles.bundleContainer}>
            {tickets.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.bundleRow}
                onPress={() => handlePress(item)}
              >
                <View style={styles.textContainer}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.visitDate}>Visit date: {item.date}</Text>
                </View>
                <View style={styles.groupContainer}>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                  <Text style={styles.paidText}>Paid</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      {selectedItem && (
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{selectedItem.name}</Text>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  historyPage: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    backgroundColor: "rgba(255,255,255,1)",
    paddingTop: 30,
  },
  title: {
    fontFamily: "MontserratBold",
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
    fontFamily: "MontserratBold",
    fontSize: 15,
    color: "#375A82",
    marginBottom: 5,
  },
  visitDate: {
    fontFamily: "Montserrat",
    fontSize: 9,
    color: "#375A82",
    marginBottom: 10,
  },
  groupContainer: {
    alignItems: "center",
    marginRight: 10,
  },
  itemPrice: {
    fontFamily: "MontserratBold",
    fontSize: 12,
    color: "#375A82",
    marginBottom: 5,
  },
  paidText: {
    fontFamily: "MontserratBold",
    fontSize: 12,
    color: "#375A82",
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
    justifyContent: "center", // Add this line
  },
  modalTitle: {
    fontFamily: "MontserratBold",
    fontSize: 20,
    color: "#375A82",
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#375A82",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontFamily: "MontserratBold",
  },
});

export default ActiveTicketsScreen;
