import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Item from "@/core/item/Item";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface ItemCardProps {
  color: "green" | "red";
  item: Item;
  listId: string;
  onItemRemoved?: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  color,
  item,
  listId,
  onItemRemoved,
}) => {
  const handleDelete = async (itemId: string) => {
    try {
      const urlBase = "http://localhost:3005/my_shopping_list";
      const token = await AsyncStorage.getItem("authToken");

      console.log("list_id:   ", listId);
      console.log("itemId:   ", itemId);
      const response = await fetch(
        `${urlBase}/lists/${listId}/items/${itemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log(`Item with ID ${itemId} deleted successfully`);
        onItemRemoved?.();
      } else {
        console.error("Failed to remove item from list:", response.status);
      }
    } catch (error) {
      console.error("Error removing item from list:", error);
    }
  };

  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </Text>
          <Text style={styles.category}>{item.category}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() =>
            handleDelete(String(item.item_id)).then(() => onItemRemoved?.())
          }
        >
          <Ionicons name="checkmark-circle-outline" size={24} color="grey" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 16,
    borderRadius: 8,
    marginVertical: 4,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderLeftWidth: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
  },
  category: {
    fontSize: 14,
    color: "#777",
    textAlign: "left",
  },
  checkboxContainer: {
    padding: 8,
  },
});

export default ItemCard;
