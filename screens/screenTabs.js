import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ActiveTickets from './activeTickets';
import TransactionHistory from './transactionHistory';
import { StyleSheet, Platform, StatusBar, View } from 'react-native';

const Tab = createMaterialTopTabNavigator();

function ScreenTabs() {
  return (
    <View style={styles.container}>
    <Tab.Navigator initialRouteName='ActiveTickets'>
      <Tab.Screen name="Active Tickets" component={ActiveTickets} />
      <Tab.Screen name="Transaction History" component={TransactionHistory} />
    </Tab.Navigator>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight, 
  },
});

export default ScreenTabs;