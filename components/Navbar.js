import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from '../screens/home';
import StarbuckMainScreen from '../screens/StarbuckMainPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Navbar = () => {
  return (
    <Tab.Navigator
        initialRouteName="HomeScreen">
            <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="StarbuckMainScreen" component={StarbuckMainScreen} />
    </Tab.Navigator>
  )
}

export default Navbar

const styles = StyleSheet.create({

})