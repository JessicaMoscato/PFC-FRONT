import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"; 
import { NavLink } from "react-router-dom"; // Import de NavLink
import "./footer.scss"; 

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-media">
          {/* Liens vers les réseaux sociaux avec les icônes */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} className="social-icon" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} className="social-icon" />
          </a>
        </div>

        {/* Remplacer <a> par <NavLink> pour la gestion des liens actifs */}
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
        >
          Contact
        </NavLink>

        <div className="copyright">
          {/* Texte de copyright */}
          <p>&copy; 2024 Pet Foster Connect. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
