import * as React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import TitleLoginRegister from "../components/titleFinanca.jsx";
import colorsDefault from "../styles/colors.js";
import InputLogin from "../components/inputLogin.jsx";

export default function RegisterScreen({ navigation }) {
  return (
    <View style={styles.container_main}>
        <View style={styles.container_main_inputs}>
          <View style={styles.container_inputs}>
            <InputLogin placeholder="Nome" type="givenName"/>
            <InputLogin placeholder="Email" type="emailAddress"/>
            <InputLogin placeholder="Senha" type="password"/>
            <InputLogin placeholder="Repita sua senha" type="password"/>
            <Button title="Entrar" />
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container_main: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colorsDefault.primary,
  },
  container_main_inputs: {
    height: "50%",
  },
  container_inputs: {
    width: 250,
    alignItems: "center",
  },
});
