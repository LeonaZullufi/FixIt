import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import SettingsList from "./SettingsList";

export default function SettingsScreen({ onClose }) {
  const [notifications, setNotifications] = useState(true);
  const [expandedSetting, setExpandedSetting] = useState(null);
  const [language, setLanguage] = useState("English");
  const languages = ["English", "Albanian", "German"];
  const [theme, setTheme] = useState("Light");
  const themes = ["Light", "Dark"];

  const settings = [
    {
      id: "1",
      icon: "globe",
      label: "Language",
      value: language,
      type: "button",
    },
    { id: "2", icon: "moon", label: "Theme", value: theme, type: "button" },
    {
      id: "3",
      icon: "bell",
      label: "Notifications",
      value: notifications,
      type: "switch",
    },
    {
      id: "4",
      icon: "log-out",
      label: "Logout",
      type: "button",
      isLogout: true,
    },
  ];

  const handleSettingPress = (item) => {
    if (item.isLogout) {
      alert("Jeni duke u çkyçur...");
    } else if (item.label === "Language" || item.label === "Theme") {
      setExpandedSetting(expandedSetting === item.id ? null : item.id);
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
