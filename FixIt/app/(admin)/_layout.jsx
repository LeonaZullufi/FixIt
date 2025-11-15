import { Stack } from "expo-router";

export default function AdminLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#023e8a",
          height: 75,
        },
        headerTintColor: "white",
        headerTitleAlign: "center",
      }}
    />
  );
}
