import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SettingsCard from "../components/settings/SettingsCard";
import SettingsScreen from "../components/settings/SettingsScreen";
import { useNavigation } from "expo-router";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Profile",
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={{ marginRight: 50 }}
        >
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      ),

      headerStyle: {
        backgroundColor: "#023e8a",
        height: 75,
      },

      headerTitleAlign: "center",
      headerTintColor: "white",
    });
  }, [navigation]);

  const stats = [
    {
      id: "1",
      label: "Raportimet e mia",
      value: 28,
      color: "#F5A623",
      emoji: "📋",
    },
    {
      id: "2",
      label: "Të rregulluar",
      value: 12,
      color: "#4CD964",
      emoji: "✅",
    },
    { id: "3", label: "Në progres", value: 9, color: "#007AFF", emoji: "🔄" },
    { id: "4", label: "Në pritje", value: 7, color: "#FF3B30", emoji: "🕓" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileContainer}>
          <Ionicons name="person-circle-outline" size={90} color="#023e8a" />
          <Text style={styles.name}>Emri Mbiemri</Text>
          <Text style={styles.email}>email@shembull.com</Text>
        </View>

        <View style={styles.statsContainer}>
          {stats.map((item) => (
            <SettingsCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <SettingsScreen onClose={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  name: {
    color: "#000",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 8,
  },
  email: {
    color: "#000",
    opacity: 0.7,
    marginTop: 4,
    fontSize: 16,
  },
  statsContainer: {
    backgroundColor: "#f2f2f2",
    borderRadius: 30,
    paddingVertical: 25,
    paddingHorizontal: 15,
    marginBottom: 40,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "100%",
  },
});
