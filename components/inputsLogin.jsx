import { StyleSheet, Text, TextInput, View, Button } from "react-native";

export default function InputLogin() {
  return (
    <View style={styles.container}>
      <Text>Faz o L</Text>
      <View>
        <Text>Email</Text>
        <TextInput placeholder="Insira o email" style={[styles.input_email, styles.input_default]} />
      </View>
      <View>
        <Text>Senha</Text>
        <TextInput placeholder="Insira a senha" style={[styles.input_password, styles.input_default]} />
      </View>
      <Button title="Entrar" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b8b8b8",
    alignItems: "center",
    justifyContent: "center",
  },
  input_email: {},
  input_default: {
    backgroundColor: "#fff",
    height: 40,
    width: 150,
    margin: 12,
    borderWidth: 1,
    borderRadius: 7,
    paddingLeft: 5
  },
  input_password: {},
});
