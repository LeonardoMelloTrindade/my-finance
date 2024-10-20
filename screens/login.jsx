import * as React from "react";
import { View, StyleSheet } from "react-native";
import TitleLoginRegister from "../components/titleFinanca.jsx";
import colorsDefault from "../styles/colors.js";
import InputLogin from "../components/inputLogin.jsx";
import ButtonAuth from "../components/buttonAuth.jsx";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container_main}>
      <TitleLoginRegister />
      <View style={styles.container_main_inputs}>
        <View style={styles.container_inputs}>
          <InputLogin placeholder="Email" type="emailAddress" />
          <InputLogin placeholder="********" type="password" />
          <View style={styles.container_buttons}>
            <View>
              <ButtonAuth
                type="Registrar"
                mode="contained"
                color={colorsDefault.button_register}
                route="Tela de registro"
                navigation={navigation}
              />
            </View>
            <View>
              <ButtonAuth
                type="Entrar"
                mode="contained"
                color={colorsDefault.button_login}
                route="Tela principal"
                navigation={navigation}
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
    marginTop: 10,
  },
});
