import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StarbuckMain from "./screens/StarbuckMainPage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="StarbuckMain"
        component={StarbuckMain}
        options={{headerShown : false }}
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
