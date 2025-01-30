"use client";

import List from "@/app/core/list/List";
import { useCallback, useEffect, useState } from "react";

export default function useSearchLists() {
  const [lists, setLists] = useState<List[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filterLists = (lists: List[], term: string) => {
    if (!term) return lists;
    return lists.filter((list) =>
      list.name.toLowerCase().includes(term.toLowerCase())
    );
  };

  const filteredLists = filterLists(lists, searchTerm);

  return {
    lists: filteredLists,
    setSearchTerm,
  };
}
