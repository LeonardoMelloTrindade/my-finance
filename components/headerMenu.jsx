import { StyleSheet, View, Image, Text } from "react-native";
import { Button, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import colorsDefault from "../styles/colors";

export default function HeaderMenu() {
  const navigation = useNavigation();

  return (
    <View style={styles.container_header}>
      <View style={styles.topContainer}>
        <View style={styles.container_image_profile}>
          <Image
            source={require("../assets/icon.png")}
            style={styles.image_profile}
          />
          <Text style={styles.welcomeText}>Olá, bem-vindo!</Text>
        </View>
      </View>

      {/* Container do saldo geral */}
      <View style={styles.saldoContainer}>
        <Text style={styles.saldoText}>Saldo geral</Text>
        <Text style={styles.saldoValor}>R$ 1.000,00</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container_header: {
    backgroundColor: colorsDefault.primary,
    padding: 15,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container_image_profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image_profile: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'white',
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 16,
  },
  topIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginHorizontal: 5,
  },
  saldoContainer: {
    backgroundColor: '#f0f0f0', // Fundo escuro semelhante ao exemplo
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    padding: 15,
    borderRadius: 8,
  },
  saldoText: {
    color: '#999',
    fontSize: 16,
  },
  saldoValor: {
    color: '#00AEEF', // Azul para o valor
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconButtonEye: {
    marginLeft: 10,
  },
});
