// hooks/useAddList.ts
import List from "@/app/core/list/List";
import { useState } from "react";

export const useAddList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const urlBase = "http://localhost:3005/my_shopping_list";

  const addList = async (
    newList: Omit<List, "ListID">,
    token: string
  ): Promise<List | null> => {
    setLoading(true);
    setError(null);

    console.log("useLists");
    console.log(token);

    try {
      const response = await fetch(`${urlBase}/lists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newList),
      });

      if (!response.ok) {
        throw new Error("Failed to save list");
      }

      const data = await response.json();
      return data as List;
    } catch (e) {
      setError("Save error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { addList, loading, error };
};
