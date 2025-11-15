import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";

import { auth } from "../../firebase";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";


WebBrowser.maybeCompleteAuthSession();

// ⚠️ WEB CLIENT ID nga Google → "Web client (auto created by Google Service)"
const WEB_CLIENT_ID =
  "483051599257-96qp4md9nulbifqt7l0iedv0qf31ebt4.apps.googleusercontent.com";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

 const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  clientId: WEB_CLIENT_ID,
  redirectUri: AuthSession.makeRedirectUri({
    useProxy: true,
  }),
});


  // MORE SAFE GOOGLE LOGIN HANDLING
  useEffect(() => {
    const handleGoogleLogin = async () => {
      if (response?.type !== "success") return;

      setLoading(true);
      try {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        await signInWithCredential(auth, credential);

        router.replace("/");
      } catch (err) {
        console.log("Google login error:", err);
        setError("Gabim gjatë kyçjes me Google.");
      } finally {
        setLoading(false);
      }
    };

    handleGoogleLogin();
  }, [response]);

  // EMAIL LOGIN
  const handleEmailLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Ju lutem shkruani email-in dhe fjalëkalimin.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/");
    } catch (err) {
      console.log("Email login error:", err);
      setError("Email ose fjalëkalim gabim.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
  source={require("../../assets/FixIt.png")}
  style={styles.logo}
/>

      <Text style={styles.title}>Kyçu</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {error !== "" && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity
        style={styles.btn}
        onPress={handleEmailLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Login</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.orText}>ose</Text>

      <TouchableOpacity
        style={styles.googleBtn}
        onPress={() => promptAsync()}
        disabled={!request || loading}
      >
        <Image
          source={{
            uri: "https://developers.google.com/identity/images/g-logo.png",
          }}
          style={styles.googleLogo}
        />
        <Text style={styles.googleText}>Vazhdo me Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
        <Text style={styles.link}>Nuk ke llogari? Regjistrohu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: "#fff", justifyContent: "center", paddingHorizontal: 24 },
  logo: {
  width: 140,
  height: 140,
  resizeMode: "contain",
  alignSelf: "center",
  marginBottom: 20,
},

  title: { fontSize: 28, fontWeight: "bold", marginBottom: 24, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12 },
  btn: { backgroundColor: "#023e8a", paddingVertical: 12, borderRadius: 8, alignItems: "center", marginTop: 8 },
  btnText: { color: "white", fontWeight: "600", fontSize: 16 },
  orText: { textAlign: "center", marginVertical: 16, color: "#555" },
  googleBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, paddingVertical: 10, marginBottom: 16 },
  googleLogo: { width: 20, height: 20, marginRight: 10 },
  googleText: { color: "#000", fontWeight: "600", fontSize: 16 },
  link: { marginTop: 10, textAlign: "center", color: "#007AFF" },
  error: { color: "red", marginBottom: 8, textAlign: "center" },
});
