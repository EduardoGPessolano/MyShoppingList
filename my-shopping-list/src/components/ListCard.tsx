"use client";

import { List } from "@/app/core/list";

import {
  IconFileDescription,
  IconCalendar,
  IconShoppingBag,
  IconCalendarOff,
} from "@tabler/icons-react";
import EditListButton from "./EditListButton";
import DeleteListButton from "./DeleteListButton";
import Link from "next/link";

export interface ListCardProps {
  list: List;
  token: string;
}

export default function ListCard({ list, token }: ListCardProps) {
  const expireDate = new Date(list.due);
  const currentDate = new Date();
  const diffTime = expireDate.getTime() - currentDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let dateClass = "";
  let iconColor = "white";
  let DynamicCalendar = IconCalendar;

  if (diffDays > 3) {
    iconColor = "white";
  } else if (diffDays > 1) {
    iconColor = "yellow";
  } else if (diffDays <= 1) {
    iconColor = "red";
  } else if (diffDays < 2) {
    iconColor = "red";
    DynamicCalendar = IconCalendarOff;
  }

  const formattedDate = !isNaN(expireDate.getTime())
    ? expireDate.toLocaleDateString("en", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date not valid!";

  const ItemQtyCalculator = (list: List): number => {
    return list.items.length;
  };

  const PeekItemsInList = (list: List): string => {
    if (!list.items || list.items.length === 0) return "-";

    const maxLength = 32;
    const itemsPreview = list.items.map((item) => item.name).join(", ");

    return itemsPreview.length > maxLength
      ? itemsPreview.slice(0, maxLength) + "..."
      : itemsPreview + ".";
  };

  return (
    <div>
      <div className="card glass w-96 m-2 mt-5">
        <Link href={`/itemList?list_id=${list.list_id}`}>
          <figure className="h-48 w-full relative rounded-t-2xl overflow-hidden">
            <img src={list.icon} alt="list icon" />
          </figure>
        </Link>
        <div className="card-body w-full">
          <span className="text-xl font-bold text-white">
            {list.name}
            <div className="badge p-3 bg-white border-white text-black badge-secondary text-sm ml-3 items-center">
              {ItemQtyCalculator(list)} item(s)
            </div>
          </span>
          <span className="flex items-center text-lg text-gray-300 font-bold">
            <IconFileDescription size={24} strokeWidth={2} color={"white"} />
            <span className="ml-2">{list.description}</span>
          </span>
          <span className="flex items-center text-lg font-semibold text-gray-300">
            <DynamicCalendar size={24} strokeWidth={2} color={iconColor} />
            <span className="ml-2">{formattedDate}</span>
          </span>
          <span className="flex items-center text-lg text-gray-300  font-semibold">
            <IconShoppingBag size={24} strokeWidth={2} color={"white"} />
            <span className="ml-2">{PeekItemsInList(list)}</span>
          </span>

          <div className="flex items-center card-actions">
            <EditListButton list={list} token={token} />
            <DeleteListButton list={list} token={token} />
          </div>
        </div>
      </div>
    </div>
  );
}
