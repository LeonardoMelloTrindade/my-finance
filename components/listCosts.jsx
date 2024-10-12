import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { Modal, Portal, TextInput, Provider, Menu, Divider, IconButton } from "react-native-paper";
import colorsDefault from "../styles/colors.js";

export default function ListCosts({ initialCosts, modalVisible, closeModal }) {
  const [costs, setCosts] = useState(initialCosts || []); // Inicializa com props ou vazio
  const [newDescription, setNewDescription] = useState("");
  const [newValue, setNewValue] = useState("");
  const [editId, setEditId] = useState(null); // Usado para verificar se estamos editando
  const [menuVisible, setMenuVisible] = useState({}); // Controla a visibilidade de cada menu

  // Função para abrir o menu dropdown de um item específico
  const openMenu = (id) => {
    setMenuVisible((prevState) => ({ ...prevState, [id]: true }));
  };

  // Função para fechar o menu dropdown de um item específico
  const closeMenu = (id) => {
    setMenuVisible((prevState) => ({ ...prevState, [id]: false }));
  };

  // Função para adicionar ou editar um gasto
  const handleSaveCost = () => {
    if (!newDescription || !newValue) {
      Alert.alert("Por favor, preencha a descrição e o valor do gasto.");
      return;
    }

    if (editId !== null) {
      // Editando o gasto existente
      setCosts((prevCosts) =>
        prevCosts.map((cost) =>
          cost.id === editId
            ? { ...cost, description: newDescription, value: newValue }
            : cost
        )
      );
    } else {
      // Adicionando um novo gasto
      setCosts([
        ...costs,
        { id: Date.now().toString(), description: newDescription, value: newValue },
      ]);
    }
    closeModal(); // Fecha o modal após salvar
  };

  // Função para abrir o modal e editar um gasto
  const handleEditCost = (id, description, value) => {
    setNewDescription(description);
    setNewValue(value);
    setEditId(id);
    setModalVisible(true); // Abre o modal para edição
  };

  // Função para deletar um gasto
  const handleDeleteCost = (id) => {
    setCosts((prevCosts) => prevCosts.filter((cost) => cost.id !== id));
    closeMenu(id); // Fecha o menu após deletar
  };

  // Renderiza quando não há gastos
  const renderEmptyList = () => (
    <View style={styles.emptyListContainer}>
      <Text style={styles.emptyText}>Nenhum gasto adicionado.</Text>
    </View>
  );

  // Função para renderizar cada item da lista
  const renderItem = ({ item }) => (
    <View style={styles.costItem}>
      <Text style={styles.costText}>
        {item.description} - R$ {item.value}
      </Text>

      {/* Menu dropdown para editar/deletar */}
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

  return (
    <Provider>
      <View style={styles.container}>

        {/* Lista de gastos */}
        <FlatList
          data={costs}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyList} // Exibir quando a lista estiver vazia
        />

        {/* Modal para adicionar ou editar */}
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
            <Button
              title={editId !== null ? "Salvar Alteração" : "Adicionar Gasto"}
              onPress={handleSaveCost}
            />
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
