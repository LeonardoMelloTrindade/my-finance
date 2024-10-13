import React, { useState } from "react";
import { View, Text, FlatList, Alert, StyleSheet } from "react-native";
import { Modal, Portal, TextInput, Provider, Menu, Divider, IconButton, Button as PaperButton } from "react-native-paper";
import colorsDefault from "../styles/colors.js";
import { useSelector, useDispatch } from 'react-redux'; 
import { setExpenses, setListExpenses } from '../store/userSlice.js'; 

export default function ExpensesScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [menuVisible, setMenuVisible] = useState({});

  const dispatch = useDispatch();
  
  const listExpenses = useSelector((state) => state.user.listExpenses);
  const totalExpenses = useSelector((state) => state.user.expenses);

  const openMenu = (id) => {
    setMenuVisible((prevState) => ({ ...prevState, [id]: true }));
  };

  const closeMenu = (id) => {
    setMenuVisible((prevState) => ({ ...prevState, [id]: false }));
  };

  const handleSaveExpense = () => {
    if (!description || !value) {
      Alert.alert("Por favor, preencha a descrição e o valor da despesa.");
      return;
    }

    const updatedExpenses = editId !== null
      ? listExpenses.map((expense) =>
          expense.id === editId
            ? { ...expense, description, value }
            : expense
        )
      : [...listExpenses, { id: Date.now().toString(), description, value }];

    const total = updatedExpenses.reduce((acc, expense) => acc + parseFloat(expense.value), 0);
    dispatch(setExpenses(total));
    dispatch(setListExpenses(updatedExpenses));

    closeModal();
  };

  const handleEditExpense = (id, description, value) => {
    setDescription(description);
    setValue(value);
    setEditId(id);
    setModalVisible(true);
  };

  const handleDeleteExpense = (id) => {
    const updatedExpenses = listExpenses.filter((expense) => expense.id !== id);
    dispatch(setListExpenses(updatedExpenses));

    const total = updatedExpenses.reduce((acc, expense) => acc + parseFloat(expense.value), 0);
    dispatch(setExpenses(total));

    closeMenu(id);
  };

  const renderExpenseItem = ({ item }) => (
    <View style={styles.expenseItem}>
      <Text style={styles.expenseText}>
        {item.description} - R$ {item.value}
      </Text>

      <Menu
        visible={menuVisible[item.id] || false}
        onDismiss={() => closeMenu(item.id)}
        anchor={
          <IconButton
            icon="dots-vertical"
            onPress={() => openMenu(item.id)}
            color="#fff"
          />
        }
      >
        <Menu.Item
          onPress={() => handleEditExpense(item.id, item.description, item.value)}
          title="Editar"
        />
        <Divider />
        <Menu.Item
          onPress={() => handleDeleteExpense(item.id)}
          title="Deletar"
        />
      </Menu>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyListContainer}>
      <Text style={styles.emptyText}>Nenhuma despesa adicionada.</Text>
    </View>
  );

  const closeModal = () => {
    setModalVisible(false);
    setDescription("");
    setValue("");
    setEditId(null);
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={[styles.infoText, styles.titleText]}>Despesas:</Text>
        <Text style={[styles.infoText, styles.totalText]}>R$ {totalExpenses.toFixed(2)}</Text>

        <PaperButton
          mode="contained"
          style={styles.addButton}
          buttonColor={colorsDefault.primary}
          onPress={() => setModalVisible(true)}
        >
          + Adicionar gasto
        </PaperButton>

        <FlatList
          data={listExpenses}
          keyExtractor={(item) => item.id}
          renderItem={renderExpenseItem}
          ListEmptyComponent={renderEmptyList}
        />

        <Portal>
          <Modal visible={modalVisible} onDismiss={closeModal} contentContainerStyle={styles.modal}>
            <TextInput
              label="Descrição"
              value={description}
              onChangeText={setDescription}
              style={styles.input}
            />
            <TextInput
              label="Valor"
              value={value}
              onChangeText={setValue}
              keyboardType="numeric"
              style={styles.input}
            />
            <PaperButton
              mode="contained"
              buttonColor={colorsDefault.primary}
              onPress={handleSaveExpense}
            >
              {editId !== null ? "Salvar Alteração" : "Adicionar despesa"}
            </PaperButton>
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    marginTop: 30
  },
  infoText: {
    fontWeight: "900",
    marginBottom: 10,
  },
  titleText: {
    fontSize: 20,
  },
  totalText: {
    fontSize: 18,
  },
  addButton: {
    marginTop: 20,
    marginBottom: 20,
  },
  expenseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colorsDefault.primary,
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
  },
  expenseText: {
    fontSize: 18,
    color: "#fff",
    flex: 1,
  },
  emptyListContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
  input: {
    marginBottom: 20,
    backgroundColor: "white",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
});
