import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <View style={styles.iconRow}>
        <Image
          source={require("../assets/home_icon.png")}
          style={styles.icon}
        />
        <Image
          source={require("../assets/location_icon.png")}
          style={styles.icon}
        />
        <View style={styles.logoWrapper}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logoIcon}
          />
        </View>

        <Image
          source={require("../assets/help_icon.png")}
          style={styles.icon}
        />
        <Image
          source={require("../assets/profile_icon.png")}
          style={styles.icon}
        />
      </View>

      <Text style={styles.text}>FixIt</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    borderRadius: 15,
    backgroundColor: "#023e8a",
    paddingVertical: 10,
    alignItems: "center",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
    marginBottom: 0,
  },
  icon: {
    width: 45,
    height: 45,
    marginHorizontal: 12,
  },
  logoWrapper: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#023e8a",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -45,
  },
  logoIcon: {
    width: 70,
    height: 70,
  },
  text: {
    color: "white",
    fontSize: 15,
    marginTop: -15,
  },
});
