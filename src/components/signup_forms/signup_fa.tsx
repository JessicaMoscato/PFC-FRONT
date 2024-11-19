import { useState, useEffect } from "react"; // Importation des hooks React nécessaires
import "./signup.scss"; // Importation du fichier SCSS pour le style du composant

//! Définition du composant Signup_fa
const Signup_fa: React.FC = () => {
  //! Déclaration de l'état local formData avec les champs du formulaire
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
    // Ajouter la classe 'signup-fa-page' au body lors du montage du composant
    document.body.classList.add("signup-fa-page");

    // Nettoyer (enlever la classe) lorsque le composant est démonté
    return () => {
      document.body.classList.remove("signup-fa-page");
    };
  }, []); // Le tableau vide signifie que l'effet ne se lance qu'une seule fois au montage du composant

  // Fonction pour mettre à jour formData à chaque changement d'input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Mise à jour de formData avec la nouvelle valeur
  };

  //! Fonction pour gérer l'envoi du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Empêcher le comportement par défaut du formulaire (rechargement de la page)

    // Vérifier si les mots de passe correspondent
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !"); // Alerte si les mots de passe sont différents
      return;
    }

    console.log("Formulaire soumis : ", formData); // Affichage des données du formulaire dans la console
  };

  return (
    <section className="signupContainer">
      {" "}

      <h1>Inscription Famille d'accueil</h1> 
      {/* Formulaire d'inscription */}
      <form onSubmit={handleSubmit} className="signupForm">
        {/* Colonne gauche du formulaire contenant les informations personnelles */}
        <div className="leftColumn">
          <div className="inputGroup">
            <label htmlFor="nom">Nom</label>
            <input
              type="text"
              id="nom"
              name="nom"
              placeholder="Entrez votre nom"
              value={formData.nom}
              onChange={handleChange} // Gérer les changements d'entrée
              required // Le champ est obligatoire
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

        {/* Colonne droite du formulaire contenant les informations de contact et de sécurité */}
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

        {/* Bouton de soumission du formulaire */}
        <button type="submit" className="signupButton">
          Je valide mon inscription
        </button>
      </form>
    </section>
  );
};

export default Signup_fa; 
