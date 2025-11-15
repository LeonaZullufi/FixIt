import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import SettingsList from "./SettingsList";
import { useRouter } from "expo-router";

export default function SettingsScreen({ onClose }) {
  const [notifications, setNotifications] = useState(true);
  const [expandedSetting, setExpandedSetting] = useState(null);
  const [language, setLanguage] = useState("Anglisht");
  const languages = ["Anglisht", "Shqip"];
  const [theme, setTheme] = useState("Drite");
  const themes = ["Drite", "Errët"];
  const router = useRouter();

  const settings = [
    {
      id: "1",
      label: "Edit Profile",
      icon: "edit-3",
      type: "button",
      isProfile: true,
    },
    {
      id: "2",
      icon: "globe",
      label: "Gjuha",
      value: language,
      type: "button",
    },
    { id: "3", icon: "moon", label: "Tema", value: theme, type: "button" },
    {
      id: "4",
      icon: "bell",
      label: "Njoftimet",
      value: notifications,
      type: "switch",
    },
    {
      id: "5",
      label: "Dil",
      icon: "log-out",
      type: "button",
      isLogout: true,
    },
  ];

  const handleSettingPress = (item) => {
    if (item.isLogout) {
      alert("Jeni duke u çkyçur...");
    } else if (item.label === "Gjuha" || item.label === "Tema") {
      setExpandedSetting(expandedSetting === item.id ? null : item.id);
    } else if (item.isProfile) {
      onClose();
      router.push("/editProfile");
    }
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Settings</Text>
          <TouchableOpacity onPress={onClose}>
            <Feather name="x" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <SettingsList
          settings={settings}
          languages={languages}
          expandedSetting={expandedSetting}
          setExpandedSetting={setExpandedSetting}
          language={language}
          setLanguage={setLanguage}
          setNotifications={setNotifications}
          handleSettingPress={handleSettingPress}
          theme={theme}
          setTheme={setTheme}
          themes={themes}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "50%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalTitle: { fontWeight: "bold", fontSize: 20, color: "#000" },
});
