import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const History = () => {
    return (
        <View style={styles.historyPage}>
            <Text style={styles.historyTitle}>History</Text>
            <View style={styles.bundleContainer}>
                <View style={styles.bundleRow}>
                    <View style={styles.textContainer}>
                        <Text style={styles.itemName}>
                            Cappuccino & Americano Combo
                        </Text>
                        <Text style={styles.visitDate}>
                            Visit date: 3 June 2024
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
                            Visit date: 2 June 2024
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
                            Visit date: 29 May 2024
                        </Text>
                    </View>
                    <View style={styles.groupContainer}>
                        <Text style={styles.itemPrice}>Rp.190.000</Text>
                        <Text style={styles.paidText}>Paid</Text>
                    </View>
                </View>
                <View style={styles.bundleRow}>
                    <View style={styles.textContainer}>
                        <Text style={styles.itemName}>Cappuccino & Americano Combo</Text>
                        <Text style={styles.visitDate}>
                            Visit date: 3 June 2024
                        </Text>
                    </View>
                    <View style={styles.groupContainer}>
                        <Text style={styles.itemPrice}>Rp.150.000</Text>
                        <Text style={styles.paidText}>Paid</Text>
                    </View>
                </View>
                <View style={styles.bundleRow}>
                    <View style={styles.textContainer}>
                        <Text style={styles.itemName}>Green Macchiato Delight</Text>
                        <Text style={styles.visitDate}>
                            Visit date: 2 June 2024
                        </Text>
                    </View>
                    <View style={styles.groupContainer}>
                        <Text style={styles.itemPrice}>Rp.210.000</Text>
                        <Text style={styles.paidText}>Paid</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    historyPage: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: 360,
        height: 800,
        boxSizing: "border-box",
        backgroundColor: "rgba(255,255,255,1)",
    },
    historyTitle: {
        position: "absolute",
        top: "8.56%",
        bottom: "87.69%",
        left: 125.7,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        color: "rgba(55,90,130,1)",
        fontSize: 30,
        lineHeight: 30,
        fontFamily: "Montserrat, sans-serif",
        fontWeight: "600",
        textAlign: "center",
    },
    bundleContainer: {
        position: "absolute",
        top: 159,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: 486,
        paddingLeft: 9,
        paddingRight: 11,
        paddingTop: 14,
        paddingBottom: 11,
        borderRadius: 20,
        boxSizing: "border-box",
        backgroundColor: "rgba(179,224,245,1)",
    },
    bundleRow: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        paddingRight: 1,
        paddingTop: 6,
        boxSizing: "border-box",
    },
    textContainer: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        paddingRight: 55,
        paddingBottom: 35.55,
        boxSizing: "border-box",
    },
    itemName: {
        color: "rgba(55,90,130,1)",
        fontSize: 15,
        lineHeight: 15,
        fontFamily: "Montserrat, sans-serif",
        fontWeight: "700",
    },
    visitDate: {
        color: "rgba(55,90,130,1)",
        fontSize: 9,
        lineHeight: 9,
        fontFamily: "Montserrat, sans-serif",
        fontWeight: "500",
    },
    groupContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        boxSizing: "border-box",
        marginRight: 10,
    },
    itemPrice: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        color: "rgba(55,90,130,1)",
        fontSize: 12,
        lineHeight: 12,
        fontFamily: "Montserrat, sans-serif",
        fontWeight: "700",
        textAlign: "center",
    },
    paidText: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        color: "rgba(55,90,130,1)",
        fontSize: 12,
        lineHeight: 12,
        fontFamily: "Montserrat, sans-serif",
        fontWeight: "700",
        textAlign: "center",
    },
});

export default History;