import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "expo-router";

export default function ReportScreen() {
  const navigation = useNavigation();

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [pinLocation, setPinLocation] = useState(null);

  // Lista e raporteve të ruajtura
  const [reports, setReports] = useState([]);

  // Modal për të parë raportin
  const [openedReport, setOpenedReport] = useState(null);

  // Modal për listën e fotove
  const [photoPickerVisible, setPhotoPickerVisible] = useState(false);

  const photos = [
    require("../../assets/ProblemOnMap/Gropa1.png"),
    require("../../assets/ProblemOnMap/Gropa2Prizren.jpg"),
    require("../../assets/ProblemOnMap/NdriqimPrishtine.jpg"),
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "FixIt",
      headerStyle: {
        height: 75,
        backgroundColor: "#023e8a",
      },
      headerTitleAlign: "center",
      headerTintColor: "white",
    });
  }, []);

  const placePin = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setPinLocation({ latitude, longitude });
  };

  const sendReport = () => {
    if (!pinLocation || !selectedPhoto || !description.trim()) {
      alert("Zgjidh një vend, foto dhe përshkrim!");
      return;
    }

    const newReport = {
      id: Date.now(),
      latitude: pinLocation.latitude,
      longitude: pinLocation.longitude,
      photo: selectedPhoto,
      description: description,
    };

    setReports([...reports, newReport]);

    // pastroj inputet
    setSelectedPhoto(null);
    setDescription("");
    setPinLocation(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Raporto një problem</Text>

      {/* HARTA */}
      <MapView
        style={styles.map}
        onPress={placePin}
        initialRegion={{
          latitude: 42.6629,
          longitude: 21.1655,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Pin i ri */}
        {pinLocation && (
          <Marker coordinate={pinLocation} pinColor="blue" title="Vend i ri" />
        )}

        {/* Pin-at e kuq të ruajtur */}
        {reports.map((r) => (
          <Marker
            key={r.id}
            coordinate={{ latitude: r.latitude, longitude: r.longitude }}
            pinColor="red"
            onPress={() => setOpenedReport(r)}
          />
        ))}
      </MapView>

      {/* Zgjidh Foto */}
      <TouchableOpacity
        style={styles.photoButton}
        onPress={() => setPhotoPickerVisible(true)}
      >
        <Text style={styles.photoText}>
          {selectedPhoto ? "Ndrysho Fotën" : "Zgjidh Foto"}
        </Text>
      </TouchableOpacity>

      {/* Përshkrimi */}
      <TextInput
        style={styles.input}
        placeholder="Shkruaj përshkrimin..."
        value={description}
        onChangeText={setDescription}
      />

      {/* Dërgo raportin */}
      <TouchableOpacity style={styles.sendButton} onPress={sendReport}>
        <Text style={styles.sendText}>Dërgo Raportin</Text>
      </TouchableOpacity>

      {/* MODAL – Zgjedhja e fotove */}
      <Modal
        visible={photoPickerVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.photoModal}>
          <Text style={styles.modalTitle}>Zgjidh një foto</Text>

          <View style={styles.photoGrid}>
            {photos.map((p, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedPhoto(p);
                  setPhotoPickerVisible(false);
                }}
              >
                <Image source={p} style={styles.thumbnail} />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.closePhotoModalBtn}
            onPress={() => setPhotoPickerVisible(false)}
          >
            <Text style={{ color: "white" }}>Mbyll</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal kur prek një pin të kuq */}
      <Modal
        visible={openedReport !== null}
        transparent={false}
        animationType="slide"
      >
        {openedReport && (
          <View style={styles.modalContent}>
            <Image source={openedReport.photo} style={styles.modalImage} />
            <Text style={styles.modalDesc}>{openedReport.description}</Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setOpenedReport(null)}
            >
              <Text style={styles.closeText}>Mbyll</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 45 },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#023e8a",
  },
  map: {
    height: 350,
    width: "90%",
    alignSelf: "center",
    borderRadius: 20,
    marginVertical: 10,
  },
  photoButton: {
    backgroundColor: "#A4FFFF",
    marginHorizontal: 50,
    padding: 12,
    borderRadius: 20,
  },
  photoText: { textAlign: "center", color: "#023e8a" },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 10,
    margin: 20,
    padding: 10,
  },
  sendButton: {
    backgroundColor: "#00b4d8",
    marginHorizontal: 50,
    padding: 15,
    borderRadius: 20,
  },
  sendText: { textAlign: "center", color: "white", fontSize: 18 },

  /*** STYLES PËR MODAL-in E FOTOVE ***/
  photoModal: {
    backgroundColor: "white",
    marginTop: "30%",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "70%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#023e8a",
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 10,
  },
  closePhotoModalBtn: {
    backgroundColor: "#023e8a",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },

  /*** MODAL I RAPORTEVE ***/
  modalContent: { padding: 20 },
  modalImage: { width: "100%", height: 250, borderRadius: 15 },
  modalDesc: { marginTop: 15, fontSize: 16 },
  closeButton: {
    backgroundColor: "#023e8a",
    padding: 12,
    borderRadius: 15,
    marginTop: 20,
  },
  closeText: { textAlign: "center", color: "white" },
});
