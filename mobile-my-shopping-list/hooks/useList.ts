import List from "@/core/list/List";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const urlBase = "http://localhost:3005/my_shopping_list";

export default function useList() {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(false);

  async function getListsByUserId(user_id: string) {
    setLoading(true);

    const token = await AsyncStorage.getItem("authToken");

    const response = await fetch(`${urlBase}/lists/user/${user_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    console.log("-------------->", data);
    setLoading(false);

    const formattedLists = data.map((list: List) => ({
      ...list,
      due: new Date(list.due),
    }));
    setLists(formattedLists);
  }

  return {
    lists,
    getListsByUserId,
    loading,
  };
}
