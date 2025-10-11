import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import AboutAppComponent from "../components/contacts/AboutAppComponent";
import FAQSectionComponent from "../components/contacts/FAQSectionComponent";
import ContactSection from "../components/contacts/ContactSection";
import AppInfo from "../components/contacts/AppInfo";
import Footer from "../components/Footer";

export default function ContactScreen() {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    message: "",
  });

  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  const handleSubmit = () => {
    console.log("Të dhënat e formularit:", form);
    alert("Mesazhi juaj u dërgua me sukses!");
    setForm({ name: "", lastName: "", email: "", message: "" });
    Keyboard.dismiss();
  };

  return (
    <View style={styles.mainContainer}>
      <Header />
      <KeyboardAwareScrollView
        style={styles.contentContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enableResetScrollToCoords={false}
        extraScrollHeight={20}
      >
        <View style={styles.inner}>
          <View style={styles.header}>
            <Ionicons name="information-circle" size={28} color="#17cbebff" />
            <Text style={[styles.title, { marginTop: 8 }]}>
              FixIt – Ndihmë & Udhëzime
            </Text>
          </View>

          <AppInfo />
          <AboutAppComponent />
          <FAQSectionComponent />

          <Text style={[styles.title, { marginTop: 10 }]}>
            Informacione Kontakti
          </Text>
          <Text style={styles.subtitle}>
            Plotësoni formularin dhe ekipi ynë do t’ju kontaktojë brenda 24
            orëve
          </Text>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Emri"
              placeholderTextColor="#aaa"
              value={form.name}
              onChangeText={(text) => handleChange("name", text)}
              returnKeyType="next"
              onSubmitEditing={() => lastNameRef.current?.focus()}
              scrollEnabled={false}
            />
            <TextInput
              ref={lastNameRef}
              style={styles.input}
              placeholder="Mbiemri"
              placeholderTextColor="#aaa"
              value={form.lastName}
              onChangeText={(text) => handleChange("lastName", text)}
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()}
              scrollEnabled={false}
            />
            <TextInput
              ref={emailRef}
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#aaa"
              value={form.email}
              onChangeText={(text) => handleChange("email", text)}
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => messageRef.current?.focus()}
              scrollEnabled={false}
            />
            <TextInput
              ref={messageRef}
              style={[styles.input, styles.textArea]}
              placeholder="Mesazhi"
              placeholderTextColor="#aaa"
              value={form.message}
              onChangeText={(text) => handleChange("message", text)}
              multiline
              numberOfLines={4}
              returnKeyType="done"
              scrollEnabled={false}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Dërgo Mesazhin</Text>
            </TouchableOpacity>
          </View>

          <ContactSection />
        </View>
      </KeyboardAwareScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "white" },

  contentContainer: {
    flexGrow: 1,
    padding: 20,
  },

  inner: {
    flex: 1,
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    color: "black",
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "black",
    textAlign: "center",
    marginBottom: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  formContainer: {
    width: "100%",
    backgroundColor: "#023e8a",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#FF5E5E",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
