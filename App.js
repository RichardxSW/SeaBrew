import React from "react";
import { StyleSheet, StatusBar, View, Platform } from "react-native"; // Import StatusBar and Platform
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ScreenTabs from "./screens/screenTabs";

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <View style={styles.container}>
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
          <NavigationContainer>
            <ScreenTabs />
          </NavigationContainer>
        </View>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },
});
