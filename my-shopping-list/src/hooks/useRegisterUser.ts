
import { useState } from "react";

export const useRegisterUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const urlBase = "http://localhost:3005/my_shopping_list";

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${urlBase}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const data = await response.json();
      return data;
    } catch (e) {
      setError("Registration error");
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error };
};
