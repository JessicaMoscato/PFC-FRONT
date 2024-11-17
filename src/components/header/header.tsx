import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import logo from "../../assets/images/logosimple.png";
import ModalLogin from "../modalLogin/modalLogin";
import "../../styles/commun.scss";
import AuthContext from "../../contexts/authContext";

const Header: React.FC = () => {
  const { user, token, login, logout } = useContext(AuthContext) || {};

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // On vérifie si `login` est une fonction. Si non, on lui affecte une fonction vide.
  const safeLogin = login ? login : () => {};

  const isAuthenticated = !!user && !!token;

  return (
    <header className="header">
      <div className="header-title">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-img" />
          <h1>Pet Foster Connect</h1>
        </div>

        {isAuthenticated ? (
          <div>
            <span>
              {user?.firstname} {user?.lastname}
            </span>
            <button className="auth-button" onClick={logout}>
              Se déconnecter
            </button>
          </div>
        ) : (
          <button className="auth-button" onClick={openModal}>
            Connexion / Inscription
          </button>
        )}
      </div>

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

      {/* On passe la fonction `safeLogin` pour s'assurer que la prop `login` ne soit jamais undefined */}
      <ModalLogin show={isModalOpen} onClose={closeModal} login={safeLogin} />
    </header>
  );
};

export default Header;
