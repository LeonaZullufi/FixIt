import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";

export default function ReportScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Raporto Problem",
      headerStyle: {
        backgroundColor: "#023e8a", 
      },
      headerTitleAlign: "center",
      headerTintColor: "white",
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#023e8a" />

      <Text style={styles.title}>Raporto një problem</Text>

      <Image
        source={require("../assets/map.png")}
        style={styles.mapImage}
        resizeMode="cover"
      />

      <View style={styles.photoSection}>
        <TouchableOpacity style={styles.cameraButton}>
          <Image
            source={require("../assets/logo1.png")}
            style={styles.cameraIcon}
          />
          <Text style={styles.cameraText}>Shto Foto</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>Dërgo Raportin</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  title: {
    textAlign: "center",
    color: "#023e8a",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  mapImage: {
    width: "90%",
    height: 300,
    alignSelf: "center",
    borderRadius: 20,
    marginVertical: 10,
  },
  photoSection: {
    alignItems: "center",
    marginVertical: 15,
  },
  cameraButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A4FFFF",
    padding: 12,
    borderRadius: 30,
    width: 200,
    justifyContent: "center",
  },
  cameraIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  cameraText: {
    fontSize: 16,
    color: "#023e8a",
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: "#00b4d8",
    padding: 15,
    borderRadius: 30,
    marginHorizontal: 50,
    marginBottom: 20,
  },
  submitText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
