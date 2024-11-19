//! Type pour le modèle "User"
interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "family" | "association";
  created_at: Date;
  updated_at: Date;
}

//! Type pour le modèle "Family"
export interface IFamily {
  id: number;
  address: string;
  postal_code: string;
  city: string;
  phone: string;
  number_of_children?: number;
  number_of_animals?: number;
  garden?: boolean;
  description?: string;
  profile_photo?: string;
  id_user?: number;
  created_at?: Date;
  updated_at?: Date;

  //! Liste des animaux associés à la famille
  animalsFamily?: IAnimal[];

  //! Relation avec un utilisateur
  user?: IUser;

  //! Fichier de profil optionnel
  profile_file?: File | null;
}

//! Type pour le formulaire d'ajout d'une famille
export interface IFamilyForm {
  profile_file?: File | null;
  lastname: string;
  firstname: string;
  email: string;
  phone: string;
  address: string;
  postal_code: string;
  city: string;
  garden: boolean;
  number_of_children: number;
  number_of_animals: number;
  description: string;
}
