import  { useState, useEffect } from "react";
import "./signup.scss";


//! Composant SignupAssociation
const SignupAssociation: React.FC = () => {
  //! Initialisation de l'état local pour gérer les données du formulaire
  const [formData, setFormData] = useState({
    nomAssociation: "", // Nom de l'association --> representative
    nom: "", // Nom du représentant
    prenom: "", // Prénom du représentant
    adresse: "", // Adresse de l'association
    codePostal: "", // Code postal de l'association
    ville: "", // Ville de l'association
    telephone: "", // Numéro de téléphone
    email: "", // Adresse email
    numeroRNA: "", // Numéro RNA unique pour identifier l'association
    password: "", // Mot de passe
    confirmPassword: "", // Confirmation du mot de passe
  });

  //! Ajout et suppression d'une classe CSS spécifique à la page lors du montage/démontage du composant
  useEffect(() => {
    // Ajoute une classe CSS pour styliser la page d'inscription
    document.body.classList.add("signup-asso-page");

    // Nettoyage : retire la classe CSS lors du démontage du composant
    return () => {
      document.body.classList.remove("signup-asso-page");
    };
  }, []);

  //! Gestion des changements dans les champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Récupère le nom et la valeur du champ modifié
    // Met à jour l'état avec la nouvelle valeur tout en conservant les autres données
    setFormData({ ...formData, [name]: value });
  };

  //! Validation et soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de la soumission

    // Vérifie si le mot de passe et la confirmation sont identiques
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return; // Arrête l'exécution si les mots de passe ne correspondent pas
    }

    // Affiche les données dans la console (simule une soumission)
    console.log("Formulaire soumis : ", formData);
  };

  //! Affichage du formulaire d'inscription
  return (
    <section className="signupContainer">
      {/* Titre de la page */}
      <h1>Inscription Association</h1>

      {/* Début du formulaire */}
      <form onSubmit={handleSubmit} className="signupForm">
        <div className="leftColumn">
          {/* Groupe de champs pour la colonne gauche */}
          <div className="inputGroup">
            <label htmlFor="nomAssociation">Nom de l'association</label>
            <input
              type="text"
              id="nomAssociation"
              name="nomAssociation"
              placeholder="Entrez le nom de l'association"
              value={formData.nomAssociation}
              onChange={handleChange}
              required // Champ obligatoire
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
            <label htmlFor="prenom">Prénom du représentant</label>
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
          {/* Groupe de champs pour la colonne droite */}
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

        {/* Bouton de soumission */}
        <button type="submit" className="signupButton">
          Je valide mon inscription
        </button>
      </form>
    </section>
  );
};

export default SignupAssociation;
