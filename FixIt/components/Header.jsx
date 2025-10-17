import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Header({ onOpenSettings }) {
  const navigation = useNavigation();
  const route = useRoute();

  const isProfilePage = route.name === "Profile";
  return (
    <View style={styles.header}>
      <Text style={styles.title}>FixIt App</Text>
      {isProfilePage && (
        <TouchableOpacity style={styles.iconButton} onPress={onOpenSettings}>
          <Ionicons name="settings-outline" size={26} color="#fff" />
        </TouchableOpacity>
      )}
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
  iconButton: {
    position: "absolute",
    right: 65,
    bottom: 10,
  },
});
