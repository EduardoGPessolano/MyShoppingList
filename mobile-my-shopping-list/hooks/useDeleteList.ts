import List from "@/core/list/List";
import { useState } from "react";


const urlBase = "http://localhost:3005/my_shopping_list";

export function useDeleteList() {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function deleteListByID(list_id: string, token: string) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${urlBase}/lists/${list_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the list");
      }
      setLists((prevLists) =>
        prevLists.filter((list) => list.list_id !== list_id)
      );
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return { lists, deleteListByID, loading, error };
}
