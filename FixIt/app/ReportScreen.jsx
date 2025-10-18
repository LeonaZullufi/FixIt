import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";

export default function ReportScreen() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapPress = (event) => {
    setSelectedLocation(event.nativeEvent.coordinate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Raporto një problem</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 42.6675,
          longitude: 21.1662,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={handleMapPress}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>

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
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  map: {
    flex: 1,
    borderRadius: 20,
    margin: 10,
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
