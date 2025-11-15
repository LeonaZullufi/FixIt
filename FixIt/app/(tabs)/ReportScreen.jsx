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
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
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
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

// ===== Reverse Geocoding pa API KEY (OpenStreetMap) =====
async function getAddressFromCoords(lat, lng) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=sq`;

    const response = await fetch(url, {
      headers: { "User-Agent": "FixItApp/1.0" },
    });

    const data = await response.json();

    return data.display_name || "Adresë e panjohur";
  } catch (error) {
    console.log("Gabim API:", error);
    return "Adresë e panjohur";
  }
}

export default function ReportScreen() {
  const navigation = useNavigation();

  // FORM STATE
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [pinLocation, setPinLocation] = useState(null);
  const [placeName, setPlaceName] = useState("");

  // DATA STATE
  const [reports, setReports] = useState([]);
  const [openedReport, setOpenedReport] = useState(null);

  // EDIT STATE
  const [editDescription, setEditDescription] = useState("");
  const [editPhoto, setEditPhoto] = useState(null);

  // UI STATE
  const [photoPickerVisible, setPhotoPickerVisible] = useState(false);
  const [editPhotoVisible, setEditPhotoVisible] = useState(false);

  // STATUS STATE
  const [loadingReports, setLoadingReports] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
        setSuccessMessage(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  const photos = [
    require("../../assets/ProblemOnMap/Gropa1.png"),
    require("../../assets/ProblemOnMap/Gropa2Prizren.jpg"),
    require("../../assets/ProblemOnMap/NdriqimPrishtine.jpg"),
    require("../../assets/ProblemOnMap/MbeturinaSkenderaj.jpg"),
    require("../../assets/ProblemOnMap/KendiLojrave.jpg"),
    require("../../assets/ProblemOnMap/KanalizimNeRruge.jpg"),
  ];

  // HEADER UI
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "FixIt",
      headerStyle: { height: 75, backgroundColor: "#023e8a" },
      headerTitleAlign: "center",
      headerTintColor: "white",
    });
  }, []);

  // GET USER REPORTS (Realtime)
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoadingReports(false);
      return;
    }

    const q = query(
      collection(db, "reports"),
      where("userEmail", "==", user.email)
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const items = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReports(items);
        setLoadingReports(false);
      },
      (err) => {
        console.log(err);
        setErrorMessage("Nuk u lexuan raportet.");
        setLoadingReports(false);
      }
    );

    return () => unsub();
  }, []);

  // === Kur vendos pika → merr adresën automatikisht ===
  const placePin = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setPinLocation({ latitude, longitude });

    const address = await getAddressFromCoords(latitude, longitude);
    setPlaceName(address);
  };

  // SEND REPORT
  const sendReport = async () => {
    if (!pinLocation || !selectedPhoto || !description.trim()) {
      setErrorMessage("Plotëso foton, vendin dhe përshkrimin!");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      setErrorMessage("Duhet të jesh i kyçur!");
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const photoURL = Image.resolveAssetSource(selectedPhoto).uri;

    try {
      await addDoc(collection(db, "reports"), {
        latitude: pinLocation.latitude,
        longitude: pinLocation.longitude,
        placeName: placeName, // ADRESA AUTO
        photoURL: photoURL,
        description: description,
        userEmail: user.email,
        createdAt: Date.now(),
      });

      setSelectedPhoto(null);
      setDescription("");
      setPinLocation(null);
      setPlaceName("");

      setSuccessMessage("Raporti u dërgua me sukses!");
    } catch (error) {
      console.log(error);
      setErrorMessage("Gabim gjatë dërgimit.");
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const deleteReport = async (id) => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await deleteDoc(doc(db, "reports", id));
      setOpenedReport(null);
      setSuccessMessage("Raporti u fshi.");
    } catch (e) {
      setErrorMessage("Gabim gjatë fshirjes.");
    } finally {
      setLoading(false);
    }
  };

  // UPDATE
  const updateReport = async (id) => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const finalPhotoURL = editPhoto
      ? Image.resolveAssetSource(editPhoto).uri
      : openedReport.photoURL;

    try {
      await updateDoc(doc(db, "reports", id), {
        description: editDescription,
        photoURL: finalPhotoURL,
      });

      setOpenedReport(null);
      setSuccessMessage("Raporti u përditësua.");
    } catch (e) {
      setErrorMessage("Gabim gjatë update.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 150 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Text style={styles.title}>Raporto një problem</Text>

          {/* STATUS */}
          {loadingReports && (
            <View style={styles.statusRow}>
              <ActivityIndicator size="small" color="#0077b6" />
              <Text style={styles.loadingText}>Duke ngarkuar...</Text>
            </View>
          )}

          {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

          {successMessage && (
            <Text style={styles.successText}>{successMessage}</Text>
          )}

          {/* MAP */}
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
            {pinLocation && <Marker coordinate={pinLocation} pinColor="blue" />}

            {reports.map((r) => (
              <Marker
                key={r.id}
                coordinate={{ latitude: r.latitude, longitude: r.longitude }}
                pinColor="red"
                onPress={() => {
                  setOpenedReport(r);
                  setEditDescription(r.description);
                  setEditPhoto(null);
                }}
              />
            ))}
          </MapView>

          {/* SELECT PHOTO */}
          <TouchableOpacity
            style={styles.photoButton}
            onPress={() => setPhotoPickerVisible(true)}
          >
            <Text style={styles.photoText}>
              {selectedPhoto ? "Ndrysho Fotën" : "Zgjidh Foto"}
            </Text>
          </TouchableOpacity>

          {/* DESCRIPTION */}
          <TextInput
            style={[styles.input, { minHeight: 60 }]}
            placeholder="Përshkrimi..."
            value={description}
            onChangeText={setDescription}
            multiline
          />

          {/* ADRESA AUTO */}
          {placeName !== "" && (
            <Text style={styles.autoAddress}>📍 Adresa: {placeName}</Text>
          )}

          {/* SEND */}
          <TouchableOpacity
            style={[styles.sendButton, { marginTop: 10 }]}
            onPress={sendReport}
            disabled={loading}
          >
            <Text style={styles.sendText}>
              {loading ? "Duke dërguar..." : "Dërgo Raportin"}
            </Text>
          </TouchableOpacity>

          {/* PHOTO PICKER MODAL */}
          <Modal visible={photoPickerVisible} transparent animationType="slide">
            <View style={styles.photoModal}>
              <Text style={styles.modalTitle}>Zgjidh Foto</Text>

              <ScrollView horizontal>
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

          {/* REPORT MODAL */}
          <Modal visible={openedReport !== null} animationType="slide">
            {openedReport && (
              <ScrollView contentContainerStyle={styles.modalScroll}>
                <View style={styles.modalContent}>
                  <Image
                    source={{ uri: openedReport.photoURL }}
                    style={styles.modalImage}
                  />

                  <Text style={styles.infoText}>
                    🏙 Vend: {openedReport.placeName}
                  </Text>
                  <Text style={styles.infoText}>
                    📍 Lat: {openedReport.latitude}
                  </Text>
                  <Text style={styles.infoText}>
                    📍 Lng: {openedReport.longitude}
                  </Text>

                  <TextInput
                    style={styles.editInput}
                    value={editDescription}
                    onChangeText={setEditDescription}
                    placeholder="Ndrysho përshkrimin..."
                    multiline
                  />

                  {/* CHANGE PHOTO */}
                  <TouchableOpacity
                    style={styles.updateButton}
                    onPress={() => setEditPhotoVisible(true)}
                  >
                    <Text style={styles.updateText}>Ndrysho Fotën</Text>
                  </TouchableOpacity>

                  {/* SAVE */}
                  <TouchableOpacity
                    style={styles.updateButton}
                    onPress={() => updateReport(openedReport.id)}
                  >
                    <Text style={styles.updateText}>Ruaj Ndryshimet</Text>
                  </TouchableOpacity>

                  {/* DELETE */}
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteReport(openedReport.id)}
                  >
                    <Text style={styles.deleteText}>Fshi Raportin</Text>
                  </TouchableOpacity>

                  {/* CLOSE */}
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setOpenedReport(null)}
                  >
                    <Text style={styles.closeText}>Mbyll</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </Modal>

          {/* EDIT PHOTO MODAL */}
          <Modal visible={editPhotoVisible} animationType="slide">
            <View style={styles.photoModal}>
              <Text style={styles.modalTitle}>Ndrysho Fotën</Text>

              <ScrollView horizontal>
                {photos.map((p, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setEditPhoto(p);
                      setEditPhotoVisible(false);
                    }}
                  >
                    <Image source={p} style={styles.horizontalThumb} />
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TouchableOpacity
                style={styles.closePhotoModalBtn}
                onPress={() => setEditPhotoVisible(false)}
              >
                <Text style={{ color: "white" }}>Mbyll</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ================== STYLES =====================
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 45 },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#023e8a",
  },

  statusRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  loadingText: { marginLeft: 8, color: "#0077b6" },
  errorText: { textAlign: "center", color: "red", marginTop: 10 },
  successText: { textAlign: "center", color: "green", marginTop: 10 },

  map: {
    height: 300,
    width: "100%",
    marginTop: 10,
    borderRadius: 10,
  },

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
    marginHorizontal: 20,
    marginTop: 20,
    padding: 10,
    backgroundColor: "white",
  },

  autoAddress: {
    textAlign: "center",
    marginTop: 10,
    color: "#0077b6",
    fontWeight: "bold",
    paddingHorizontal: 20,
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
    borderRadius: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#023e8a",
    marginBottom: 20,
  },

  horizontalThumb: {
    width: 120,
    height: 120,
    borderRadius: 15,
    marginRight: 15,
  },

  modalScroll: { paddingBottom: 80 },

  modalContent: { padding: 20 },

  modalImage: {
    width: "100%",
    height: 300,
    borderRadius: 15,
  },

  infoText: {
    marginTop: 7,
    fontSize: 14,
    color: "gray",
  },

  editInput: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 10,
    marginTop: 15,
    padding: 10,
  },

  updateButton: {
    backgroundColor: "#0077b6",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },

  updateText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  deleteButton: {
    backgroundColor: "#d00000",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },

  deleteText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  closeButton: {
    backgroundColor: "#023e8a",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },

  closeText: { color: "white", textAlign: "center" },
});
