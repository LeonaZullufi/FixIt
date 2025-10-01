import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>FixIt App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "#023e8a",
    borderRadius: 100,
    height: 200,
    marginTop: -153,
  },
  title: {
    color: "white",
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "bold",
  },
});
