"use client";

import { useEffect } from "react";
import ListCard from "@/components/ListCard";
import useList from "@/hooks/useList";

interface ListPageContentProps {
  user_id: string;
  token: string;
}

export default function ListPageContent({
  user_id,
  token,
}: ListPageContentProps) {
  const { lists, getListsByUserId } = useList();

  useEffect(() => {
    if (user_id) {
      console.log("Fetching lists for user_id:", user_id);
      getListsByUserId(user_id, token);
    }
  }, [user_id]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap gap-3 justify-center mr-20 ml-20">
        {lists.length > 0 ? (
          lists.map((list) => (
            <ListCard key={list.list_id} list={list} token={token} />
          ))
        ) : (
          <h1 className="text-xl ml-20 font-semibold text-white">
            😅 Could not find any lists.
          </h1>
        )}
      </div>
    </div>
  );
}
