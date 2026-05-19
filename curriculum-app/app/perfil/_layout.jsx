import { Stack } from "expo-router";

export default function PerfilLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#0a1628" },
        headerTintColor: "#f5d442",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    />
  );
}