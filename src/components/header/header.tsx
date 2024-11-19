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

        <div className="header-links">
          <NavLink
            className={(navData) =>
              navData.isActive ? "nav-link active-link" : "nav-link"
            }
            to="/"
          >
            Accueil
          </NavLink>
          <NavLink
            className={(navData) =>
              navData.isActive ? "nav-link active-link" : "nav-link"
            }
            to="/animaux"
          >
            Animaux
          </NavLink>

          {isAuthenticated && user?.role === "family" && (
            <NavLink
              className={(navData) =>
                navData.isActive ? "nav-link active-link" : "nav-link"
              }
              to="/espace-famille"
            >
              Mon espace famille
            </NavLink>
          )}

          {isAuthenticated && user?.role === "association" && (
            <NavLink
              className={(navData) =>
                navData.isActive ? "nav-link active-link" : "nav-link"
              }
              to="/espace-association"
            >
              Mon espace association
            </NavLink>
          )}

          <NavLink
            className={(navData) =>
              navData.isActive ? "nav-link active-link" : "nav-link"
            }
            to="/contact"
          >
            Contact
          </NavLink>
        </div>

        <div className="auth-container">
          {isAuthenticated ? (
            <div className="user-info">
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
      </div>

      <ModalLogin show={isModalOpen} onClose={closeModal} login={safeLogin} />
    </header>
  );
};

export default Header;
