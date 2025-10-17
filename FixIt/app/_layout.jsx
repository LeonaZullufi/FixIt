import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#023e8a",
          borderBottomLeftRadius: 90,
          borderBottomRightRadius: 90,
        },
        headerTitleAlign: "center",
        headerTintColor: "white",
        tabBarActiveTintColor: "#A4FFFF",
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "#023e8a",
          borderTopWidth: 0.5,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={
                focused
                  ? require("../assets/home-click_icon.png")
                  : require("../assets/home_icon.png")
              }
              style={{
                width: size * 1.4,
                height: size * 1.4,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ProblemsScreen"
        options={{
          title: "Problems",
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={
                focused
                  ? require("../assets/location-click_icon.png")
                  : require("../assets/location_icon.png")
              }
              style={{
                width: size * 1.4,
                height: size * 1.4,
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="ReportScreen"
        options={{
          title: "FixIt",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../assets/FixIt-click.png")
                  : require("../assets/FixIt.png")
              }
              style={{
                width: 80,
                height: 80,
                marginBottom: 50,
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="ContactsHelp"
        options={{
          title: "Help",
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={
                focused
                  ? require("../assets/help-click_icon.png")
                  : require("../assets/help_icon.png")
              }
              style={{
                width: size * 1.4,
                height: size * 1.4,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={
                focused
                  ? require("../assets/profile-click_icon.png")
                  : require("../assets/profile_icon.png")
              }
              style={{
                width: size * 1.4,
                height: size * 1.4,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
