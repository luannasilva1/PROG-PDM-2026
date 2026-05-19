import { View, Text, StyleSheet } from "react-native";

export default function Chip({ label, small }) {
  return (
    <View style={[styles.chip, small && styles.small]}>
      <Text style={[styles.text, small && styles.smallText]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: "#162040", borderRadius: 20, paddingHorizontal: 14,
    paddingVertical: 6, borderWidth: 1, borderColor: "#f5d442", margin: 3,
  },
  small: { paddingHorizontal: 10, paddingVertical: 4, borderColor: "#1e3060" },
  text: { color: "#f5d442", fontSize: 13, fontWeight: "600" },
  smallText: { color: "#8899bb", fontSize: 11 },
});