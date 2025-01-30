import { useState } from "react";

export function useAuth() {
  const [error, setError] = useState<string | null>(null); 

  const login = async (email: string, password: string) => {
    setError(null); 

    const url_base = "http://localhost:3005/my_shopping_list";

    try {
      const res = await fetch(url_base + "/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Erro ao fazer login"); 
        return null; 
      }

      return await res.json(); // Retorna os dados do usuário em caso de sucesso
    } catch (err) {
      setError("Erro ao fazer a requisição"); 
      console.error(err);
      return null;
    }
  };

  return { login, error }; // Retorna a função de login e o estado de erro
}
