import { useState, ChangeEvent, FormEvent } from "react";
import "./signup.scss";
import { CreateUser } from "../../api/user.api"; // Fonction pour créer un utilisateur
import type { IUserRegistrationFamily } from "../../@types/signupForm"; // Utilisation du type correct

const SignupFa = () => {
  // Initialisation des données du formulaire avec le type IUserRegistrationFamily
  const [formData, setFormData] = useState<IUserRegistrationFamily>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    family: {
      address: "",
      postal_code: "",
      city: "",
      phone: "",
    },
  });

  const [successMessage, setSuccessMessage] = useState<string | boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (["address", "postal_code", "city", "phone"].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        family: {
          ...prevData.family,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Gestion de la soumission du formulaire
 const handleSubmit = async (e: FormEvent) => {
   e.preventDefault();

   // Validation des mots de passe : vérifie qu'ils correspondent avant l'envoi
   if (formData.password !== formData.passwordConfirmation) {
     setErrorMessage("Les mots de passe ne correspondent pas.");
     return;
   }

   // Validation de l'email (format basique)
   const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   if (!emailPattern.test(formData.email)) {
     setErrorMessage("L'email est invalide.");
     return;
   }

   try {
     // Supprime passwordConfirmation avant l'envoi au backend
     const { passwordConfirmation, ...dataToSend } = formData;

     // Envoie les données sans passwordConfirmation
     await CreateUser(dataToSend);

     setSuccessMessage(
       "Inscription réussie ! Vous pouvez maintenant vous connecter."
     );
     setErrorMessage(""); // Réinitialisation des messages d'erreur
   } catch (error: any) {
     if (error?.response?.data?.message) {
       setErrorMessage(error.response.data.message);
     } else {
       setErrorMessage("Une erreur s'est produite lors de l'inscription.");
     }
   }
 };







  return (
    <section className="signup_fa">
      <div className="signup_faHeader">
        <h3>Inscription en tant que</h3>
        <h4>Famille d'accueil</h4>
      </div>
      <div className="subscribeFormContainer">
        <form
          onSubmit={handleSubmit}
          className="formConnexionPage"
          id="subscribeForm"
        >
          {/* Section Nom et Prénom */}
          <div className="nameSectionFa">
            <div className="fieldContainer">
              <label className="labelConnexionPage" htmlFor="lastname">
                Nom
              </label>
              <input
                className="inputConnexionPage"
                type="text"
                name="lastname"
                id="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="fieldContainer">
              <label className="labelConnexionPage" htmlFor="firstname">
                Prénom
              </label>
              <input
                className="inputConnexionPage"
                type="text"
                name="firstname"
                id="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Section Contact */}
          <div className="contactSectionFa">
            <div className="fieldContainer">
              <label className="labelConnexionPage" htmlFor="email">
                E-mail
              </label>
              <input
                className="inputConnexionPage"
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Section Adresse */}
          <div className="mainAdress">
            <label className="labelConnexionPage" htmlFor="address">
              Adresse
            </label>
            <input
              className="inputConnexionPage"
              type="text"
              name="address"
              id="address"
              value={formData.family.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="adressSectionFa">
            <div className="fieldContainer">
              <label className="labelConnexionPage" htmlFor="postal_code">
                Code Postal
              </label>
              <input
                className="inputConnexionPage"
                type="text"
                name="postal_code"
                id="postal_code"
                value={formData.family.postal_code}
                onChange={handleChange}
                required
              />
            </div>
            <div className="fieldContainer">
              <label className="labelConnexionPage" htmlFor="city">
                Ville
              </label>
              <input
                className="inputConnexionPage"
                type="text"
                name="city"
                id="city"
                value={formData.family.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Section Téléphone */}
          <div className="contactSectionFa">
            <div className="fieldContainer">
              <label className="labelConnexionPage" htmlFor="phone">
                Téléphone
              </label>
              <input
                className="inputConnexionPage"
                type="tel"
                name="phone"
                id="phone"
                value={formData.family.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Section Mot de Passe */}
          <div className="passwordSection passwordAssociation">
            <div>
              <label className="labelConnexionPage" htmlFor="password">
                Mot de passe
              </label>
              <input
                className="inputConnexionPage"
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                className="labelConnexionPage"
                htmlFor="passwordConfirmation"
              >
                Confirmer votre mot de passe
              </label>
              <input
                className="inputConnexionPage"
                type="password"
                name="passwordConfirmation"
                id="passwordConfirmation"
                value={formData.passwordConfirmation}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Messages d'erreur ou de succès */}
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
          {successMessage && <p className="successMessage">{successMessage}</p>}

          {/* Bouton de soumission */}
          <button type="submit" className="buttonConnexionPage">
            Créer un compte
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignupFa;
