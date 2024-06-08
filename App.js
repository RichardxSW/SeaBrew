import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Navbar from "./components/Navbar";
import SplashScreen from './screens/splashScreen';
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/registerScreen';
import ShowList from './screens/showList';
import Home from './screens/home';
import StarbuckMain from "./screens/StarbuckMainPage";
import StarbuckDetail from "./screens/StarbuckDetailPage";
import EditProfileScreen from './screens/editProfileScreen';
import ProfileScreen from './screens/profileScreen';
import Ticket from "./screens/ticket";
import BundleScreen from './screens/BundleScreen';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBrg-qp3vfv09l2jxSWLtptKFbOZHkyJac",
  authDomain: "seabrew-f052c.firebaseapp.com",
  projectId: "seabrew-f052c",
  storageBucket: "seabrew-f052c.appspot.com",
  messagingSenderId: "62416172444",
  appId: "1:62416172444:web:5a187986fb6403c49ac459",
  measurementId: "G-SKHC3JH4KV"
};

initializeApp(firebaseConfig);

const Stack = createStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    'MontserratBold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
    'MontserratSemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'MontserratMedium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'BigShouldersStencilBold': require('./assets/fonts/BigShouldersStencilText-Bold.ttf'),
    'BigShouldersStencilRegular': require('./assets/fonts/BigShouldersStencilText-Regular.ttf'),
    'BigShouldersStencilMedium': require('./assets/fonts/BigShouldersStencilText-Medium.ttf'),
    'BigShouldersStencilSemiBold': require('./assets/fonts/BigShouldersStencilText-SemiBold.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load any resources or data that you need prior to rendering the app
        await new Promise(resolve => setTimeout(resolve, 2150)); // Simulating a delay
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return <SplashScreen />;
  }

  if (!fontsLoaded) {
    return null;
  }

  if (fontError) {
    console.warn(fontError);
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ headerShown: false }} />
      <Stack.Screen 
        name="Navbar" 
        component={Navbar}
        options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ShowList" 
          component={ShowList} 
          options={{
            title: 'All Show',
            headerStyle: {
              backgroundColor: '#92DAFD',
              // backgroundColor: '#4DC3FC',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontFamily: 'MontserratBold',
              fontSize: 24,
            },
            headerTitleAlign: 'center',
          }}/>
          <Stack.Screen 
            name="StarbuckDetail"
            component={StarbuckDetail}
            options={{
              title: 'Detail',
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerTintColor: 'black',
              headerTitleStyle: {
                fontFamily: 'MontserratBold',
                fontSize: 24,
              },
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen}
            options={{ headerShown: false }} />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{ headerShown: false }} />
          <Stack.Screen 
            name="EditProfile" 
            component={EditProfileScreen}
            options={{
            title: 'Edit Profile',
            headerStyle: {
              backgroundColor: '#92DAFD',
            },
            headerTintColor: '#375A82',
            headerTitleStyle: {
              fontFamily: 'Montserrat',
              fontSize: 24,
            },
            headerTitleAlign: 'center',
          }}/>
          <Stack.Screen 
            name="Ticket"
            component={Ticket}
            options={{
              title: 'Ticket',
              headerStyle: {
                backgroundColor: '#92DAFD',
                // backgroundColor: '#4DC3FC',
              },
              headerTintColor: 'black',
              headerTitleStyle: {
                fontFamily: 'MontserratBold',
                fontSize: 24,
              },
              headerTitleAlign: 'center',
             }}
          />
          <Stack.Screen 
            name="BundleScreen"
            component={BundleScreen}
            options={{
              title: 'All Bundle',
              headerStyle: {
                backgroundColor: '#92DAFD',
                // backgroundColor: '#4DC3FC',
              },
              headerTintColor: 'black',
              headerTitleStyle: {
                fontFamily: 'MontserratBold',
                fontSize: 24,
              },
              headerTitleAlign: 'center',
             }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
},
});