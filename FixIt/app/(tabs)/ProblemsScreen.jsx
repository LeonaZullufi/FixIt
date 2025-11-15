import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase.js"; // ← Your firebase file

// Map style - hide POI labels
const mapStyle = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

// Kosovo bounds
const LATITUDE_MIN = 40.8;
const LATITUDE_MAX = 44.3;
const LONGITUDE_MIN = 19.8;
const LONGITUDE_MAX = 22.8;

export default function ReportScreen() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState({
    latitude: 42.6,
    longitude: 20.9,
    latitudeDelta: 0.55,
    longitudeDelta: 0.65,
  });

  const onRegionChangeComplete = (newRegion) => {
    let latitude = newRegion.latitude;
    let longitude = newRegion.longitude;

    if (latitude < LATITUDE_MIN) latitude = LATITUDE_MIN;
    if (latitude > LATITUDE_MAX) latitude = LATITUDE_MAX;
    if (longitude < LONGITUDE_MIN) longitude = LONGITUDE_MIN;
    if (longitude > LONGITUDE_MAX) longitude = LONGITUDE_MAX;

    if (latitude !== newRegion.latitude || longitude !== newRegion.longitude) {
      setRegion({ ...newRegion, latitude, longitude });
    } else {
      setRegion(newRegion);
    }
  };

  // Load reports
  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "reports"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReports(data);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore error:", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={{ marginTop: 10 }}>Duke ngarkuar raportet...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
        customMapStyle={mapStyle}
      >
        {reports.map((report) => (
          <Marker
            key={report.id}
            coordinate={{
              latitude: report.latitude,
              longitude: report.longitude,
            }}
            onPress={() => setSelectedMarker(report)}
          />
        ))}
      </MapView>

      <Modal
        visible={!!selectedMarker}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedMarker(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedMarker?.description?.length > 30
                ? `${selectedMarker?.description.substring(0, 30)}…`
                : selectedMarker?.description}
            </Text>

            <Image
              source={{ uri: selectedMarker?.photoURL }}
              style={styles.image}
              resizeMode="cover"
            />

            <Text style={{ marginTop: 10, textAlign: "center" }}>
              {selectedMarker?.description}
            </Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedMarker(null)}
            >
              <Text style={{ color: "white" }}>Mbyll</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    width: 340,
    maxHeight: 500,
    alignItems: "center",
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 8,
  },
  image: {
    width: 300,
    height: 200,
    marginTop: 10,
    borderRadius: 8,
  },
  closeButton: {
    backgroundColor: "#2196F3",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
});