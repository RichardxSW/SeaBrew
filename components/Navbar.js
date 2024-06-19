import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore, doc, getDoc, collection, query, where } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import HomeScreen from '../screens/home';
import CartScreen from '../screens/cart';
import ScreenTabs from '../screens/screenTabs';
import StarbuckMainScreen from '../screens/StarbuckMainPage';
import ProfileScreen from '../screens/profileScreen';

const Tab = createBottomTabNavigator();

const Navbar = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [profileImage, setProfileImage] = useState(null);

  const fetchUserData = async () => {
    if (user) {
      const db = getFirestore();
      const userDoc = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.profileImageUrl) {
          setProfileImage(data.profileImageUrl);
        }
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [user])
  );

  const handleLogout = async (navigation) => {
    try {
      await signOut(auth);
      navigation.navigate('Login', { email: '', password: '' });
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };

  return (
    <Tab.Navigator
      style={styles.container}
      initialRouteName="Home"
      screenOptions={({ route, navigation }) => ({
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
            iconName = 'coffee';
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#4DC3FC',
        tabBarInactiveTintColor: '#676D75',
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'SeaBrew',
          title: 'Home',
          headerStyle: {
            backgroundColor: '#92DAFD',
            height: 100,
            shadowColor: '#375A82',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
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
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerTitle: 'SeaBrew',
          title: 'Cart',
          headerStyle: {
            backgroundColor: '#92DAFD',
            height: 100,
            shadowColor: '#375A82',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
          },
          headerTintColor: '#375A82',
          headerStatusBarHeight: 30,
          headerTitleStyle: {
            fontFamily: 'BigShouldersStencilBold',
            fontSize: 27,
          },
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="Starbuck"
        component={StarbuckMainScreen}
        options={{
          headerTitle: 'SB Coffee',
          title: 'Starbuck',
          headerStyle: {
            backgroundColor: '#92DAFD',
            height: 100,
            shadowColor: '#375A82',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
          },
          headerTintColor: '#375A82',
          headerStatusBarHeight: 30,
          headerTitleStyle: {
            fontFamily: 'BigShouldersStencilBold',
            fontSize: 27,
          },
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="History"
        component={ScreenTabs}
        options={{
          headerTitle: 'SeaBrew',
          title: 'History',
          headerStyle: {
            backgroundColor: '#92DAFD',
            height: 100,
            shadowColor: '#375A82',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
          },
          headerTintColor: '#375A82',
          headerStatusBarHeight: 30,
          headerTitleStyle: {
            fontFamily: 'BigShouldersStencilBold',
            fontSize: 27,
          },
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerTitle: 'SeaBrew',
          title: 'Profile',
          headerStyle: {
            backgroundColor: '#92DAFD',
            height: 100,
            shadowColor: '#375A82',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
          },
          headerTintColor: '#375A82',
          headerStatusBarHeight: 30,
          headerTitleStyle: {
            fontFamily: 'BigShouldersStencilBold',
            fontSize: 27,
          },
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity style={styles.logoutButton} onPress={() => handleLogout(navigation)}>
              <FontAwesome name="sign-out" size={30} color="#375A82" />
            </TouchableOpacity>
          ),
        })}
      />
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
    backgroundColor: '#1D1F24',
    borderTopWidth: 0,
    paddingBottom: 10,
    paddingTop: 10,
    position: 'absolute',
    bottom: 16,
    right: 16,
    left: 16,
    borderRadius: 20,
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
  logoutButton: {
    marginRight: 20,
  },
});