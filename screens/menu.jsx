import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import HeaderMenu from "../components/headerMenu";
import { Button } from "react-native-paper";

export default function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <HeaderMenu />

      {/* Gráfico */}
      <View style={styles.graph}>
        <Text>oi</Text>
      </View>

      {/* Botões de gastos */}
      <View style={styles.expenseButtonsContainer}>
        <View style={styles.expenseButton}>
          <Button
            contentStyle={styles.btn_expenses_fixes_variables}
            labelStyle={styles.btnTextStyle}
            mode="contained"
            onPress={() => {}}
            buttonColor="#af5252"
            >
            Gastos Fixos
          </Button>
        </View>
        <View style={styles.expenseButton}>
          <Button
            contentStyle={styles.btn_expenses_fixes_variables}
            labelStyle={styles.btnTextStyle}
            mode="contained"
            onPress={() => {}}
            buttonColor="#af5252"
          >
            Gastos Variáveis
          </Button>
        </View>
      </View>

      {/* Gastos Totais */}
      <View style={styles.totalExpensesButton}>
        <Button
          contentStyle={styles.btn_expenses_totals}
          labelStyle={styles.btnTextStyle}
          mode="contained"
          onPress={() => {}}
          buttonColor="#af5252"
        >
          Gastos Totais
        </Button>
      </View>

      {/* Navegador de telas */}
      <View style={styles.adContainer}>
        <Text style={styles.adText}>Faz o L</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F6FCFF",
  },
  graph: {
    alignItems: "center",
    height: 250,
    backgroundColor: '#000',
    marginTop: 25,
  },
  expenseButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    
    marginTop: 25,
  },
  expenseButton: {
    width: "40%",
  },
  totalExpensesButton: {
    alignItems: "center",
    marginTop: 20,
  },
  adContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  adText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  btn_expenses_totals: {
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_expenses_fixes_variables: {
    width: 180,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextStyle: {
    fontSize: 16,
  }
});
