import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  StyleSheet,
  Switch,
} from "react-native";

import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

import { db, auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { router, useNavigation } from "expo-router";

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [opened, setOpened] = useState(null);
  const navigation = useNavigation();

  // ============================ HEADER ============================
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Admin Dashboard",
      headerStyle: {
        backgroundColor: "#023e8a",
        height: 75,
      },
      headerTitleAlign: "center",
      headerTintColor: "white",
    });
  }, []);

  // ============================ LOGOUT ============================
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/(auth)/login");
    } catch (err) {
      console.log("logout error:", err);
    }
  };

  // ============================ Merr raportet ============================
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "reports"), (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setReports(list);
    });

    return () => unsub();
  }, []);

  // ============================ Toggle Finished ============================
  const toggleFinished = async (report) => {
    try {
      await updateDoc(doc(db, "reports", report.id), {
        finished: !report.finished,
      });
    } catch (err) {
      console.log("Update error:", err);
    }
  };

  // ============================ DELETE REPORT ============================
  const deleteReport = async (reportId) => {
    try {
      await deleteDoc(doc(db, "reports", reportId));
      setOpened(null);
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text style={styles.title}>Të gjitha raportet</Text>

        {reports.map((r) => (
          <View key={r.id} style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.place}>{r.placeName}</Text>
              <Text style={styles.desc}>{r.description}</Text>
              <Text style={styles.status}>
                Status: {r.finished ? "✔ Përfunduar" : "⏳ Në pritje"}
              </Text>
            </View>

            <View style={styles.rightBox}>
              <Switch
                value={r.finished}
                onValueChange={() => toggleFinished(r)}
              />

              <TouchableOpacity
                style={styles.detailsBtn}
                onPress={() => setOpened(r)}
              >
                <Text style={{ color: "white" }}>Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* ======================= LOGOUT BUTTON ======================= */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Çkyçu</Text>
        </TouchableOpacity>

        {/* ======================= FOOTER NORMAL ======================= */}
        <Text style={styles.footer}>
          Developed by Florida, Leona, Albison, Ali © 2025
        </Text>
      </ScrollView>

      {/* ============================ MODAL DETAILS ============================ */}
      <Modal visible={opened !== null} animationType="slide">
        {opened && (
          <ScrollView contentContainerStyle={{ padding: 20 }}>
            <Image
              source={{ uri: opened.photoURL }}
              style={{ height: 300, width: "100%", borderRadius: 10 }}
            />

            <Text style={styles.info}>📍 {opened.placeName}</Text>
            <Text style={styles.info}>Lat: {opened.latitude}</Text>
            <Text style={styles.info}>Lng: {opened.longitude}</Text>
            <Text style={styles.info}>Përshkrimi: {opened.description}</Text>

            <Text style={styles.reportedBy}>
              Raportuar nga: {opened.userEmail ?? "Nuk ka të dhëna"}
            </Text>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setOpened(null)}
            >
              <Text style={{ color: "white", textAlign: "center" }}>Mbyll</Text>
            </TouchableOpacity>

            {/* ======================= DELETE BUTTON ======================= */}
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => deleteReport(opened.id)}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Fshije Raportin
              </Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },

  item: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  place: { fontWeight: "bold", fontSize: 16 },
  desc: { color: "#555", marginTop: 5 },
  status: { marginTop: 5, fontWeight: "600" },

  rightBox: { justifyContent: "space-between", alignItems: "center" },

  detailsBtn: {
    backgroundColor: "#0077b6",
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
  },

  info: { marginTop: 10, fontSize: 16 },
  reportedBy: {
    marginTop: 15,
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },

  closeBtn: {
    backgroundColor: "#023e8a",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },

  deleteBtn: {
    backgroundColor: "#d00000",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },

  logoutBtn: {
    marginTop: 20,
    backgroundColor: "#ff4d6d",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  footer: {
    marginTop: 25,
    marginBottom: 10,
    textAlign: "center",
    color: "#888",
    fontSize: 14,
  },
});
