import { AxiosResponse } from "axios";
import { api, handleApiError } from "../api"; 
import { IUser } from "../@types/user"; 

/**
 *! Fonction pour se connecter en utilisant les informations d'identification de l'utilisateur.
 * @param credentials Les informations d'identification de l'utilisateur (email et mot de passe).
 * @returns Une promesse qui résout avec l'objet utilisateur ou les données de session.
 */
export const SigninUser = async (credentials: {
  email: string;
  password: string;
}): Promise<IUser> => {
  try {
    const response: AxiosResponse<IUser> = await api.post(
      "/signin",
      credentials
    );
    return response.data; // Retourne les données utilisateur ou le token
  } catch (error) {
    handleApiError(error, "la connexion de l'utilisateur");
    throw error; 
  }
};

export type { IUser };
