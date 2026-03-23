import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    Asset.loadAsync([
      require("../assets/disasters/flood.png"),
      require("../assets/disasters/earthquake.png"),
      require("../assets/disasters/fire.png"),
    ]);
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0B1220",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontWeight: "700",
          },
          contentStyle: {
            backgroundColor: "#0B1220",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="disasters"
          options={{
            title: "Emergency Guidance",
            headerBackTitle: "Home",
          }}
        />

        <Stack.Screen
          name="guidance"
          options={{
            title: "Guidance",
            headerBackTitle: "Back",
          }}
        />

        <Stack.Screen
          name="map"
          options={{
            title: "Offline Map",
            headerBackTitle: "Home",
          }}
        />

        <Stack.Screen
          name="checklist"
          options={{
            title: "Preparedness Checklist",
            headerBackTitle: "Home",
          }}
        />

        <Stack.Screen
          name="contacts"
          options={{
            title: "Emergency Contacts",
            headerBackTitle: "Home",
          }}
        />

        <Stack.Screen
          name="alerts"
          options={{
            title: "Alerts & Advisories",
            headerBackTitle: "Home",
          }}
        />

        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            title: "Modal",
          }}
        />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}