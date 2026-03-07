import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

export default function Index() {
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [idade, setIdade] = useState("");
  const [anoNascimento, setAnoNascimento] = useState("");

  const calcularAnoNascimento = (
    idadeStr: string,
    diaStr: string,
    mesStr: string
  ) => {
    const idadeNum = Number(idadeStr);
    const diaNum = Number(diaStr);
    const mesNum = Number(mesStr);

    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtual = hoje.getMonth() + 1;
    const diaAtual = hoje.getDate();

    if (
      !idadeStr ||
      !diaStr ||
      !mesStr ||
      isNaN(idadeNum) ||
      isNaN(diaNum) ||
      isNaN(mesNum) ||
      idadeNum < 0 ||
      mesNum < 1 ||
      mesNum > 12 ||
      diaNum < 1 ||
      diaNum > 31
    ) {
      setAnoNascimento("");
      return;
    }

    let anoBase = anoAtual - idadeNum;

    const fezAniversarioEsteAno =
      mesAtual > mesNum || (mesAtual === mesNum && diaAtual >= diaNum);

    if (!fezAniversarioEsteAno) {
      anoBase -= 1;
    }

    setAnoNascimento(String(anoBase));
  };

  const atualizar = (novaIdade: string, novoDia: string, novoMes: string) => {
    calcularAnoNascimento(novaIdade, novoDia, novoMes);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Calculadora Ano de Nascimento</Text>

          {/* PRIMEIRA LINHA */}
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Idade</Text>
              <TextInput
                style={styles.input}
                placeholder="Sua idade"
                placeholderTextColor="#888"
                keyboardType="numeric"
                value={idade}
                onChangeText={(text) => {
                  setIdade(text);
                  atualizar(text, dia, mes);
                }}
                onSubmitEditing={Keyboard.dismiss}
                returnKeyType="done"
                maxLength={3}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Dia</Text>
              <TextInput
                style={styles.input}
                placeholder="Dia"
                placeholderTextColor="#888"
                keyboardType="numeric"
                value={dia}
                onChangeText={(text) => {
                  setDia(text);
                  atualizar(idade, text, mes);
                }}
                maxLength={2}
              />
            </View>
          </View>

          {/* SEGUNDA LINHA */}
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mês</Text>
              <TextInput
                style={styles.input}
                placeholder="Mês"
                placeholderTextColor="#888"
                keyboardType="numeric"
                value={mes}
                onChangeText={(text) => {
                  setMes(text);
                  atualizar(idade, dia, text);
                }}
                maxLength={2}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Ano de nascimento</Text>
              <TextInput
                style={[styles.input, styles.output]}
                value={anoNascimento}
                placeholder="Ano"
                placeholderTextColor="#666"
                editable={false}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#121212",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#ffffff",
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
  },
  inputGroup: {
    flex: 1,
  },
  label: {
    color: "#bbbbbb",
    marginBottom: 5,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#1e1e1e",
    color: "#ffffff",
  },
  output: {
    backgroundColor: "#2a2a2a",
  },
});