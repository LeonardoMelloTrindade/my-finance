import * as React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function TitleLoginRegister() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Image source={
        require('../assets/title-login-register.png')
      } style={styles.tamanho_img} />
    </View>
  );
}

const styles = StyleSheet.create({
    tamanho_img: {
        marginTop: 150,
        width: 360,
        height: 400
    }
})
