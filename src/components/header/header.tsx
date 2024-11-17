//! Composant Header : Ce composant représente l'en-tête de l'application.
//! Il inclut le logo, le titre, la navigation principale, et la gestion de l'authentification
//! (connexion/déconnexion avec une modal pour la connexion ou l'inscription).

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import logo from "../../assets/images/logosimple.png";
import ModalLogin from "../modalLogin/modalLogin";
import "../../styles/commun.scss";
import AuthContext from "../../contexts/authContext";

const Header: React.FC = () => {
  // Extraction des informations de l'utilisateur et des fonctions de login/logout depuis le contexte AuthContext
  const { user, token, login, logout } = useContext(AuthContext) || {};

  // État local pour gérer l'affichage de la modal de connexion/inscription
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Fonction pour ouvrir la modal
  const openModal = () => setIsModalOpen(true);

  // Fonction pour fermer la modal
  const closeModal = () => setIsModalOpen(false);

  // Vérification de la disponibilité de la fonction login, avec une valeur par défaut
  const safeLogin = login ? login : () => {};

  // Détermine si l'utilisateur est authentifié
  const isAuthenticated = !!user && !!token;

  return (
    <header className="header">
      <div className="header-title">
        <div className="logo">
          {/* Affichage du logo et du titre */}
          <img src={logo} alt="Logo" className="logo-img" />
          <h1>Pet Foster Connect</h1>
        </div>

        {isAuthenticated ? (
          //! Affichage des informations utilisateur et bouton de déconnexion si authentifié
          <div>
            <span>
              {user?.firstname} {user?.lastname}
            </span>
            <button className="auth-button" onClick={logout}>
              Se déconnecter
            </button>
          </div>
        ) : (
          //! Bouton pour ouvrir la modal de connexion/inscription si non authentifié
          <button className="auth-button" onClick={openModal}>
            Connexion / Inscription
          </button>
        )}
      </div>

      <div className="header-nav">
        <ul className="nav-list">
          {/* Navigation principale */}
          <li className="nav-item">
            <i className="fa-solid fa-house"></i>
            <Link className="nav-link" to="/">
              Accueil
            </Link>
          </li>
          <li className="nav-item">
            <i className="fa-solid fa-paw"></i>
            <Link className="nav-link" to="/animaux">
              Animaux
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Inclusion du composant ModalLogin avec les props nécessaires */}
      <ModalLogin show={isModalOpen} onClose={closeModal} login={safeLogin} />
    </header>
  );
};

export default Header;
