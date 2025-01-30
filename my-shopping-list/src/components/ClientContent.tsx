"use client";

import { useSearchParams } from "next/navigation";
import ItemPageContent from "@/components/ItemPageContent";

export default function ClientContent({ session }: { session: any }) {
  const searchParams = useSearchParams();

  const list_id = searchParams.get("list_id");
  console.log(list_id);

  return (
    <div>
      <ItemPageContent session={session} list_id={list_id} />
    </div>
  );
}
