"use client";

import { SessionProvider, signOut } from "next-auth/react";
import { IconLogout } from "@tabler/icons-react";
import { useSession } from "next-auth/react";

interface GreetingsProps {
  name: string;
}

const capitalizeName = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export default function Greetings(props: GreetingsProps) {
  return (
    <div className="flex flex-col text-white text-left ">
      <h1 className="text-4xl ml-20 font-bold">👋🏻 Hi, {props.name}!</h1>
    </div>
  );
}
