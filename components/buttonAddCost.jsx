import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import colorsDefault from '../styles/colors.js';

export default function AddCostButton({ openModal }) {
  return (
    <Button
      mode="contained"
      style={styles.btnAddCost}
      buttonColor={colorsDefault.primary}
      onPress={openModal}
    >
      + Adicionar gasto
    </Button>
  );
}

const styles = StyleSheet.create({
  btnAddCost: {
    marginTop: 30,
    width: 250,
  },
});
