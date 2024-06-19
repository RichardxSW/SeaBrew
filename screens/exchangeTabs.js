import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MerchandiseScreen from './merchandisepage';
import MerchandiseReward from './merchandisereward';
import { StyleSheet, Platform, StatusBar, View } from 'react-native';

const Tab = createMaterialTopTabNavigator();

function ExchangeTabs() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName='Merchandise'
        screenOptions={{
          tabBarLabelStyle: {
            fontFamily: 'MontserratBold',
            fontSize: 12,
          },
        }}
      >
      <Tab.Screen name="Exchange Points" component={MerchandiseScreen} />
      <Tab.Screen name="My Reward" component={MerchandiseReward} />
    </Tab.Navigator>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ExchangeTabs;