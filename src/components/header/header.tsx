import React, { useContext } from "react";
import { NavLink } from "react-router-dom"; // Utilisation de NavLink au lieu de Link
import "./header.scss";
import logo from "../../assets/images/logosimple.png";
import ModalLogin from "../modalLogin/modalLogin";
import "../../styles/commun.scss";
import AuthContext from "../../contexts/authContext";

const Header: React.FC = () => {
  const { user, token, login, logout } = useContext(AuthContext) || {};
  const [isModalOpen, setIsModalOpen] = React.useState(false); // État local pour gérer l'affichage de la modal de connexion/inscription

  // Gestion de l'état de la modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

            <NavLink
              className={(navData) =>
                navData.isActive ? "nav-link active-link" : "nav-link"
              }
              to="/"
            >
              Accueil
            </NavLink>
          </li>
          <li className="nav-item">
  
            <NavLink
              className={(navData) =>
                navData.isActive ? "nav-link active-link" : "nav-link"
              }
              to="/animaux"
            >
              Animaux
            </NavLink>
          </li>

          {isAuthenticated && user?.role === "family" && (
            <li className="nav-item">
              <NavLink
                className={(navData) =>
                  navData.isActive ? "nav-link active-link" : "nav-link"
                }
                to="/espace-famille"
              >
                Mon espace famille
              </NavLink>
            </li>
          )}

          {isAuthenticated && user?.role === "association" && (
            <li className="nav-item">
              <NavLink
                className={(navData) =>
                  navData.isActive ? "nav-link active-link" : "nav-link"
                }
                to="/espace-association"
              >
                Mon espace association
              </NavLink>
            </li>
          )}

          <li className="nav-item">
            <NavLink
              className={(navData) =>
                navData.isActive ? "nav-link active-link" : "nav-link"
              }
              to="/contact"
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      <ModalLogin show={isModalOpen} onClose={closeModal} login={safeLogin} />
    </header>
  );
};

export default Header;
