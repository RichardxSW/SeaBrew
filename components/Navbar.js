import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore, doc, getDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Badge } from 'react-native-elements';
import HomeScreen from '../screens/home';
import CartScreen from '../screens/cart';
import ScreenTabs from '../screens/screenTabs';
import StarbuckMainScreen from '../screens/StarbuckMainPage'; // Adjust the import if necessary
import ProfileScreen from '../screens/profileScreen';

const Tab = createBottomTabNavigator();

const Navbar = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [profileImage, setProfileImage] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);

  // Fetch user data including profile image
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

  // Fetch cart item count and set up real-time listener for cart updates
  const fetchCartItemCount = async () => {
    let unsubscribe = null;

    if (user) {
      const db = getFirestore();
      const cartDocRef = doc(db, 'carts', user.uid);
      const cartSnap = await getDoc(cartDocRef);

      if (cartSnap.exists()) {
        const cartData = cartSnap.data();
        const itemCount =
          (cartData.items?.length || 0) +
          (cartData.bundle?.length || 0) +
          (cartData.tickets?.length || 0);
        setCartItemCount(itemCount);

        // Set up real-time listener for cart changes
        unsubscribe = onSnapshot(cartDocRef, (doc) => {
          if (doc.exists()) {
            const newData = doc.data();
            const newCount =
              (newData.items?.length || 0) +
              (newData.bundle?.length || 0) +
              (newData.tickets?.length || 0);
            setCartItemCount(newCount);
          } else {
            setCartItemCount(0);
          }
        });
      } else {
        setCartItemCount(0);
      }
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  };

  // Fetch user data and cart item count on initial load and when user changes
  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
      fetchCartItemCount();

      // Cleanup function
      return () => {};
    }, [user])
  );

  // Logout function
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
            return (
              <View>
                <Ionicons name={iconName} size={size} color={color} />
                {cartItemCount > 0 && (
                  <Badge
                    value={cartItemCount}
                    status="error"
                    containerStyle={{ position: 'absolute', top: -5, right: -10 }}
                    badgeStyle={{ backgroundColor: '#375A82', borderWidth: 0 }}
                    textStyle={{ color: 'white' }} // Text color of the badge
                    borderColor="transparent"
                  />
                )}
              </View>
            );
          } else if (route.name === 'SBCoffee') { // Updated route name
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
        options={({ navigation }) => ({
          headerShown: true,
          headerTransparent: false,
          headerTitle: 'SeaBrew',
          title: 'Home',
          headerStyle: {
            backgroundColor: '#92DAFD',
            height: Platform.OS === 'android' ? 100 : 130,
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
        })}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: true,
          headerTransparent: false,
          headerTitle: 'SeaBrew',
          title: 'Cart',
          headerStyle: {
            backgroundColor: '#92DAFD',
            height: Platform.OS === 'android' ? 100 : 130,
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
        name="SBCoffee" // Updated name
        component={StarbuckMainScreen}
        options={{
          headerShown: true,
          headerTransparent: false,
          headerTitle: 'SB Coffee', // Updated header title
          title: 'SB Coffee', // Updated tab title
          headerStyle: {
            backgroundColor: '#92DAFD',
            height: Platform.OS === 'android' ? 100 : 130,
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
        name="History"
        component={ScreenTabs}
        options={{
          headerShown: true,
          headerTransparent: false,
          headerTitle: 'SeaBrew',
          title: 'History',
          headerStyle: {
            backgroundColor: '#92DAFD',
            height: Platform.OS === 'android' ? 100 : 130,
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
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTransparent: false,
          headerTitle: 'SeaBrew',
          title: 'Profile',
          headerStyle: {
            backgroundColor: '#92DAFD',
            height: Platform.OS === 'android' ? 100 : 130,
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