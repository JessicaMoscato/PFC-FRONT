// Définition d'un utilisateur générique
export interface IUser {
  id: number;
  role: "family" | "association"; // Rôle spécifique
  email: string;
  firstname: string | null;
  lastname: string | null;
  password: string;
  id_family: number | null;
  id_association: number | null;
  created_at: string;
  updated_at: string;
  family: IFamilyDetails | null; // Optionnel selon le rôle
  association: IAssociationDetails | null; // Optionnel pour association
}

export interface IFamilySignupData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  family: {
    address: string;
    postal_code: string;
    city: string;
    phone: string;
  };
}


// Exemple de type IFamilyData
export interface IFamilyData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  family: {
    address: string;
    postal_code: string;
    city: string;
    phone: string;
  };
}

// Détails de la famille
export interface IFamilyDetails {
  id: number;
  address: string;
  postal_code: string;
  city: string;
  phone: string;
  description: string;
  garden: boolean;
  id_user: number;
  number_of_animals: number | null;
  number_of_children: number | null;
  profile_photo: string;
}

// Exemple de type pour une association
export interface IAssociationDetails {
  name: string;
  description: string;
  phone: string;
}
