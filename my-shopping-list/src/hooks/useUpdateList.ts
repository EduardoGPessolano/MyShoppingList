import { useState } from "react";
import { List } from "@/app/core/list/List";
import useList from "./useList";

const urlBase = "http://localhost:3005/my_shopping_list";

export function useUpdateList() {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function updateListByID(
    list_id: string,
    newList: Partial<List>,
    token: string
  ) {
    setLoading(true);
    setError(null);
    setUpdated(false);

    try {
      const response = await fetch(`${urlBase}/lists/${list_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(newList),
      });

      if (!response.ok) {
        throw new Error("Failed to update the list");
      }

      const data = await response.json();

      const formattedLists = data.map((list: List) => ({
        ...list,
        due: new Date(list.due),
      }));

      setLists(formattedLists);
      setUpdated(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return { lists, updateListByID, loading, error, updated };
}
