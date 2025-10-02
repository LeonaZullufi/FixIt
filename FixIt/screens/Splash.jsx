import React from "react";
import { View, Text, Image, StyleSheet, StatusBar } from "react-native";

export default function Splash() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#023e8a" />

      <Image source={require("../assets/logo1.png")} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#023e8a",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
});
