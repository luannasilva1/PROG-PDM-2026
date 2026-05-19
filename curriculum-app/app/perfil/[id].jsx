import { useState } from "react";
import {
  View, Text, StyleSheet, ActivityIndicator,
  TouchableOpacity, ScrollView, Linking,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { useProfileDetail } from "../../hooks/useProfile";
import SectionTitle from "../../components/SectionTitle";
import ExpCard from "../../components/ExpCard";
import Chip from "../../components/Chip";

const TABS = [
  { key: "sobre",        label: "Sobre",        icon: "👤" },
  { key: "academico",    label: "Acadêmico",    icon: "🎓" },
  { key: "profissional", label: "Profissional", icon: "💼" },
  { key: "projetos",     label: "Projetos",     icon: "🚀" },
];

export default function PerfilScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { profile, experiences, educations, skills, projects, contacts, loading } =
    useProfileDetail(id);
  const [tab, setTab] = useState("sobre");

  useEffect(() => {
    if (profile) {
      navigation.setOptions({ title: profile.name ?? profile.nome ?? "Perfil" });
    }
  }, [profile]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f5d442" />
        <Text style={styles.loadingText}>Carregando currículo...</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Perfil não encontrado.</Text>
      </View>
    );
  }

  const name = profile.name ?? profile.nome ?? "";
  const title = profile.title ?? profile.cargo ?? profile.headline ?? "";
  const bio = profile.bio ?? profile.resumo ?? profile.about ?? "";

  return (
    <View style={styles.container}>
      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.bigAvatar}>
          <Text style={styles.bigAvatarText}>{name.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.heroName}>{name}</Text>
        {title ? <Text style={styles.heroTitle}>{title}</Text> : null}

        {/* Contatos rápidos */}
        {contacts.length > 0 && (
          <View style={styles.contactRow}>
            {contacts.map((c, i) => {
              const label = c.type ?? c.tipo ?? c.label ?? "";
              const value = c.value ?? c.valor ?? c.url ?? "";
              return (
                <TouchableOpacity
                  key={i}
                  style={styles.contactBadge}
                  onPress={() => value && Linking.openURL(value.startsWith("http") ? value : `mailto:${value}`)}
                >
                  <Text style={styles.contactBadgeText}>{label || value}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {TABS.map((t) => (
          <TouchableOpacity
            key={t.key}
            style={[styles.tab, tab === t.key && styles.tabActive]}
            onPress={() => setTab(t.key)}
          >
            <Text style={styles.tabIcon}>{t.icon}</Text>
            <Text style={[styles.tabText, tab === t.key && styles.tabTextActive]}>
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {tab === "sobre" && (
          <SobreTab bio={bio} skills={skills} contacts={contacts} />
        )}
        {tab === "academico" && <AcademicoTab educations={educations} />}
        {tab === "profissional" && <ProfissionalTab experiences={experiences} />}
        {tab === "projetos" && <ProjetosTab projects={projects} />}
      </ScrollView>
    </View>
  );
}

/* ── Sub-telas ─────────────────────────────────────── */

function SobreTab({ bio, skills, contacts }) {
  return (
    <View>
      <SectionTitle>Resumo</SectionTitle>
      {bio
        ? <Text style={styles.bio}>{bio}</Text>
        : <Text style={styles.empty}>Sem resumo cadastrado.</Text>
      }

      <SectionTitle>🛠️ Habilidades</SectionTitle>
      {skills.length > 0
        ? (
          <View style={styles.chips}>
            {skills.map((s, i) => (
              <Chip key={i} label={s.name ?? s.nome ?? s.skill ?? s} />
            ))}
          </View>
        )
        : <Text style={styles.empty}>Nenhuma habilidade cadastrada.</Text>
      }

      <SectionTitle> Funcionalidade Extra</SectionTitle>
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
            Busca de perfis por nome na Home{"\n"}
            Navegação entre múltiplos currículos{"\n"}
            Abas por seção dentro de cada perfil{"\n"}
            Links de contato clicáveis (e-mail / redes){"\n"}
            Design azul marinho + amarelo manteiga
        </Text>
      </View>
    </View>
  );
}

function AcademicoTab({ educations }) {
  return (
    <View>
      <SectionTitle>🎓 Formação Acadêmica</SectionTitle>
      {educations.length === 0
        ? <Text style={styles.empty}>Nenhum registro acadêmico.</Text>
        : educations.map((e, i) => (
          <ExpCard
            key={i}
            title={e.course ?? e.curso ?? e.degree ?? e.titulo ?? e.name ?? ""}
            subtitle={e.institution ?? e.instituicao ?? e.school ?? ""}
            period={e.period ?? e.periodo ?? (e.start_year ? `${e.start_year} – ${e.end_year ?? "atual"}` : null)}
            description={e.description ?? e.descricao ?? ""}
          />
        ))
      }
    </View>
  );
}

function ProfissionalTab({ experiences }) {
  return (
    <View>
      <SectionTitle>💼 Experiência Profissional</SectionTitle>
      {experiences.length === 0
        ? <Text style={styles.empty}>Nenhuma experiência profissional.</Text>
        : experiences.map((e, i) => (
          <ExpCard
            key={i}
            title={e.role ?? e.cargo ?? e.position ?? e.titulo ?? ""}
            subtitle={e.company ?? e.empresa ?? ""}
            period={e.period ?? e.periodo ?? (e.start_date ? `${e.start_date} – ${e.end_date ?? "atual"}` : null)}
            description={e.description ?? e.descricao ?? ""}
          />
        ))
      }
    </View>
  );
}

function ProjetosTab({ projects }) {
  return (
    <View>
      <SectionTitle>🚀 Projetos</SectionTitle>
      {projects.length === 0
        ? <Text style={styles.empty}>Nenhum projeto cadastrado.</Text>
        : projects.map((p, i) => (
          <View key={i} style={styles.projectCard}>
            <Text style={styles.projectName}>{p.name ?? p.nome ?? p.title ?? p.titulo ?? ""}</Text>
            {(p.description ?? p.descricao) &&
              <Text style={styles.projectDesc}>{p.description ?? p.descricao}</Text>
            }
            {(p.technologies ?? p.tecnologias)?.length > 0 && (
              <View style={styles.chips}>
                {(p.technologies ?? p.tecnologias).map((t, j) => (
                  <Chip key={j} label={typeof t === "string" ? t : t.name ?? t.nome} small />
                ))}
              </View>
            )}
            {(p.url ?? p.link ?? p.repo) && (
              <TouchableOpacity
                onPress={() => Linking.openURL(p.url ?? p.link ?? p.repo)}
                style={styles.linkBtn}
              >
                <Text style={styles.linkBtnText}>🔗 Acessar projeto</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      }
    </View>
  );
}

/* ── Styles ─────────────────────────────────────────── */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a1628" },
  center: { flex: 1, backgroundColor: "#0a1628", justifyContent: "center", alignItems: "center" },
  loadingText: { color: "#f5d442", marginTop: 12, fontSize: 16 },
  errorText: { color: "#f5d442", fontSize: 16 },

  hero: {
    backgroundColor: "#111f3a", alignItems: "center",
    paddingVertical: 24, paddingHorizontal: 20,
    borderBottomWidth: 1, borderBottomColor: "#1e3060",
  },
  bigAvatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: "#f5d442", justifyContent: "center",
    alignItems: "center", marginBottom: 12,
  },
  bigAvatarText: { fontSize: 34, fontWeight: "900", color: "#0a1628" },
  heroName: { fontSize: 22, fontWeight: "800", color: "#fff", textAlign: "center" },
  heroTitle: { color: "#f5d442", fontSize: 14, fontWeight: "600", marginTop: 4, textAlign: "center" },

  contactRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginTop: 12, gap: 8 },
  contactBadge: {
    backgroundColor: "#162040", borderRadius: 20, paddingHorizontal: 12,
    paddingVertical: 5, borderWidth: 1, borderColor: "#1e3060",
  },
  contactBadgeText: { color: "#8899bb", fontSize: 12 },

  tabs: {
    flexDirection: "row", backgroundColor: "#111f3a",
    borderBottomWidth: 1, borderBottomColor: "#1e3060",
  },
  tab: { flex: 1, paddingVertical: 10, alignItems: "center" },
  tabActive: { borderBottomWidth: 3, borderBottomColor: "#f5d442" },
  tabIcon: { fontSize: 16 },
  tabText: { color: "#8899bb", fontSize: 11, fontWeight: "600", marginTop: 2 },
  tabTextActive: { color: "#f5d442", fontWeight: "800" },

  content: { padding: 16, paddingBottom: 48 },

  bio: { color: "#ccd6f6", fontSize: 14, lineHeight: 22 },
  empty: { color: "#8899bb", fontSize: 14, fontStyle: "italic" },

  chips: { flexDirection: "row", flexWrap: "wrap" },

  infoBox: {
    backgroundColor: "#162040", borderRadius: 12, padding: 16,
    borderLeftWidth: 4, borderLeftColor: "#f5d442", marginTop: 4,
  },
  infoBoxText: { color: "#ccd6f6", fontSize: 13, lineHeight: 24 },

  projectCard: {
    backgroundColor: "#111f3a", borderRadius: 14, padding: 16,
    marginBottom: 12, borderWidth: 1, borderColor: "#1e3060",
  },
  projectName: { fontSize: 15, fontWeight: "700", color: "#fff", marginBottom: 6 },
  projectDesc: { fontSize: 13, color: "#ccd6f6", lineHeight: 20, marginBottom: 6 },

  linkBtn: {
    marginTop: 10, backgroundColor: "#162040", borderRadius: 8,
    paddingVertical: 8, paddingHorizontal: 14, alignSelf: "flex-start",
    borderWidth: 1, borderColor: "#f5d442",
  },
  linkBtnText: { color: "#f5d442", fontSize: 12, fontWeight: "700" },
});