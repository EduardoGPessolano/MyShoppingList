"use client";

import { Item } from "@/app/core/item";
import { FC, useState, useCallback } from "react";

export interface ItemCardProps {
  color: "green" | "red";
  item: Item;
  list_id?: string;
  user_id?: string;
  sessionToken: string;
  deleteBadge: boolean;
  onItemAdded?: () => void;
  onItemRemoved?: () => void;
}

const ItemCard: FC<ItemCardProps> = ({
  list_id,
  user_id,
  color,
  item,
  deleteBadge,
  sessionToken,
  onItemAdded,
  onItemRemoved,
}) => {
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleSingleClick = useCallback(() => {
    setClickTimeout(
      setTimeout(() => {
        handleItemSelection(item.item_id);
      }, 200)
    );
  }, [item.item_id]);

  const handleDoubleClick = useCallback(() => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
    }
    handleItemDeletion(item.item_id);
  }, [clickTimeout, item.item_id]);

  async function checkListOwner(itemID: string, returnBody: boolean) {
    try {
      const isUserProperty = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/lists/user/${user_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      );

      if (isUserProperty.status === 404) {
        console.error("User cannot modify items in this list");
        return null;
      }

      return returnBody ? { items: [{ item_id: itemID }] } : true;
    } catch (error) {
      console.error("Error verifying list owner:", error);
      return null;
    }
  }

  async function handleItemSelection(itemID: string) {
    if (!item || !list_id) return;

    const requestBody = await checkListOwner(itemID, true);
    if (!requestBody) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/lists/${list_id}/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        console.log("Item added to list");
        window.location.reload();
        onItemAdded?.();
      } else {
        console.error("Failed to add item to list:", response.status);
      }
    } catch (error) {
      console.error("Error adding item to list:", error);
    }
  }

  async function handleItemDeletion(itemID: string) {
    if (!item || !list_id) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/lists/${list_id}/items/${itemID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      );

      if (response.ok) {
        console.log("Item removed from list");
        onItemRemoved?.();
      } else {
        console.error("Failed to remove item from list:", response.status);
      }
    } catch (error) {
      console.error("Error removing item from list:", error);
    }
  }

  return (
    <div
      className={`card w-24 h-24 shadow-md flex flex-col items-center p-2 m-2 hover:bg-green-600 ${
        color === "green" ? "bg-green-600" : "bg-red-600"
      }`}
      onClick={handleSingleClick}
      onDoubleClick={handleDoubleClick}
    >
      <h2 className="text-sm font-semibold text-white mb-2">
        {item.name.length < 9
          ? item.name.charAt(0).toUpperCase() + item.name.slice(1)
          : item.name.charAt(0).toUpperCase() + item.name.slice(1, 9) + ".."}
      </h2>
      <div className="w-full h-full flex justify-center items-center text-white text-xl">
        <img
          src={`/icons/${item.category}/${item.icon}`}
          alt="icon"
          className="w-12 h-12"
        />
      </div>

      {deleteBadge && (
        <div className="badge badge-error gap-2 text-white">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleItemDeletion(item.item_id);
            }}
          >
            x
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemCard;
