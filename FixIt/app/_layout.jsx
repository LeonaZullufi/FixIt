// app/_layout.jsx
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; // firebase.js e ke në root të projektit

export default function RootLayout() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setReady(true);
    });
    return unsub;
  }, []);

  // derisa po e kontrollon user-in, mos shfaq asgjë
  if (!ready) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        // nëse ka user -> futu në tabs
        <Stack.Screen name="(tabs)" />
      ) : (
        // nëse s’ka user -> futu në auth
        <Stack.Screen name="(auth)" />
      )}
    </Stack>
  );
}
