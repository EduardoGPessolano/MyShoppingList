"use client";

import { FC, useState, useEffect } from "react";
import ItemCard from "@/components/ItemCard";
import Layout from "@/components/Layout";

interface ItemPageContentProps {
  session: any;
  list_id: string;
}

const ItemPageContent: FC<ItemPageContentProps> = ({ session, list_id }) => {
  const [items, setItems] = useState<any[]>([]);
  const [inListItems, setinListItems] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("bakery");

  const fetchItems = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user?.token}`,
        },
      });
      const data = await response.json();
      console.log("Fetched items:", data);
      setItems(data);
    } catch (error) {
      console.error("Fail to fetch items", error);
    }
  };

  const fetchCurrentListItems = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/lists/${list_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user?.token}`,
          },
        }
      );
      const data = await response.json();
      setinListItems(data["items"]);
    } catch (error) {
      console.error(`Fail to fetch items from list ${list_id}`, error);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchCurrentListItems();
  }, []);

  const handleTabClick = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredItems = items.filter(
    (item) => item.category == selectedCategory
  );

  const isItemInList = (itemId: string) => {
    return inListItems.some((inListItem) => inListItem.item_id === itemId);
  };

  const totalValue = inListItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0),
    0
  );

  const removeItemFromList = (itemId: string) => {
    setinListItems((prevItems) =>
      prevItems.filter((item) => item.item_id !== itemId)
    );
  };

  return (
    <Layout>
      <div className="flex w-full flex-col lg:flex-row items-start">
        <div className="card bg-gray-700/50 backdrop-blur-md rounded-box grid grid-cols-5 gap-2 p-4 flex-grow w-full lg:w-auto place-items-center">
          <h2 className="text-white text-center w-full col-span-5 mb-4 text-3xl font-extrabold tracking-wide drop-shadow-lg">
            My Shopping List
          </h2>

          {inListItems.length !== 0 && (
            <p className="text-green-500 text-center w-full col-span-5 mb-4 text-xl">
              Total Value: ${totalValue.toFixed(2)}
            </p>
          )}

          {inListItems.length === 0 && (
            <p className="text-white text-center w-full col-span-5 mt-2">
              No items in your shopping list.
            </p>
          )}

          {inListItems.map((item, index) => (
            <ItemCard
              key={index}
              user_id={session.user?.user_id}
              item={item}
              list_id={list_id}
              color="green"
              deleteBadge={true}
              sessionToken={session.user?.token}
              onItemRemoved={() => removeItemFromList(item.item_id)}
            />
          ))}
        </div>

        <div className="divider lg:divider-horizontal text-white text-4xl mx-4">
          ←
        </div>

        <div className="card bg-gray-700/50 backdrop-blur-md rounded-box grid grid-cols-5 gap-1 p-4 w-full lg:w-auto flex-grow place-items-center">
          <div className="col-span-full justify-self-center mb-4">
            <div role="tablist" className="tabs tabs-boxed items-center">
              {[
                "bakery",
                "beverages",
                "frozen",
                "fruits_veg",
                "meat_sea",
                "junk",
                "utilities",
              ].map((category) => (
                <a
                  role="tab"
                  key={category}
                  className={`tab text-white ${
                    selectedCategory === category ? "bg-blueish" : ""
                  }`}
                  onClick={() => handleTabClick(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </a>
              ))}
            </div>
          </div>

          {filteredItems.map((item, index) => (
            <ItemCard
              key={index}
              user_id={session.user?.user_id}
              item={item}
              deleteBadge={false}
              list_id={list_id}
              color={isItemInList(item.item_id) ? "green" : "red"}
              sessionToken={session.user?.token}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ItemPageContent;
