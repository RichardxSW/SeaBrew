import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Image} from 'react-native';
import { useFonts } from 'expo-font';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/splashScreen';
import LoginScreen from './screens/loginScreen';
import ShowList from './screens/showList';
import Home from './screens/home';
import StarbuckMain from "./screens/StarbuckMainPage";
import ProfileScreen from './screens/profileScreen';

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

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ headerShown: false }} />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ headerShown: false }} />
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{
            title: 'SeaBrew',
            headerStyle: {
              backgroundColor: '#92DAFD',
              // backgroundColor: '#4DC3FC',
            },
            headerTintColor: '#375A82',
            headerLeft: () => (
              <Image
                source={require('./assets/user.png')}
                style={{ width: 23, height: 23, marginLeft: 15, marginTop: 5}}
              />
            ),
            headerTitleStyle: {
              fontFamily: 'BigShouldersStencilBold',
              fontSize: 27,
            },
            headerTitleAlign: 'center',
          }}/>
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
            name="StarbuckMain"
            component={StarbuckMain}
            options={{headerShown : false }}
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
