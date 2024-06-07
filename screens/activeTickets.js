import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useFonts, Montserrat_700Bold } from "@expo-google-fonts/montserrat";

const ActiveTicketsScreen = () => {
    const [fontsLoaded] = useFonts({
        Montserrat_700Bold,
      });
    
      if (!fontsLoaded) {
        return null;
      }
    return (
        <ScrollView>
        <View style={styles.historyPage}>
            <Text style={styles.title}>Active Tickets</Text>
            <View style={styles.bundleContainer}>
                <View style={styles.bundleRow}>
                    <View style={styles.textContainer}>
                        <Text style={styles.itemName}>
                            Cappuccino & Americano Combo
                        </Text>
                        <Text style={styles.visitDate}>
                            Visit date: 7 June 2024
                        </Text>
                    </View>
                    <View style={styles.groupContainer}>
                        <Text style={styles.itemPrice}>Rp.150.000</Text>
                        <Text style={styles.paidText}>Paid</Text>
                        </View>
                </View>
                <View style={styles.bundleRow}>
                    <View style={styles.textContainer}>
                        <Text style={styles.itemName}>
                            Green Macchiato Delight
                        </Text>
                        <Text style={styles.visitDate}>
                            Visit date: 7 June 2024
                        </Text>
                    </View>
                    <View style={styles.groupContainer}>
                        <Text style={styles.itemPrice}>Rp.210.000</Text>
                        <Text style={styles.paidText}>Paid</Text>
                    </View>
                </View>
                <View style={styles.bundleRow}>
                    <View style={styles.textContainer}>
                        <Text style={styles.itemName}>Choco Cappuccino Set</Text>
                        <Text style={styles.visitDate}>
                            Visit date: 7 June 2024
                        </Text>
                    </View>
                    <View style={styles.groupContainer}>
                        <Text style={styles.itemPrice}>Rp.190.000</Text>
                        <Text style={styles.paidText}>Paid</Text>
                    </View>
                </View>
            </View>
        </View>
        </ScrollView>
    );
}

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
      fontFamily: "Montserrat_400Regular",
      fontSize: 9,
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
  });

export default ActiveTicketsScreen;