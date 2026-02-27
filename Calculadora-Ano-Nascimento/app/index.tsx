import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Keyboard,
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

    // Validações básicas
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

    // Primeiro cálculo base
    let anoBase = anoAtual - idadeNum;

    // Verifica se ainda NÃO fez aniversário este ano
    const fezAniversarioEsteAno =
      mesAtual > mesNum ||
      (mesAtual === mesNum && diaAtual >= diaNum);

    if (!fezAniversarioEsteAno) {
      anoBase -= 1;
    }

    setAnoNascimento(String(anoBase));
  };

  const atualizar = (novaIdade: string, novoDia: string, novoMes: string) => {
    calcularAnoNascimento(novaIdade, novoDia, novoMes);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora Ano de Nascimento</Text>
      <Text style={styles.label}>Digite sua idade</Text>
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
        onSubmitEditing={() => Keyboard.dismiss()}
        returnKeyType="done"
        maxLength={3}
      />

      <Text style={styles.label}>Dia do aniversário</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o dia"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={dia}
        onChangeText={(text) => {
          setDia(text);
          atualizar(idade, text, mes);
        }}
        maxLength={2}
      />

      <Text style={styles.label}>Mês do aniversário</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o mês"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={mes}
        onChangeText={(text) => {
          setMes(text);
          atualizar(idade, dia, text);
        }}
        maxLength={2}
      />


      <Text style={styles.label}>Ano de nascimento</Text>
      <TextInput
        style={[styles.input, styles.output]}
        value={anoNascimento}
        placeholder="Seu ano aparecerá aqui"
        placeholderTextColor="#666"
        editable={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
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
    marginBottom: 15,
    backgroundColor: "#1e1e1e",
    color: "#ffffff",
  },
  output: {
    backgroundColor: "#2a2a2a",
  },
});