import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Keyboard,
} from "react-native";

export default function Index() {
  const [anoNascimento, setAnoNascimento] = useState("");
  const [idade, setIdade] = useState("");

  const calcularIdade = (ano: string) => {
    const anoAtual = new Date().getFullYear();
    const idadeCalculada = anoAtual - Number(ano);

    if (!ano || isNaN(idadeCalculada) || idadeCalculada < 0) {
      setIdade("");
    } else {
      setIdade(String(idadeCalculada));
    }
  };

  const handleChange = (text: string) => {
    setAnoNascimento(text);
    calcularIdade(text); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora de Idade</Text>

      
      <TextInput
        style={styles.input}
        placeholder="Digite seu ano de nascimento"
        keyboardType="numeric"
        value={anoNascimento}
        onChangeText={handleChange}
        onSubmitEditing={() => Keyboard.dismiss()} 
        returnKeyType="done"
        maxLength={4}
      />

     
      <TextInput
        style={[styles.input, styles.output]}
        placeholder="Sua idade aparecerá aqui"
        value={idade}
        editable={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  output: {
    backgroundColor: "#f2f2f2",
  },
});