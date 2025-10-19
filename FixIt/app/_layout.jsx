import { Tabs } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <View style={styles.root}>
      {/* Status bar sipër */}
      <StatusBar style="light" translucent backgroundColor="#023e8a" />

      {/* Safe area përmbajtja kryesore */}
      <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
        <Tabs
          screenOptions={{
            headerStyle: {
              height: 75,
              backgroundColor: "#023e8a",
            },
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerBackground: () => (
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#023e8a",
                  borderBottomLeftRadius: 90,
                  borderBottomRightRadius: 90,
                }}
              />
            ),
            tabBarActiveTintColor: "#A4FFFF",
            tabBarInactiveTintColor: "white",
            tabBarStyle: {
              backgroundColor: "#023e8a",
              borderTopWidth: 0,
              height: 70,
              paddingBottom: 10,
              paddingTop: 10,
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
                  style={{ width: size * 1.4, height: size * 1.4 }}
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
                  style={{ width: size * 1.4, height: size * 1.4 }}
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
                  style={{ width: 80, height: 80, marginBottom: 50 }}
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
                  style={{ width: size * 1.4, height: size * 1.4 }}
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
                  style={{ width: size * 1.4, height: size * 1.4 }}
                />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#023e8a",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#023e8a",
  },
});
