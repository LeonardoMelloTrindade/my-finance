import * as React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import TitleLoginRegister from "../components/titleFinanca.jsx";
import colorsDefault from "../styles/colors.js";


export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container_main}>
      <TitleLoginRegister />
      <View
        style={styles.container_inputs}
      >
        <View
          style={{
            height: 200,
            width: 200,
          }}
        >
          <View>
            <Text>header-container-login</Text>
          </View>
          <View>
            <Text>inputss-login</Text>
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
    height: 100,
    paddingTop: 50,
    backgroundColor: colorsDefault.primary
  },
  container_inputs: {
    justifyContent: "center",
    alignItems: "center",
    height: 785,
  }
});
