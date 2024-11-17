//! Type pour le modèle "Association"
export interface IAssociation {
  id: number; // ID unique de l'association
  rna_number: string; // Numéro RNA (obligatoire et unique)
  representative: string; // Nom du représentant (obligatoire)
  address: string; // Adresse (obligatoire)
  postal_code: string; // Code postal (obligatoire)
  city: string; // Ville (obligatoire)
  phone: string; // Numéro de téléphone (obligatoire)
  description?: string; // Description de l'association (optionnel)
  status: string; // Statut de l'association (obligatoire, par défaut "en attente")
  profile_photo?: string; // Photo de profil de l'association (optionnel)
  created_at: Date; // Date de création (obligatoire, type Date pour une manipulation correcte)
  updated_at: Date; // Date de mise à jour (obligatoire, type Date pour une manipulation correcte)
  id_user?: number; // ID de l'utilisateur associé à l'association
  user?: IUser; // Relation avec un utilisateur
  animals?: IAnimal[]; // Liste des animaux associés à l'association
}

//! Type pour le formulaire d'ajout d'une association
export interface IAssociationForm {
  rna_number: string; // Numéro RNA (obligatoire)
  representative: string; // Nom du représentant (obligatoire)
  address: string; // Adresse (obligatoire)
  postal_code: string; // Code postal (obligatoire)
  city: string; // Ville (obligatoire)
  phone: string; // Numéro de téléphone (obligatoire)
  description?: string; // Description de l'association (optionnel)
}
