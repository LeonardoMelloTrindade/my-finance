import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import HeaderMenu from "../components/headerMenu";
import { Button } from "react-native-paper";
import { VictoryPie } from "victory-native";
import { useSelector } from 'react-redux'; 

export default function MenuScreen({ navigation }) {
  const entradas = useSelector((state) => state.user.downPayment);
  const despesas = useSelector((state) => state.user.expenses);

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <HeaderMenu />

      {/* Gráfico */}
      <View style={styles.graph}>
        <View>
          <VictoryPie
            height={200}
            width={250}
            data={[
              { x: "Despesas", y: despesas },
              { x: "Entradas", y: entradas },
            ]}
            colorScale={["red", "green"]}
          />
        </View>
        <View>
          <Text>Entradas: R${entradas}</Text>
          <Text>Despesas: R${despesas}</Text>
        </View>
      </View>

      {/* Botões de gastos */}
      <View style={styles.expenseButtonsContainer}>
        <View style={styles.expenseButton}>
          <Button
            contentStyle={styles.btn_expenses_fixes_variables}
            labelStyle={styles.btnTextStyle}
            mode="contained"
            onPress={() => {navigation.navigate("fixedCosts")}}
            buttonColor="#af5252"
          >
            Entradas
          </Button>
        </View>
        <View style={styles.expenseButton}>
          <Button
            contentStyle={styles.btn_expenses_fixes_variables}
            labelStyle={styles.btnTextStyle}
            mode="contained"
            onPress={() => {navigation.navigate("variablesCosts")}}
            buttonColor="#af5252"
          >
            Despesas
          </Button>
        </View>
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
    height: 200,
    backgroundColor: "#f0f0f0",
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5
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
    width: "100%",
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
    justifyContent: "center",
    alignItems: "center",
  },
  btn_expenses_fixes_variables: {
    width: 180,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTextStyle: {
    fontSize: 16,
  },
});
