import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./modalLogin.scss";

interface ModalLoginProps {
  show: boolean;
  onClose: () => void;
}

const ModalLogin: React.FC<ModalLoginProps> = ({ show, onClose }) => {
  const [isChoosingType, setIsChoosingType] = useState(false); // Gère l'affichage de la modale d'inscription
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // Option sélectionnée
  const [username, setUsername] = useState<string>(""); // Nom d'utilisateur
  const [password, setPassword] = useState<string>(""); // Mot de passe
  const [error, setError] = useState<string | null>(null); // Pour afficher un message d'erreur en cas de mauvaise connexion
  const navigate = useNavigate();

  if (!show) return null;

  // Fonction de soumission du formulaire de connexion
  const handleLoginSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Empêcher le rechargement de la page

    // Logique de validation des informations de connexion
    // Simulons un utilisateur fictif pour la démonstration (remplacez ceci par une vérification avec votre backend)
    const mockUser = {
      username: "admin", // Utilisateur fictif
      password: "password123", // Mot de passe fictif
    };

    if (username === mockUser.username && password === mockUser.password) {
      // Connexion réussie
      setError(null); // Réinitialiser l'erreur
      onClose(); // Fermer la modale
      navigate("/"); // Rediriger vers la page d'accueil
    } else {
      // Connexion échouée
      setError("Nom d'utilisateur ou mot de passe incorrect");
    }
  };

  const handleRegisterRedirect = () => {
    onClose(); // Fermer la modale avant de naviguer
    if (selectedOption === "association") {
      navigate("/inscription-association");
    } else if (selectedOption === "famille") {
      navigate("/inscription-famille");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        {!isChoosingType ? (
          <>
            <h2>Connexion</h2>
            <form className="auth-form" onSubmit={handleLoginSubmit}>
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Mettre à jour le nom d'utilisateur
              />
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Mettre à jour le mot de passe
              />
              <button type="submit">Se connecter</button>
            </form>
            {error && <p className="error-message">{error}</p>}{" "}
            {/* Afficher l'erreur de connexion */}
            <div className="switch-form">
              <p>
                Pas encore de compte ?{" "}
                <button onClick={() => setIsChoosingType(true)}>
                  S'inscrire
                </button>
              </p>
            </div>
          </>
        ) : (
          <>
            <h2>Inscription</h2>
            <div className="register-options">
              <p>Choisissez votre type d'inscription :</p>
              <label>
                <input
                  type="radio"
                  name="registerType"
                  value="association"
                  onChange={() => setSelectedOption("association")}
                />
                Association
              </label>
              <label>
                <input
                  type="radio"
                  name="registerType"
                  value="famille"
                  onChange={() => setSelectedOption("famille")}
                />
                Famille d'accueil
              </label>
            </div>
            <button
              className="register-option-btn"
              onClick={handleRegisterRedirect}
              disabled={!selectedOption} // Désactive le bouton si aucune option n'est sélectionnée
            >
              S'inscrire
            </button>
            <div className="switch-form">
              <p>
                Vous avez déjà un compte ?{" "}
                <button onClick={() => setIsChoosingType(false)}>
                  Se connecter
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalLogin;
