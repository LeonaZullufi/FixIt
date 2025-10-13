import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

export default function ReportScreen() {
  return (
    <View style={styles.container}>
      <Header title="FixIt App" />

      <View style={styles.content}>
        <Text>Here is the Help page</Text>
      </View>

      <Footer />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
