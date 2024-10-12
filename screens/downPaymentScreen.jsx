import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Alert, StyleSheet } from "react-native";
import { Modal, Portal, TextInput, Provider, Menu, Divider, IconButton, Button as PaperButton } from "react-native-paper";
import colorsDefault from "../styles/colors.js";
import { useSelector, useDispatch } from 'react-redux'; 
import { setDownPayment } from '../store/userSlice.js'; 

export default function DownPaymentScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [costs, setCosts] = useState([]);
  const [newDescription, setNewDescription] = useState("");
  const [newValue, setNewValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [menuVisible, setMenuVisible] = useState({});
  
  const dispatch = useDispatch();
  
  const entradas = useSelector((state) => state.user.downPayment);

  // Função para calcular o total das entradas
  const calculateTotalCosts = () => {
    return costs.reduce((total, cost) => total + parseFloat(cost.value), 0);
  };

  // Atualiza o valor de downPayment no Redux quando costs muda
  useEffect(() => {
    const totalCosts = calculateTotalCosts();
    dispatch(setDownPayment(totalCosts));
  }, [costs, dispatch]);

  const openMenu = (id) => {
    setMenuVisible((prevState) => ({ ...prevState, [id]: true }));
  };

  const closeMenu = (id) => {
    setMenuVisible((prevState) => ({ ...prevState, [id]: false }));
  };

  const handleSaveCost = () => {
    if (!newDescription || !newValue) {
      Alert.alert("Por favor, preencha a descrição e o valor da entrada.");
      return;
    }

    if (editId !== null) {
      setCosts((prevCosts) =>
        prevCosts.map((cost) =>
          cost.id === editId
            ? { ...cost, description: newDescription, value: newValue }
            : cost
        )
      );
    } else {
      setCosts([
        ...costs,
        { id: Date.now().toString(), description: newDescription, value: parseFloat(newValue).toFixed(2) },
      ]);
    }
    closeModal();
  };

  const handleEditCost = (id, description, value) => {
    setNewDescription(description);
    setNewValue(value);
    setEditId(id);
    setModalVisible(true); // Abre o modal para edição
  };

  const handleDeleteCost = (id) => {
    setCosts((prevCosts) => prevCosts.filter((cost) => cost.id !== id));
    closeMenu(id); // Fecha o menu após deletar
  };

  const renderItem = ({ item }) => (
    <View style={styles.costItem}>
      <Text style={styles.costText}>
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
          onPress={() => {
            handleEditCost(item.id, item.description, item.value);
            closeMenu(item.id);
          }}
          title="Editar"
        />
        <Divider />
        <Menu.Item
          onPress={() => {
            handleDeleteCost(item.id);
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
    setNewDescription(""); // Limpa os campos ao fechar
    setNewValue("");
    setEditId(null);
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={[styles.infoCost, styles.titleCost]}>Entradas:</Text>
        {/* Exibe o valor total de entradas atualizadas (downPayment do Redux) */}
        <Text style={[styles.infoCost, styles.costTotal]}>R$ {entradas.toFixed(2)}</Text>

        <PaperButton
          mode="contained"
          style={styles.btnAddCost}
          buttonColor={colorsDefault.primary}
          onPress={() => setModalVisible(true)}
        >
          + Adicionar entrada
        </PaperButton>

        <FlatList
          data={costs}
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
              onPress={handleSaveCost}
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
  infoCost: {
    fontWeight: "900",
    marginBottom: 10,
  },
  titleCost: {
    fontSize: 20,
  },
  costTotal: {
    fontSize: 18,
  },
  btnAddCost: {
    marginTop: 20,
    marginBottom: 20,
  },
  costItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colorsDefault.primary, // Usando paleta de cores
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
  },
  costText: {
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
