import React, { createContext, useState, ReactNode, useEffect } from "react";
import { IAuthContext, IUser } from "../@types/user"; // Assure-toi que le chemin est correct

// Créer un contexte avec le bon type
const AuthContext = createContext<IAuthContext | undefined>(undefined);

// Définir le type des props pour AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Effet pour charger les données depuis le localStorage si disponibles
  useEffect(() => {
    // Vérification si le localStorage est accessible (important pour SSR)
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("authToken");
      const storedUser = localStorage.getItem("authUser");

      if (storedToken) {
        setToken(storedToken);
      }

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  // Fonction de connexion
  const login = (newToken: string, userData: IUser) => {
    setToken(newToken);
    setUser(userData);

    // Sauvegarder dans le localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", newToken);
      localStorage.setItem("authUser", JSON.stringify(userData));
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    setToken(null);
    setUser(null);

    // Supprimer du localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, token, children }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
