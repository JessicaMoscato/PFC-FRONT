export interface IUser {
  id: number; // ID unique de l'utilisateur
  firstname: string; // Prénom de l'utilisateur (obligatoire)
  lastname: string; // Nom de famille de l'utilisateur (obligatoire)
  email: string; // Email de l'utilisateur (obligatoire)
  password: string; // Mot de passe de l'utilisateur (obligatoire, mais peut être omis lors de la récupération)
  role?: string; // Rôle de l'utilisateur (optionnel)
}
