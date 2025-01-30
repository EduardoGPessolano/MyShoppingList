import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Button } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import useList from "@/hooks/useList";
import { List } from "@/core/list";
import ItemCard from "@/components/ItemCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ItemPage() {
  const route = useRoute();
  const navigation = useNavigation();

  const { lists, getListsByUserId, loading } = useList();
  const [listToShow, setListToShow] = useState<List | undefined>(
    route.params?.selectedList
  );


  const handleItemRemoved = (itemId: string) => {
    if (!listToShow) return;

    const updatedItems = listToShow.items.filter(
      (item) => item.item_id !== itemId
    );


    setListToShow({ ...listToShow, items: updatedItems });
  };

  useEffect(() => {
    if (route.params?.selectedList) {
      setListToShow(route.params.selectedList);
    }
  }, [route.params]);

  useEffect(() => {
    const fetchLists = async () => {
      if (!route.params?.selectedList && lists.length > 0) {
        try {
          const user_id = await AsyncStorage.getItem("user_id");

          if (user_id) {
            getListsByUserId(user_id);
          }
        } catch (error) {
          console.error("Erro ao buscar user_id:", error);
        }
      }
    };

    fetchLists();
  }, [route.params, lists, getListsByUserId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  if (!listToShow) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No list available</Text>
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{listToShow.name}</Text>
      <Text style={styles.subtitle}>{listToShow.description}</Text>
      <FlatList
        data={listToShow.items}
        keyExtractor={(item) => item.item_id.toString()}
        renderItem={({ item }) => (
          <ItemCard
            color="green"
            item={{
              item_id: item.item_id,
              name: item.name,
              category: item.category,
              icon: item.icon,
            }}
            listId={listToShow.list_id}
            onItemRemoved={() => handleItemRemoved(item.item_id)}
          />
        )}
        numColumns={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 16,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});
