import React, { useState, useEffect } from "react";
import "./signup.scss";


const SignupAssociation: React.FC = () => {
  const [formData, setFormData] = useState({
    nomAssociation: "",
    nom: "",
    prenom: "",
    adresse: "",
    codePostal: "",
    ville: "",
    telephone: "",
    email: "",
    numeroRNA: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    document.body.classList.add("signup-asso-page");
    return () => {
      document.body.classList.remove("signup-asso-page");
    };
  }, []);

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

      <h1>Inscription Association</h1>

      <form onSubmit={handleSubmit} className="signupForm">
        <div className="leftColumn">
          <div className="inputGroup">
            <label htmlFor="nomAssociation">Nom de l'association</label>
            <input
              type="text"
              id="nomAssociation"
              name="nomAssociation"
              placeholder="Entrez le nom de l'association"
              value={formData.nomAssociation}
              onChange={handleChange}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="nom">Nom du représentant</label>
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
            <label htmlFor="nom">Prénom du représentant</label>
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
            <label htmlFor="numeroRNA">Numéro RNA</label>
            <input
              type="text"
              id="numeroRNA"
              name="numeroRNA"
              placeholder="W*********"
              value={formData.numeroRNA}
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

export default SignupAssociation;
