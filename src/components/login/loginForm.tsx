//! Composant LoginForm : Ce composant contient le formulaire de connexion proprement dit 
//! (email, mot de passe, bouton de soumission) et gère l'authentification de l'utilisateur via la fonction SigninUser.

import React, { useState } from "react";
import { SigninUser } from "../../api/signin.api"; // Assure-toi d'importer la fonction
import { IAuthContext } from "../../@types/user";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Appeler la fonction de connexion
      const userData: IAuthContext = await SigninUser({ email, password });

      // Si la connexion réussit, rediriger ou mettre à jour l'état de l'application
      console.log(userData); // Tu peux stocker les données utilisateur dans le state ou rediriger
      setIsLoading(false);
    } catch (error: any) {
      // On peut typer error comme any ici
      // Si l'erreur vient d'Axios, on peut accéder à message
      if (error?.response?.data?.message) {
        setErrorMessage(error.response.data.message); // Afficher l'erreur en cas d'échec
      } else {
        setErrorMessage("Erreur inconnue lors de la connexion.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
