import { useEffect, useState } from "react";
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, ActivityIndicator, TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { useProfiles } from "../hooks/useProfile";

export default function Home() {
  const { data: profiles, loading } = useProfiles();
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(profiles.filter((p) =>
      (p.name ?? p.nome ?? "").toLowerCase().includes(q)
    ));
  }, [search, profiles]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f5d442" />
        <Text style={styles.loadingText}>Carregando perfis...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Curriculum App</Text>
        <Text style={styles.subtitle}>{profiles.length} perfil(is) cadastrado(s)</Text>
      </View>

      <TextInput
        style={styles.search}
        placeholder="Buscar por nome..."
        placeholderTextColor="#8899bb"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item._id ?? item.id)}
        contentContainerStyle={{ paddingBottom: 32 }}
        renderItem={({ item }) => {
          const name = item.name ?? item.nome ?? "Sem nome";
          const title = item.title ?? item.cargo ?? "";
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({ pathname: "/perfil/[id]", params: { id: item._id ?? item.id } })
              }
              activeOpacity={0.85}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.nome}>{name}</Text>
                {title ? <Text style={styles.cargo}>{title}</Text> : null}
                <Text style={styles.meta}>Ver currículo completo →</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum perfil encontrado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a1628", paddingHorizontal: 16, paddingTop: 16 },
  center: { flex: 1, backgroundColor: "#0a1628", justifyContent: "center", alignItems: "center" },
  loadingText: { color: "#f5d442", marginTop: 12, fontSize: 16 },
  header: { marginBottom: 18, alignItems: "center" },
  title: { fontSize: 28, fontWeight: "900", color: "#f5d442", letterSpacing: 1 },
  subtitle: { color: "#8899bb", fontSize: 13, marginTop: 4 },
  search: {
    backgroundColor: "#162040", borderRadius: 12, paddingHorizontal: 16,
    paddingVertical: 10, color: "#fff", fontSize: 15, marginBottom: 16,
    borderWidth: 1, borderColor: "#1e3060",
  },
  card: {
    backgroundColor: "#111f3a", borderRadius: 16, padding: 16,
    marginBottom: 12, flexDirection: "row", alignItems: "center",
    borderWidth: 1, borderColor: "#1e3060",
    shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 6, elevation: 4,
  },
  avatar: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: "#f5d442", justifyContent: "center",
    alignItems: "center", marginRight: 14,
  },
  avatarText: { fontSize: 22, fontWeight: "900", color: "#0a1628" },
  nome: { fontSize: 16, fontWeight: "700", color: "#fff", marginBottom: 2 },
  cargo: { fontSize: 13, color: "#f5d442", fontWeight: "600", marginBottom: 2 },
  meta: { fontSize: 12, color: "#8899bb", marginTop: 1 },
  arrow: { fontSize: 26, color: "#f5d442", fontWeight: "300" },
  empty: { color: "#8899bb", textAlign: "center", marginTop: 40, fontSize: 15 },
});