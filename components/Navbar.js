import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState }from 'react';
import HomeScreen from '../screens/home';
import CartScreen from '../screens/cart';
import ScreenTabs from '../screens/screenTabs';
import StarbuckMainScreen from '../screens/StarbuckMainPage';
import ProfileScreen from '../screens/profileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'; // Import icon libraries

const Tab = createBottomTabNavigator();

const Navbar = () => {
  const [profileImage, setProfileImage] = useState(null);

  return (
    <Tab.Navigator
      style={styles.container}
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Starbuck') {
            iconName =  'coffee';
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline'; // Change to history icon
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#4DC3FC',
        tabBarInactiveTintColor: '#676D75',
        // tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'SeaBrew',
          headerStyle: {
            backgroundColor: '#92DAFD',
            height: 100
          },
          headerTintColor: '#375A82',
          headerStatusBarHeight: 30,
          headerLeft: () => (
            <View style={styles.avatarContainer}>
              <View style={styles.avatarBorder}>
                {profileImage ? (
                  <Image source={{ uri: profileImage }} style={styles.avatarIcon} />
                ) : (
                  <Image source={require('../assets/profilepic.jpg')} style={styles.avatarIcon} />
                )}
              </View>
          </View>
          ),
          headerTitleStyle: {
            fontFamily: 'BigShouldersStencilBold',
            fontSize: 27,
          },
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Starbuck" component={StarbuckMainScreen} options={{ headerShown: false }} />
      <Tab.Screen name="History" component={ScreenTabs} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    // Custom styles for the container
  },
  tabBar: {
    height: 60,
    backgroundColor: '#1D1F24', // Background color of the tab bar
    borderTopWidth: 0,
    paddingBottom: 10,
    paddingTop: 10,
    position: 'absolute',
    bottom: 16,
    right: 16,
    left: 16,
    borderRadius: 20
  },

  avatarContainer: {
    width: 30,
    height: 30,
    marginLeft: 25,
  },

  avatarBorder: {
    width: 35,
    height: 35,
    borderRadius: 58,
    borderColor: '#375A82',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarIcon: {
    width: 42,
    height: 42,
    borderRadius: 50,
  },
});
