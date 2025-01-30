"use client";

import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

export default function SearchBar() {
  return (
    <input
      type="text"

      placeholder="Search lists..."
      className="input input-bordered w-full max-w-xl"
    />
  );
}
