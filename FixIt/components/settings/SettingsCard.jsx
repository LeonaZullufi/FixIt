import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function StatCard({ item }) {
  return (
    <View style={[styles.statCard, { backgroundColor: item.color }]}>
      <Text style={styles.statEmoji}>{item.emoji}</Text>
      <Text style={styles.statLabel}>{item.label}</Text>
      <Text style={styles.statValue}>{item.value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statCard: {
    width: "48%",
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statEmoji: { fontSize: 28 },
  statLabel: { color: "#fff", fontWeight: "500", marginTop: 8, fontSize: 14 },
  statValue: { color: "#fff", fontSize: 24, fontWeight: "bold", marginTop: 5 },
});
