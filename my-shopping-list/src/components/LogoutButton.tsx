"use client";

import { signOut } from "next-auth/react";
import { IconLogout } from "@tabler/icons-react";
export default function LogoutButton() {
  return (
    <button className="btn btn-outline btn-error" onClick={() => signOut()}>
      <IconLogout size={28} stroke={1} />
      Logout
    </button>
  );
}
