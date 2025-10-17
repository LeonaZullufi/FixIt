import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function DropdownList({ options = [], selected, onSelect }) {
  return (
    <View style={styles.dropdown}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.dropdownItem,
            selected === option && styles.selectedDropdownItem,
          ]}
          onPress={() => onSelect(option)}
        >
          <Text
            style={[
              styles.dropdownText,
              selected === option && styles.selectedDropdownText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: "#f0f0f5",
    borderRadius: 10,
    marginTop: 8,
    paddingVertical: 4,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  selectedDropdownItem: {
    backgroundColor: "#e0e0ff",
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  selectedDropdownText: {
    fontWeight: "bold",
    color: "#6e5eff",
  },
});
