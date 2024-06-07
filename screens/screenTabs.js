import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ActiveTickets from './activeTickets';
import TransactionHistory from './transactionHistory';

const Tab = createMaterialTopTabNavigator();

function ScreenTabs() {
  return (
    <Tab.Navigator initialRouteName='ActiveTickets'>
      <Tab.Screen name="Active Tickets" component={ActiveTickets} />
      <Tab.Screen name="Transaction History" component={TransactionHistory} />
    </Tab.Navigator>
  );
}

export default ScreenTabs;