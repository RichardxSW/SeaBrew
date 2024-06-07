import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import HomeScreen from '../screens/home';
import CartScreen from '../screens/cart';
import StarbuckMainScreen from '../screens/StarbuckMainPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Navbar = () => {
  return (
    <Tab.Navigator
        initialRouteName="HomeScreen">
            <Tab.Screen name="HomeScreen" 
          component={HomeScreen} 
          options={{
            title: 'SeaBrew',
            headerStyle: {
              backgroundColor: '#92DAFD',
              // backgroundColor: '#4DC3FC',
            },
            headerTintColor: '#375A82',
            headerLeft: () => (
              <Image
                source={require('../assets/user.png')}
                style={{ width: 23, height: 23, marginLeft: 15, marginTop: 5}}
              />
            ),
            headerTitleStyle: {
              fontFamily: 'BigShouldersStencilBold',
              fontSize: 27,
            },
            headerTitleAlign: 'center',
          }} />
          <Tab.Screen 
            name="CartScreen" 
            component={CartScreen}
            options={{headerShown : false }} />
        <Tab.Screen 
            name="StarbuckMainScreen" 
            component={StarbuckMainScreen}
            options={{headerShown : false }} />
        
    </Tab.Navigator>
  )
}

export default Navbar

const styles = StyleSheet.create({

})