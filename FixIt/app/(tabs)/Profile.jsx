// app/(tabs)/Profile.jsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, signOut, onAuthStateChanged } from "../../firebase";
import { router, useNavigation } from "expo-router";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return unsub;
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Profili",
      headerStyle: { backgroundColor: "#023e8a" },
      headerTintColor: "#fff",
      headerTitleAlign: "center",
    });
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/(auth)/login");
    } catch (err) {
      console.log("logout error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-outline" size={90} color="#023e8a" />
      <Text style={styles.name}>
        {user?.displayName ?? "Përdorues pa emër"}
      </Text>
      <Text style={styles.email}>
        {user?.email ?? "Nuk ka email (jo i kyçur)"}
      </Text>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Çkyçu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  name: { fontSize: 20, fontWeight: "bold" },
  email: { color: "#666" },
  logoutBtn: {
    marginTop: 25,
    backgroundColor: "#ff4d6d",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  logoutText: { color: "#fff", fontWeight: "bold" },
});
