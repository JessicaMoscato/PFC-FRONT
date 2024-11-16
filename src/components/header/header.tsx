import React from "react";
import { Link } from "react-router-dom"; // Importation de Link pour la navigation
import "./header.css"; // Importation du fichier CSS séparé
import logo from "../../assets/images/logosimple.png"; // Importation du logo



const Header: React.FC = () => {
  // Définition d'une fonction onLogin, qui sera passée à LoginInput


  return (
    <header className="header">
      {/* Première ligne avec logo et icône de profil */}
      <div className="header-title">
        <div className="logo">
          {/* Affichage du logo */}
          <img src={logo} alt="Logo" className="logo-img" />
          <h1>Pet Foster Connect</h1>
        </div>

        {/* Icône de profil Font Awesome */}
        <div className="profile-icon">
          <i className="fa-solid fa-user"></i> {/* Icône de profil */}
        </div>
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
    </header>
  );
};

export default Header;
