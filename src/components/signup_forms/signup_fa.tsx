// SignupFa.tsx

import { useState, ChangeEvent, FormEvent } from "react";
import "./signup.scss";
import { CreateUser } from "../../api/user.api";
import type { IUserRegistrationFamily } from "../../@types/signupForm";

const SignupFa = () => {
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
  const [phoneError, setPhoneError] = useState<string>("");

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

       // Validation du numéro de téléphone
       if (name === "phone") {
         if (!/^\d{10}$/.test(value)) {
           setPhoneError("Le numéro de téléphone doit comporter 10 chiffres.");
         } else {
           setPhoneError("");
         }
       }
     } else {
       setFormData((prevData) => ({
         ...prevData,
         [name]: value,
       }));
     }
   };

  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

      if (!/^\d{10}$/.test(formData.family.phone)) {
        setPhoneError("Le numéro de téléphone doit comporter 10 chiffres.");
        return;
      }

    if (formData.password !== formData.passwordConfirmation) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      setErrorMessage("L'email est invalide.");
      return;
    }
    try {
      const { passwordConfirmation, ...dataToSend } = formData;
      await CreateUser(dataToSend);
      setSuccessMessage(
        "Inscription réussie ! Vous pouvez maintenant vous connecter."
      );
      setErrorMessage("");
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
        <h1>Inscription famille d'accueil</h1>
      </div>
      <div className="subscribeFormContainer">
        <form
          onSubmit={handleSubmit}
          className="formConnexionPage"
          id="subscribeForm"
        >
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

          <div className="mainAddress">
            <label className="labelConnexionPage" htmlFor="address">
              Adresse
            </label>
            <input
              className="inputConnexionPage inputLarge"
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
              {phoneError && <p className="errorMessage">{phoneError}</p>}
            </div>
          </div>

          <div className="passwordSection">
            <div className="fieldContainer">
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
            <div className="fieldContainer">
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

          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
          {successMessage && <p className="successMessage">{successMessage}</p>}

          <button type="submit" className="buttonConnexionPage">
            Créer un compte
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignupFa;
