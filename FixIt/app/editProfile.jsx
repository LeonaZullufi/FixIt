import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function EditProfile() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const ACTUAL_PASSWORD = "123456";

  const validateForm = () => {
    let newErrors = {};
    const nameRegex = /^[A-Za-zÀ-ž\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.firstName.trim())
      newErrors.firstName = "Emri është i detyrueshëm.";
    else if (!nameRegex.test(form.firstName))
      newErrors.firstName = "Emri nuk është valid (vetëm shkronja).";

    if (!form.lastName.trim())
      newErrors.lastName = "Mbiemri është i detyrueshëm.";
    else if (!nameRegex.test(form.lastName))
      newErrors.lastName = "Mbiemri nuk është valid (vetëm shkronja).";

    if (!form.email.trim()) newErrors.email = "Email është i detyrueshëm.";
    else if (!emailRegex.test(form.email))
      newErrors.email = "Email nuk është në format të saktë.";

    if (!form.currentPassword)
      newErrors.currentPassword = "Shkruani password-in aktual.";
    else if (form.currentPassword !== ACTUAL_PASSWORD)
      newErrors.currentPassword = "Password-i aktual është i pasaktë.";

    if (form.newPassword && form.newPassword.length < 6)
      newErrors.newPassword =
        "Password-i i ri duhet të ketë të paktën 6 karaktere.";
    if (form.newPassword && form.newPassword !== form.confirmPassword)
      newErrors.confirmPassword = "Password-et nuk përputhen.";

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      let msg = "Ju lutem korrigjoni këto gabime:\n\n";
      Object.values(validationErrors).forEach((err) => {
        msg += `• ${err}\n`;
      });
      Alert.alert("Gabime në formular", msg);
      return;
    }

    Alert.alert("Sukses", "Profili u përditësua me sukses!");
    Keyboard.dismiss();
    router.replace("/Profile");
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={20}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/Profile")}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profil</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Emri</Text>
        <TextInput
          style={[styles.input, errors.firstName && styles.inputError]}
          value={form.firstName}
          onChangeText={(text) => setForm({ ...form, firstName: text })}
          placeholder="Shkruani emrin"
        />
        {errors.firstName && (
          <Text style={styles.errorText}>{errors.firstName}</Text>
        )}

        <Text style={styles.label}>Mbiemri</Text>
        <TextInput
          style={[styles.input, errors.lastName && styles.inputError]}
          value={form.lastName}
          onChangeText={(text) => setForm({ ...form, lastName: text })}
          placeholder="Shkruani mbiemrin"
        />
        {errors.lastName && (
          <Text style={styles.errorText}>{errors.lastName}</Text>
        )}

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
          placeholder="email@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <Text style={styles.label}>Password aktual (për siguri)</Text>
        <TextInput
          style={[styles.input, errors.currentPassword && styles.inputError]}
          value={form.currentPassword}
          onChangeText={(text) => setForm({ ...form, currentPassword: text })}
          placeholder="Shkruani password-in aktual"
          secureTextEntry
        />
        {errors.currentPassword && (
          <Text style={styles.errorText}>{errors.currentPassword}</Text>
        )}

        <Text style={styles.label}>Password i ri (opsional)</Text>
        <TextInput
          style={[styles.input, errors.newPassword && styles.inputError]}
          value={form.newPassword}
          onChangeText={(text) => setForm({ ...form, newPassword: text })}
          placeholder="Lëreni bosh nëse nuk doni të ndryshoni"
          secureTextEntry
        />
        {errors.newPassword && (
          <Text style={styles.errorText}>{errors.newPassword}</Text>
        )}

        <Text style={styles.label}>Konfirmo password-in e ri</Text>
        <TextInput
          style={[styles.input, errors.confirmPassword && styles.inputError]}
          value={form.confirmPassword}
          onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
          placeholder="Përsëritni password-in e ri"
          secureTextEntry
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        )}

        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>Ruaj Ndryshimet</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomColor: "#eee",
  },
  title: { fontSize: 20, fontWeight: "bold" },
  content: { padding: 20, paddingBottom: 40 },
  label: {
    fontSize: 14,
    color: "#333",
    marginTop: 16,
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  inputError: { borderColor: "#dc3545" },
  errorText: { color: "#dc3545", fontSize: 12, marginTop: 4 },
  saveButton: {
    marginTop: 30,
    backgroundColor: "#023e8a",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
