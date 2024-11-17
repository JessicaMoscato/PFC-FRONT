import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SigninUser } from "../../api/signin.api"; // Import de la fonction d'API
import "./modalLogin.scss";

interface ModalLoginProps {
  show: boolean;
  onClose: () => void;
  login: (token: string, userData: any) => void; // Définir le type approprié pour userData
}

const ModalLogin: React.FC<ModalLoginProps> = ({ show, onClose, login }) => {
  const [isChoosingType, setIsChoosingType] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  if (!show) return null;

  // Fonction de soumission du formulaire de connexion
  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); // Réinitialiser l'erreur avant chaque tentative de connexion

    if (!email || !password) {
      setError("L'email et le mot de passe sont requis.");
      return;
    }

    // Appel API pour la connexion
    try {
      const data = await SigninUser({ email, password });

      const { token, user } = data; // Assure-toi que la réponse contient un objet 'user'
      if (token) {
        // Sauvegarde du token dans le contexte ou localStorage si nécessaire
        login(token, user); // Appel de la fonction login passée en prop
        onClose();
        navigate("/"); // Rediriger vers la page d'accueil
      } else {
        setError("Nom d'utilisateur ou mot de passe incorrect");
      }
    } catch (error: any) {
      console.error(error);
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const handleRegisterRedirect = () => {
    onClose();
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
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Se connecter</button>
            </form>
            {error && <p className="error-message">{error}</p>}
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
              disabled={!selectedOption}
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
