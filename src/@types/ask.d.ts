//! Type pour le modèle "Ask"
export interface IAsk {
  id: number; // ID unique de la demande
  status: string; // Statut de la demande (par défaut "en attente")
  id_animal: number; // Clé étrangère vers un Animal (requis)
  id_family: number; // Clé étrangère vers une Family (requis)
  animal?: IAnimal; // Relation optionnelle avec Animal
  family?: IFamily; // Relation optionnelle avec Family
}

//! Type pour une entité "Animal" (relation)
export interface IAnimal {
  id: number; // ID unique de l'animal
  name: string; // Nom de l'animal
  species: string; // Espèce de l'animal
  breed: string | null; // Race de l'animal (peut être null)
  gender: string; // Genre de l'animal
  age: number; // Âge de l'animal
  size: string; // Taille de l'animal
  description?: string; // Description de l'animal (optionnel)
  profile_photo?: string; // Photo de profil de l'animal (optionnel)
  photo1?: string | null; // Photo supplémentaire 1 (optionnel, peut être null)
  photo2?: string | null; // Photo supplémentaire 2 (optionnel, peut être null)
  photo3?: string | null; // Photo supplémentaire 3 (optionnel, peut être null)
}

//! Type pour une entité "Family" (relation)
export interface IFamily {
  id: number; // ID unique de la famille
  name: string; // Nom de la famille
  description?: string; // Description optionnelle de la famille
}
