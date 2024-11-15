import React, { useState } from "react";
import "./loginInput.css";


// Définir le type des props pour le composant LoginInput
interface LoginFormProps {
  onLogin: (username: string, password: string) => void; // La prop attend une fonction qui prend un nom d'utilisateur et un mot de passe
}

const LoginInput: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password); // Appel de la fonction onLogin lors de la soumission du formulaire
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default LoginInput;
