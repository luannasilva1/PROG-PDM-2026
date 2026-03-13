import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        
        {/* FOTO */}
        <Image
          source={require("../assets/images/perfil.jpg")}
          style={styles.photo}
        />

        {/* BIO */}
        <Text style={styles.name}>Luanna Evellyn</Text>

        <Text style={styles.description}>
          Desenvolvedora focada no ecossistema Salesforce, trabalhando com Apex
          e Lightning Web Components. Também possuo experiência com Java e
          desenvolvimento de aplicações web. Sou estudante de Sistemas para
          Internet na Universidade Católica de Pernambuco e estou sempre
          buscando evoluir minhas habilidades em tecnologia.
        </Text>

        {/* LOGOS */}
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/5968/5968914.png" }}
            style={styles.logo}
          />

          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/226/226777.png" }}
            style={styles.logo}
          />

          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png" }}
            style={styles.logo}
          />
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F1FA",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    maxWidth: 350,
    borderRadius: 20,
    padding: 25,
    alignItems: "center",

    shadowColor: "#6B6BB0",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,

    elevation: 8,
  },

  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#CFCBFF",
  },

  name: {
    fontSize: 22,
    fontWeight: "600",
    color: "#4A4A7A",
    marginBottom: 10,
  },

  description: {
    textAlign: "center",
    fontSize: 15,
    color: "#6E6E8E",
    lineHeight: 22,
    marginBottom: 25,
  },

  logoContainer: {
    flexDirection: "row",
    gap: 20,
  },

  logo: {
    width: 45,
    height: 45,
    resizeMode: "contain",
    opacity: 0.85,
  },
});