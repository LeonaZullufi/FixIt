import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import SettingItem from "./SettingItem";

export default function SettingsList({
  settings,
  languages,
  expandedSetting,
  setExpandedSetting,
  language,
  setLanguage,
  setNotifications,
  handleSettingPress,
  theme,
  setTheme,
  themes,
}) {
  return (
    <FlatList
      data={settings}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <SettingItem
          item={item}
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
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  separator: { height: 1, backgroundColor: "#f0f0f0", marginVertical: 5 },
});
