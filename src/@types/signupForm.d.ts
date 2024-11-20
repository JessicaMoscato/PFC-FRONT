//! Type pour une famille
export interface IFamily {
  address: string; // Adresse de la famille
  postal_code: string; // Code postal de la famille
  city: string; // Ville de la famille
  phone: string; // Numéro de téléphone
}

//! Type pour une association
export interface IAssociation {
  lastname: string; // Nom de l'association
  firstname: string; // Prénom ou nom principal du représentant
  representative: string; // Nom complet du représentant légal
  rna_number: string; // Numéro RNA de l'association
  address: string; // Adresse de l'association
  postal_code: string; // Code postal de l'association
  city: string; // Ville de l'association
  phone: string | null; // Numéro de téléphone (facultatif)
}

//! Type de rôle pour un utilisateur
export type UserRole = "family" | "association";

//! Type utilisateur commun (utilisé pour le backend)
export interface IUser {
  id: number; // Identifiant unique de l'utilisateur
  firstname: string; // Prénom de l'utilisateur
  lastname: string; // Nom de l'utilisateur
  email: string; // Adresse email de l'utilisateur
  password: string; // Mot de passe de l'utilisateur
  role: UserRole; // Rôle de l'utilisateur
}

//! Type pour l'inscription d'un utilisateur de type "family"
export interface IUserRegistrationFamily {
  firstname: string; // Prénom de l'utilisateur
  lastname: string; // Nom de l'utilisateur
  email: string; // Adresse email
  password: string; // Mot de passe
  passwordConfirmation?: string; // Confirmation du mot de passe
  family: IFamily; // Informations spécifiques à la famille
}

//! Type pour l'inscription d'un utilisateur de type "association"
export interface IUserRegistrationAssociation {
  firstname: string; // Prénom de l'utilisateur
  lastname: string; // Nom de l'utilisateur
  email: string; // Adresse email
  password: string; // Mot de passe
  passwordConfirmation: string; // Confirmation du mot de passe
  association: IAssociation; // Informations spécifiques à l'association
}

//! Type pour la réponse de création d'utilisateur
export interface ICreateUserResponse {
  user: IUser; // Utilisateur créé
  token: string; // Token d'authentification
}




//! Type générique pour l'inscription (utile pour différencier les deux types)
export type IUserRegistration =
  | IUserRegistrationFamily
  | IUserRegistrationAssociation;