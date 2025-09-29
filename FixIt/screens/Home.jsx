// File: screens/Home.jsx
import React from "react";
import { View, Text, Button, StyleSheet, Alert, Image } from "react-native";

export default function Home() {
  const handlePress = () => {
    Alert.alert("Ju klikuat butonin!");
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/logo1.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Teksti */}
      <Text style={styles.title}>Mirësevini në FixIt!</Text>

      {/* Butoni */}
      <Button title="Kliko mua" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20, // hapësirë midis logos dhe tekstit
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
