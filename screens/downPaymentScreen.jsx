import React, { useState } from "react";
import { View, Text, FlatList, Alert, StyleSheet } from "react-native";
import { Modal, Portal, TextInput, Provider, Menu, Divider, IconButton, Button as PaperButton } from "react-native-paper";
import colorsDefault from "../styles/colors.js";
import { useSelector, useDispatch } from 'react-redux'; 
import { setDownPayment, setListDownPayment } from '../store/userSlice.js'; 

export default function DownPaymentScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const [newValue, setNewValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [menuVisible, setMenuVisible] = useState({});

  const dispatch = useDispatch();
  
  const listDownPayment = useSelector((state) => state.user.listDownPayment);
  const totalDownPayment = useSelector((state) => state.user.downPayment);

  const openMenu = (id) => {
    setMenuVisible((prevState) => ({ ...prevState, [id]: true }));
  };

  const closeMenu = (id) => {
    setMenuVisible((prevState) => ({ ...prevState, [id]: false }));
  };

  const handleSaveDownPayment = () => {
    if (!newDescription || !newValue) {
      Alert.alert("Por favor, preencha a descrição e o valor da entrada.");
      return;
    }

    const updatedDownPayment = editId !== null
      ? listDownPayment.map((payment) =>
          payment.id === editId
            ? { ...payment, description: newDescription, value: newValue }
            : payment
        )
      : [...listDownPayment, { id: Date.now().toString(), description: newDescription, value: newValue }];

    const total = updatedDownPayment.reduce((acc, payment) => acc + parseFloat(payment.value), 0);
    dispatch(setDownPayment(total));
    dispatch(setListDownPayment(updatedDownPayment));

    closeModal();
  };

  const handleEditDownPayment = (id, description, value) => {
    setNewDescription(description);
    setNewValue(value);
    setEditId(id);
    setModalVisible(true);
  };

  const handleDeleteDownPayment = (id) => {
    const updatedDownPayment = listDownPayment.filter((payment) => payment.id !== id);
    dispatch(setListDownPayment(updatedDownPayment));

    const total = updatedDownPayment.reduce((acc, payment) => acc + parseFloat(payment.value), 0);
    dispatch(setDownPayment(total));

    closeMenu(id);
  };

  const renderItem = ({ item }) => (
    <View style={styles.downPaymentItem}>
      <Text style={styles.downPaymentText}>
        {item.description} - R$ {Number(item.value).toFixed(2)}
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
          onPress={() => {
            handleEditDownPayment(item.id, item.description, item.value);
            closeMenu(item.id);
          }}
          title="Editar"
        />
        <Divider />
        <Menu.Item
          onPress={() => {
            handleDeleteDownPayment(item.id);
            closeMenu(item.id);
          }}
          title="Deletar"
        />
      </Menu>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyListContainer}>
      <Text style={styles.emptyText}>Nenhuma entrada adicionada.</Text>
    </View>
  );

  const closeModal = () => {
    setModalVisible(false);
    setNewDescription("");
    setNewValue("");
    setEditId(null);
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={[styles.infoText, styles.titleText]}>Entradas:</Text>
        <Text style={[styles.infoText, styles.totalText]}>R$ {totalDownPayment.toFixed(2)}</Text>

        <PaperButton
          mode="contained"
          style={styles.btnAddDownPayment}
          buttonColor={colorsDefault.primary}
          onPress={() => setModalVisible(true)}
        >
          + Adicionar entrada
        </PaperButton>

        <FlatList
          data={listDownPayment}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyList}
        />

        <Portal>
          <Modal visible={modalVisible} onDismiss={closeModal} contentContainerStyle={styles.modal}>
            <TextInput
              label="Descrição"
              value={newDescription}
              onChangeText={setNewDescription}
              style={styles.input}
            />
            <TextInput
              label="Valor"
              value={newValue}
              onChangeText={setNewValue}
              keyboardType="numeric"
              style={styles.input}
            />
            <PaperButton
              mode="contained"
              buttonColor={colorsDefault.primary}
              onPress={handleSaveDownPayment}
            >
              {editId !== null ? "Salvar Alteração" : "Adicionar entrada"}
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
  btnAddDownPayment: {
    marginTop: 20,
    marginBottom: 20,
  },
  downPaymentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colorsDefault.primary,
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
  },
  downPaymentText: {
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
