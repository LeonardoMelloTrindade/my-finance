import * as React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import TitleLoginRegister from "../components/titleFinanca.jsx";
import colorsDefault from "../styles/colors.js";
import InputLogin from "../components/inputLogin.jsx";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container_main}>
      <TitleLoginRegister />
      <View style={styles.container_main_inputs}>
        <View style={styles.container_inputs}>
          <InputLogin placeholder="Email" type="emailAddress" />
          <InputLogin placeholder="********" type="password" />
          <View style={styles.container_buttons}>
            <View style={styles.button_wrapper}>
              <Button title="Entrar" />
            </View>
            <View style={styles.button_wrapper}>
              <Button
                title="Registrar"
                onPress={() => navigation.navigate("Register")}
              />
            </View>
          </View>
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
  container_buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  button_wrapper: {
    flex: 1,
    marginHorizontal: 10,
  },
});
