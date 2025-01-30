// useList.ts
"use client";

import { useState } from "react";
import List from "@/app/core/list/List";

const urlBase = "http://localhost:3005/my_shopping_list";

export default function useList() {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(false);

  async function getLists(token: string) {
    setLoading(true);

    const response = await fetch(`${urlBase}/lists`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setLoading(false);

    const formattedLists = data.map((list: List) => ({
      ...list,
      due: new Date(list.due),
    }));
    setLists(formattedLists);
  }
  async function getListsByUserId(user_id: string, token: string) {
    setLoading(true);
    const response = await fetch(`${urlBase}/lists/user/${user_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setLoading(false);

    const formattedLists = data.map((list: List) => ({
      ...list,
      due: new Date(list.due),
    }));
    setLists(formattedLists);
  }

  return {
    lists,
    getLists,
    getListsByUserId,
    loading,
    setLoading,
  };
}
