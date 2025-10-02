import React from "react";
import { View, Text, Button, StyleSheet, Alert, Image } from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
//Demo
export default function Home() {
  const handlePress = () => {
    Alert.alert("Ju klikuat butonin!");
  };

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.content}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Mirësevini në FixIt!</Text>
        <Button title="Kliko mua" onPress={handlePress} />
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e0e0",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
