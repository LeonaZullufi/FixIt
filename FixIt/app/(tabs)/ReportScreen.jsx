import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "expo-router";

// FIREBASE
import { auth, db } from "../../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export default function ReportScreen() {
  const navigation = useNavigation();

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [pinLocation, setPinLocation] = useState(null);

  const [reports, setReports] = useState([]);
  const [openedReport, setOpenedReport] = useState(null);
  const [photoPickerVisible, setPhotoPickerVisible] = useState(false);

  // FOTOT TUA
  const photos = [
    require("../../assets/ProblemOnMap/Gropa1.png"),
    require("../../assets/ProblemOnMap/Gropa2Prizren.jpg"),
    require("../../assets/ProblemOnMap/NdriqimPrishtine.jpg"),
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "FixIt",
      headerStyle: { height: 75, backgroundColor: "#023e8a" },
      headerTitleAlign: "center",
      headerTintColor: "white",
    });
  }, []);

  // MERR RAPORTET E USERIT
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "reports"),
      where("userEmail", "==", user.email)
    );

    const unsub = onSnapshot(q, (snap) => {
      const items = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReports(items);
    });

    return () => unsub();
  }, []);

  const placePin = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setPinLocation({ latitude, longitude });
  };

  // DËGO RAPORTIN → FIRESTORE
  const sendReport = async () => {
    if (!pinLocation || !selectedPhoto || !description.trim()) {
      alert("Zgjidh një vend, foto dhe përshkrim!");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("Nuk je i kyçur!");
      return;
    }

    // Foto → URL string
    const photoURL = Image.resolveAssetSource(selectedPhoto).uri;

    try {
      await addDoc(collection(db, "reports"), {
        latitude: pinLocation.latitude,
        longitude: pinLocation.longitude,
        photoURL: photoURL,
        description: description,
        userEmail: user.email,
        createdAt: Date.now(),
      });

      setSelectedPhoto(null);
      setDescription("");
      setPinLocation(null);

      alert("Raporti u dërgua!");
    } catch (error) {
      alert("Gabim: " + error.message);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Raporto një problem</Text>

        <MapView
          style={styles.map}
          onLongPress={placePin}
          initialRegion={{
            latitude: 42.6629,
            longitude: 21.1655,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {pinLocation && (
            <Marker
              coordinate={pinLocation}
              pinColor="blue"
              title="Vend i ri"
            />
          )}

          {reports.map((r) => (
            <Marker
              key={r.id}
              coordinate={{ latitude: r.latitude, longitude: r.longitude }}
              pinColor="red"
              onPress={() => setOpenedReport(r)}
            />
          ))}
        </MapView>

        <TouchableOpacity
          style={styles.photoButton}
          onPress={() => setPhotoPickerVisible(true)}
        >
          <Text style={styles.photoText}>
            {selectedPhoto ? "Ndrysho Fotën" : "Zgjidh Foto"}
          </Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Shkruaj përshkrimin..."
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity style={styles.sendButton} onPress={sendReport}>
          <Text style={styles.sendText}>Dërgo Raportin</Text>
        </TouchableOpacity>

        {/* FOTO PICKER */}
        <Modal visible={photoPickerVisible} transparent animationType="slide">
          <View style={styles.photoModal}>
            <Text style={styles.modalTitle}>Zgjidh një foto</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {photos.map((p, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSelectedPhoto(p);
                    setPhotoPickerVisible(false);
                  }}
                >
                  <Image source={p} style={styles.horizontalThumb} />
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.closePhotoModalBtn}
              onPress={() => setPhotoPickerVisible(false)}
            >
              <Text style={{ color: "white" }}>Mbyll</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* RAPORT MODAL */}
        <Modal visible={openedReport !== null} animationType="slide">
          {openedReport && (
            <View style={styles.modalContent}>
              <Image
                source={{ uri: openedReport.photoURL }}
                style={styles.modalImage}
              />
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
    </ScrollView>
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
  map: { height: 300, width: "100%", alignSelf: "center" },
  photoButton: {
    backgroundColor: "#A4FFFF",
    marginTop: 20,
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
  photoModal: {
    backgroundColor: "white",
    marginTop: "40%",
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#023e8a",
    textAlign: "center",
    marginBottom: 20,
  },
  horizontalThumb: {
    width: 120,
    height: 120,
    borderRadius: 15,
    marginRight: 15,
  },
  closePhotoModalBtn: {
    backgroundColor: "#023e8a",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  modalContent: { padding: 20 },
  modalImage: { width: "100%", height: 300, borderRadius: 15 },
  modalDesc: { marginTop: 15, fontSize: 16 },
  closeButton: {
    backgroundColor: "#023e8a",
    padding: 12,
    borderRadius: 15,
    marginTop: 20,
  },
  closeText: { textAlign: "center", color: "white" },
});
