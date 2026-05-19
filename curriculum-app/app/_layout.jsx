import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#0a1628" },
          headerTintColor: "#f5d442",
          headerTitleStyle: { fontWeight: "bold", color: "#f5d442" },
        }}
      />
    </>
  );
}