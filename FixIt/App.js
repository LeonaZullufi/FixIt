import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from "./screens/Splash";
import ExploreScreen from "./screens/ExploreScreen";
import ReportScreen from "./screens/ReportScreen";
import ContatsHelp from "./screens/ContactsHelp";
import ProfileScreen from "./screens/ProfileScreen";
import ProblemsScreen from "./screens/ProblemsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen name="Problems" component={ProblemsScreen} />
        <Stack.Screen name="Report" component={ReportScreen} />
        <Stack.Screen name="Help" component={ContatsHelp} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function SplashScreenWithDelay({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return <Splash />;
}
