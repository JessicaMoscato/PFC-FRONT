//! Type pour les critères de filtrage des animaux
export interface IAnimalFilter {
  breed?: string[]; // Liste des races à filtrer (optionnel)
  species?: string[]; // Liste des espèces à filtrer (optionnel)
  ageRange?: { min: number; max: number }; // Plage d'âge à filtrer (optionnel)
  size?: string[]; // Liste des tailles à filtrer (optionnel)
}
