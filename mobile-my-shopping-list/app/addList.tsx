import React, { useState } from "react";
import { View, TextInput, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Appbar, Button, Text } from "react-native-paper";
import { useAddList } from "@/hooks/useAddList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import List from "@/core/list/List";

const AddList = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  const { addList } = useAddList();

  const handleAddList = async () => {
    try {
      const user_id = await AsyncStorage.getItem("userID");
      const token = await AsyncStorage.getItem("authToken");

      if (!user_id || !token) {
        Alert.alert("Erro", "Usuário ou token não encontrado.");
        return;
      }

      const due = new Date(date);
      const createdBy = Number(user_id);
      const numItems = 0;
      const items: never[] = [];

      const newList: Omit<List, "ListID"> = {
        name,
        description,
        createdBy,
        icon: image,
        numItems,
        due,
        items,
      };

      await addList(newList, token);
      Alert.alert("Sucesso", "Lista adicionada com sucesso!");
      router.navigate("/");
    } catch (error) {
      console.error("Error adding list:", error);
      Alert.alert("Erro", "Não foi possível adicionar a lista.");
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => router.navigate("/")} />
        <Appbar.Content
          title="Adicionar Lista"
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          placeholder="Digite o nome da lista"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          placeholder="Digite a descrição da lista"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          multiline
        />
        <Text style={styles.label}>Data (YYYY-MM-DD)</Text>
        <TextInput
          placeholder="Digite a data (ex: 2024-11-25)"
          value={date}
          onChangeText={setDate}
          style={styles.input}
        />
        <Text style={styles.label}>URL da Imagem</Text>
        <TextInput
          placeholder="Digite a URL da imagem"
          value={image}
          onChangeText={setImage}
          style={styles.input}
        />
        <Button
          mode="contained"
          onPress={handleAddList}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Adicionar
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1A2238" },
  header: { backgroundColor: "#1A2238" },
  headerTitle: { color: "#FFFFFF", fontWeight: "bold" },
  formContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    elevation: 2,
  },
  label: { fontSize: 16, marginBottom: 5, fontWeight: "bold", color: "#333" },
  input: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  button: { marginTop: 20, backgroundColor: "#4CA7BF" },
  buttonContent: { height: 50 },
});

export default AddList;
