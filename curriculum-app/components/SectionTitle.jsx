import { Text, StyleSheet } from "react-native";

export default function SectionTitle({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16, fontWeight: "800", color: "#f5d442",
    marginTop: 22, marginBottom: 10, letterSpacing: 0.5,
  },
});