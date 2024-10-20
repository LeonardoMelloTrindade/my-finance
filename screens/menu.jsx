import * as React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import HeaderMenu from "../components/headerMenu";
import { Button } from "react-native-paper";
import { VictoryPie } from "victory-native";
import { useSelector } from "react-redux";
import colorsDefault from "../styles/colors.js";

export default function MenuScreen({ navigation }) {
  const entradas = useSelector((state) => state.user.downPayment);
  const despesas = useSelector((state) => state.user.expenses);
  const combinedList = useSelector((state) => state.user.combinedList);

  return (
    <View style={styles.container}>
      <HeaderMenu />

      <View style={styles.containerGraph}>
        {entradas === 0 && despesas === 0 ? (
          <View>
            <Text style={styles.emptyText}>
              Não há dados suficientes para exibir o gráfico.
            </Text>
          </View>
        ) : (
          <View style={styles.graph}>
            <VictoryPie
              height={200}
              width={250}
              data={[
                { x: "Despesas", y: despesas },
                { x: "Entradas", y: entradas },
              ]}
              colorScale={["#E57373", "#81C784"]}
            />
            <View>
              <Text>Entradas: R${entradas.toFixed(2)}</Text>
              <Text>Despesas: R${despesas.toFixed(2)}</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.expenseButtonsContainer}>
        <View style={styles.expenseButton}>
          <Button
            style={styles.btn_expenses_fixes_variables}
            labelStyle={styles.btnTextStyle}
            mode="contained"
            onPress={() => {
              navigation.navigate("Tela de entradas");
            }}
            buttonColor={colorsDefault.primary}
          >
            Entradas
          </Button>
        </View>
        <View style={styles.expenseButton}>
          <Button
            style={styles.btn_expenses_fixes_variables}
            labelStyle={styles.btnTextStyle}
            mode="contained"
            onPress={() => {
              navigation.navigate("Tela de despesas");
            }}
            buttonColor={colorsDefault.primary}
          >
            Despesas
          </Button>
        </View>
      </View>

      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Histórico</Text>
        <ScrollView style={styles.scrollView}>
          {combinedList.length > 0 ? (
            combinedList.map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <Text style={item.type === "entrada" ? styles.entradaText : styles.despesaText}>
                  {item.description}: R$ {Number(item.value).toFixed(2)} ({item.type === "entrada" ? "Entrada" : "Despesa"})
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyHistory}>Nenhuma entrada ou despesa registrada</Text>
          )}
        </ScrollView>
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
  containerGraph: {
    height: 200,
    backgroundColor: "#f0f0f0",
    marginTop: 25,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    paddingLeft: 5,
    paddingRight: 5,
  },
  graph: {
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
  },
  expenseButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 25,
  },
  expenseButton: {
    width: "40%",
  },
  btn_expenses_fixes_variables: {
    width: 180,
    height: 60,
    justifyContent: "center",
  },
  btnTextStyle: {
    fontSize: 16,
  },
  historyContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center"
  },
  scrollView: {
    padding: 10,
  },
  historyItem: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  entradaText: {
    color: "#81C784",
  },
  despesaText: {
    color: "#E57373",
  },
  emptyHistory: {
    textAlign: "center",
    color: "#888",
    marginVertical: 10,
  },
});
