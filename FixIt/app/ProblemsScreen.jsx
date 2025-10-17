import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ReportScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>Here is the Problems page</Text>
      </View>
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
