import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/"); // Redireciona caso o usuário não esteja autenticado
  }

  return session;
}
