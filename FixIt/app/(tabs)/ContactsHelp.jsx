import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import AboutAppComponent from "../../components/contacts/AboutAppComponent";
import FAQSectionComponent from "../../components/contacts/FAQSectionComponent";
import ContactSection from "../../components/contacts/ContactSection";
import AppInfo from "../../components/contacts/AppInfo";

export default function ContactScreen() {
  const navigation = useNavigation();
  const lastHeaderState = useRef(true);

  const handleScroll = (event) => {
    const currentY = event.nativeEvent.contentOffset.y;

    if (currentY > 50 && lastHeaderState.current) {
      navigation.setOptions({ headerShown: false });
      lastHeaderState.current = false;
      StatusBar.setBarStyle("dark-content");
    }

    if (currentY < 30 && !lastHeaderState.current) {
      navigation.setOptions({ headerShown: true });
      lastHeaderState.current = true;
      StatusBar.setBarStyle("light-content");
    }
  };

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  const validateForm = () => {
    let newErrors = {};

    const nameRegex = /^[A-Za-zÀ-ž\s]+$/;

    if (form.message.trim().length < 6)
      newErrors.message = "Mesazhi duhet të ketë të paktën 6 karaktere.";

    setErrors(newErrors);

    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      let msg = "Ju lutem korrigjoni këtë gabim:\n\n";

      if (validationErrors.message) msg += `• ${validationErrors.message}\n`;

      alert(msg);
      return;
    }

    alert("Mesazhi juaj u dërgua me sukses!");
    setForm({ name: "", lastName: "", email: "", message: "" });
    setErrors({});
    Keyboard.dismiss();
  };

  return (
    <View style={styles.mainContainer}>
      <KeyboardAwareScrollView
        style={styles.contentContainer}
        enableResetScrollToCoords={false}
        extraScrollHeight={20}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
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
              style={[styles.input, errors.name && styles.errorInput]}
              placeholder="Emri"
              placeholderTextColor="#aaa"
              value={form.name}
              onChangeText={(text) => handleChange("name", text)}
              onSubmitEditing={() => lastNameRef.current?.focus()}
            />

            <TextInput
              ref={lastNameRef}
              style={[styles.input, errors.lastName && styles.errorInput]}
              placeholder="Mbiemri"
              placeholderTextColor="#aaa"
              value={form.lastName}
              onChangeText={(text) => handleChange("lastName", text)}
              onSubmitEditing={() => emailRef.current?.focus()}
            />

            <TextInput
              ref={emailRef}
              style={[styles.input, errors.email && styles.errorInput]}
              placeholder="Email"
              placeholderTextColor="#aaa"
              value={form.email}
              onChangeText={(text) => handleChange("email", text)}
              keyboardType="email-address"
              onSubmitEditing={() => messageRef.current?.focus()}
            />

            <TextInput
              ref={messageRef}
              style={[
                styles.input,
                styles.textArea,
                errors.message && styles.errorInput,
              ]}
              placeholder="Mesazhi (min. 6 karaktere)"
              placeholderTextColor="#aaa"
              value={form.message}
              onChangeText={(text) => handleChange("message", text)}
              multiline
              numberOfLines={4}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Dërgo Mesazhin</Text>
            </TouchableOpacity>
          </View>

          <ContactSection />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
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
    backgroundColor: "#ced4da",
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
    backgroundColor: "#023e8a",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  errorInput: {
    borderWidth: 2,
    borderColor: "red",
  },
});
