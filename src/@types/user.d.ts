export interface IUser {
  id: number; // ID unique de l'utilisateur
  id_family: number | null;
  id_association: number | null;
  firstname: string; // Prénom de l'utilisateur (obligatoire)
  lastname: string; // Nom de famille de l'utilisateur (obligatoire)
  email: string; // Email de l'utilisateur (obligatoire)
  password: string; // Mot de passe de l'utilisateur (obligatoire, mais peut être omis lors de la récupération)
  role?: string; // Rôle de l'utilisateur (optionnel)
}

// Définir le type AuthContext
export interface IAuthContext {
  user: IUser | null;
  login: (token: string, userData: IUser) => void;
  logout: () => void;
  token: string | null;
  // Définir les enfants comme ReactNode, ce qui permet d'avoir n'importe quel contenu enfant
  children: ReactNode;
}