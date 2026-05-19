import { View, Text, StyleSheet } from "react-native";
import Chip from "./Chip";

export default function ExpCard({ title, subtitle, period, description, tags }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {period ? <Text style={styles.period}>📅 {period}</Text> : null}
      {description ? <Text style={styles.desc}>{description}</Text> : null}
      {tags?.length ? (
        <View style={styles.chips}>
          {tags.map((t, i) => <Chip key={i} label={t} small />)}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#111f3a", borderRadius: 14, padding: 16,
    marginBottom: 12, borderWidth: 1, borderColor: "#1e3060",
  },
  title: { fontSize: 15, fontWeight: "700", color: "#fff", marginBottom: 3 },
  subtitle: { fontSize: 13, color: "#f5d442", fontWeight: "600" },
  period: { fontSize: 12, color: "#8899bb", marginTop: 4 },
  desc: { fontSize: 13, color: "#ccd6f6", marginTop: 6, lineHeight: 20 },
  chips: { flexDirection: "row", flexWrap: "wrap", marginTop: 8 },
});