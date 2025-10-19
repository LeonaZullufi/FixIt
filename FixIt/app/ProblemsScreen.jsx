import React, { useState } from "react";
import { View, StyleSheet, Modal, Text, TouchableOpacity, Image } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const mapStyle = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

const LATITUDE_MIN = 40.8;
const LATITUDE_MAX = 44.3;
const LONGITUDE_MIN = 19.8;
const LONGITUDE_MAX = 22.8;

const markers = [
  {
    id: 1,
    title: "Rruga e dëmtuar - Prishtinë",
    description: "Grope në rrugën kryesore",
    latitude: 42.6629,
    longitude: 21.1655,
    image: require('../assets/ProblemOnMap/Gropa1.png'),
  },
  {
    id: 2,
    title: "Rruga mbledh ujë - Prizren",
    description: "Kanalizimi nuk funksionon për të larguar ujin",
    latitude: 42.2139,
    longitude: 20.7417,
    image: require('../assets/ProblemOnMap/Gropa2Prizren.jpg'),
  },
  {
    id: 3,
    title: "Ujë në rrugë - Pejë",
    description: "Uji nga kanalizimi ka kaluar në rrugë",
    latitude: 42.6606,
    longitude: 20.2883,
    image: require('../assets/ProblemOnMap/KanalizimNeRruge.jpg'),
  },
  {
    id: 4,
    title: "Rruga C nuk ka ndriqim - Prishtinë",
    description: "Mungon ndriçimi në Rrugën C, edhe pse infrastruktura ekziston",
    latitude: 42.65087,
    longitude: 21.15602,
    image: require('../assets/ProblemOnMap/NdriqimPrishtine.jpg'),
  },
  {
    id: 5,
    title: "Mbeturina anash rruges - Skenderaj",
    description: "Mbeturinat vazhdojnë të mblidhen , askush nuk i largon , kjo vjen nga mungesa e shportave adekuate",
    latitude: 42.74757,
    longitude: 20.78917,
    image: require('../assets/ProblemOnMap/MbeturinaSkenderaj.jpg'),
  },
  {
    id: 6,
    title: "Këndi i lojrave është dëmtuar - Prishtinë",
    description: "Këndi i lojërave në bregun e diellit është pa mirëmbajtje dhe i rrezikshëm",
    latitude: 42.654329,
    longitude: 21.174757,
    image: require('../assets/ProblemOnMap/KendiLojrave.jpg'),
  },
];

export default function ReportScreen() {
  const [selectedMarker, setSelectedMarker] = useState(null);
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

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
        customMapStyle={mapStyle}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            onPress={() => setSelectedMarker(marker)}
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
            <Text style={styles.modalTitle}>{selectedMarker?.title}</Text>
            <Image source={selectedMarker?.image} style={styles.image} />
            <Text style={{ marginTop: 10 }}>{selectedMarker?.description}</Text>
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

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    width: 350,
    height: 380,
    alignItems: "center",
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  image: {
    width: 300,
    height: 200,
    marginTop: 10,
    borderRadius: 8,
  },
  closeButton: {
    bottom: 0, 
    backgroundColor: "#2196F3",
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});
