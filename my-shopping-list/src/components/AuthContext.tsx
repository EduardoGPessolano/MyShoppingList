// context/AuthContext.tsx
import { createContext, useContext } from "react";
import { useSession } from "next-auth/react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data: session } = useSession();

  return (
    <AuthContext.Provider value={session?.user.token}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
