import React, { useState, useEffect } from "react";
import "./signup.scss";
import catdog from "../../assets/images/catdog.png"; 

const Signup_fa: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    codePostal: "",
    ville: "",
    telephone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Ajouter une classe au body quand la page est rendue
  useEffect(() => {
    // Ajouter la classe 'signup-asso-fa' au body
    document.body.classList.add("signup-fa-page");

    // Nettoyer (enlever la classe) lorsque le composant est démonté
    return () => {
      document.body.classList.remove("signup-fa-page");
    };
  }, []); // Le tableau vide signifie que l'effet ne se lance qu'une seule fois au montage du composant

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    console.log("Formulaire soumis : ", formData);
  };

  return (
    <section className="signupContainer">
      <img
        src={catdog} // Utilisation correcte de la variable importée
        alt="catdog"
        className="image" // Classe pour styliser l'image
      />

      <form onSubmit={handleSubmit} className="signupForm">
        <div className="leftColumn">
          <div className="inputGroup">
            <label htmlFor="nom">Nom</label>
            <input
              type="text"
              id="nom"
              name="nom"
              placeholder="Entrez votre nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="prenom">Prénom</label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              placeholder="Entrez votre prénom"
              value={formData.prenom}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="adresse">Adresse</label>
            <input
              type="text"
              id="adresse"
              name="adresse"
              placeholder="Entrez votre adresse"
              value={formData.adresse}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="codePostal">Code Postal</label>
            <input
              type="text"
              id="codePostal"
              name="codePostal"
              placeholder="Entrez votre code postal"
              value={formData.codePostal}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="ville">Ville</label>
            <input
              type="text"
              id="ville"
              name="ville"
              placeholder="Entrez votre ville"
              value={formData.ville}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="rightColumn">
          <div className="inputGroup">
            <label htmlFor="telephone">Téléphone</label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              placeholder="Entrez votre téléphone"
              value={formData.telephone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Entrez votre email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Entrez votre mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirmez votre mot de passe"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="signupButton">
          Je valide mon inscription
        </button>
      </form>
    </section>
  );
};

export default Signup_fa;
