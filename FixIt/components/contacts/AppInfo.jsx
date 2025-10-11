import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AppInfo = () => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>🔹 Çfarë është FixIt?</Text>
    <Text style={styles.text}>
      FixIt është një aplikacion mobil që u mundëson qytetarëve të raportojnë
      probleme ose dëmtime në qytetin e tyre — si p.sh. dritat e rrugës që nuk
      punojnë, gropat në rrugë apo çështje me mbeturinat publike — drejtpërdrejt
      te autoritetet lokale.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#231fa2ff",
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
});

export default AppInfo;
