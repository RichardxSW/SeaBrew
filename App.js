import React, { useEffect, useState } from 'react';
import { StyleSheet} from 'react-native';
import { useFonts } from 'expo-font';
import SplashScreen from './screens/splashScreen';
import ShowList from './screens/showList';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    'MontserratBold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
    'MontserratSemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'MontserratMedium': require('./assets/fonts/Montserrat-Medium.ttf'),
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
          name="ShowList" 
          component={ShowList} 
          options={{
            title: 'All Show',
            headerStyle: {
              backgroundColor: '#92DAFD',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontFamily: 'MontserratBold',
              fontSize: 24,
            },
            headerTitleAlign: 'center',
          }}/>
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
