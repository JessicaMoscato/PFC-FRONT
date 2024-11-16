import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import logo from "../../assets/images/logosimple.png";
import ModalLogin from "../modalLogin/modalLogin"; // Import de la modale
import "../../styles/commun.scss";

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fonction pour ouvrir la modale
  const openModal = () => setIsModalOpen(true);
  // Fonction pour fermer la modale
  const closeModal = () => setIsModalOpen(false);

  return (
    <header className="header">
      {/* Première ligne avec logo et icône de profil */}
      <div className="header-title">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-img" />
          <h1>Pet Foster Connect</h1>
        </div>

        {/* Remplacer l'icône de profil par le bouton de connexion */}
        <button className="auth-button" onClick={openModal}>
          Connexion / Inscription
        </button>
      </div>

      {/* Deuxième ligne - Navigation */}
      <div className="header-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <i className="fa-solid fa-house"></i>
            <Link className="nav-link" to="/">
              Accueil
            </Link>
          </li>
          <li className="nav-item">
            <i className="fa-solid fa-paw"></i>
            <Link className="nav-link" to="/animals">
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

      {/* Modale de connexion */}
      <ModalLogin show={isModalOpen} onClose={closeModal} />
    </header>
  );
};

export default Header;