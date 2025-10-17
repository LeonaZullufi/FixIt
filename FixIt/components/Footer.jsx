import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function Footer() {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <View style={styles.iconRow}>
        <TouchableOpacity onPress={() => navigation.navigate("Explore")}>
          <Image
            source={require("../assets/home_icon.png")}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Problems")}>
          <Image
            source={require("../assets/location_icon.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Report")}>
          <View style={styles.logoWrapper}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.logoIcon}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Help")}>
          <Image
            source={require("../assets/help_icon.png")}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            source={require("../assets/profile_icon.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>FixIt</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
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
