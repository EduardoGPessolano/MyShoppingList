import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import List from "@/core/list/List";
import { useDeleteList } from "@/hooks/useDeleteList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

type RootStackParamList = {
  items: { listId: number; selectedList: List };
};

interface ListCardProps {
  lists: List[];
  loading: boolean;
  onRefresh: () => void;
}

const ListCards = ({ lists, loading, onRefresh }: ListCardProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { deleteListByID } = useDeleteList();

  const handleCardPress = (listId: number) => {
    const selectedList = lists.find((list) => list.list_id === listId);
    if (selectedList) {
      
      navigation.navigate("items", {
        listId,
        selectedList: {
          ...selectedList,
          due: selectedList.due ? selectedList.due.toISOString() : null,
        },
      });
    }
  };

  const handleDelete = async (listId: number) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) throw new Error("Token não encontrado!");

      console.log(`Deleting list with ID: ${listId}`);
      await deleteListByID(String(listId), String(token));
    } catch (error) {
      console.error("Erro ao deletar lista:", error);
    }
  };

  const handleEdit = async (listId: number) => {
    const selectedList = lists.find((list) => list.list_id === listId);

    if (selectedList) {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) throw new Error("Token não encontrado!");

        router.push({
          pathname: "../updateList",
          params: {
            list: JSON.stringify(selectedList),
            token,
          },
        });
      } catch (error) {
        console.error("Erro ao obter token:", error);
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading lists...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={lists}
        keyExtractor={(item) => item.list_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleCardPress(item.list_id)}
          >
            <ImageBackground
              source={{ uri: item.icon }}
              style={styles.backgroundImage}
              imageStyle={styles.imageStyle}
            >
              <View style={styles.header}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.itemsCount}>
                  {item.items.length} item(s)
                </Text>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => handleDelete(item.list_id)}>
                  <Ionicons name="trash" size={30} color="red" />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1e",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  card: {
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },
  imageStyle: {
    borderRadius: 12,
    resizeMode: "cover",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  itemsCount: {
    backgroundColor: "rgba(255, 69, 58, 0.8)",
    color: "white",
    fontSize: 14,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    fontWeight: "bold",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e",
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
  },
  refreshButton: {
    marginRight: 16,
  },
  flatListContent: {
    paddingBottom: 20,
  },
});

export default ListCards;
