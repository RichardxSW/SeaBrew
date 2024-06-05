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
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    
});

export default History;